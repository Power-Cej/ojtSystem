import React from "react";
import CollectionListPresenter from "./CollectionListPresenter";
import { dialog, Button, NavBar } from "nq-component";
import AddField from "./components/AddField";
import {
  addSchemaUseCase,
  updateSchemaUseCase,
  deleteSchemaUseCase,
} from "../../usecases/schema/usecases";
import {
  countObjectUseCase,
  deleteObjectUseCase,
  findObjectUseCase,
  upsertUseCase,
} from "../../usecases/object";
import { exportCSVUseCase } from "../../usecases/csv/usecases";
import FormCollection from "./components/FormCollection";
import DeleteCollection from "./components/DeleteCollection";
import DeleteField from "./components/DeleteField";
import { Progress, InfiniteScroll } from "nq-component";
import FormAccess from "./components/FormAccess";
import mergeACl from "../../mergeACl";
import withRouter from "../../withRouter";
import Search from "../../components/Search";
import BaseListPage from "../../base/BaseListPage";
import InputFactory from "../../components/InputFactory";
import browseFile from "../../browseFile";
import "./Styles.css";
import Table from "../../components/Table";

class CollectionListPage extends BaseListPage {
  constructor(props) {
    super(props);
    this.presenter = new CollectionListPresenter(
      this,
      findObjectUseCase(),
      countObjectUseCase(),
      deleteObjectUseCase(),
      upsertUseCase(),
      exportCSVUseCase(),
      addSchemaUseCase(),
      updateSchemaUseCase(),
      deleteSchemaUseCase()
    );
  }

  /*when class change*/
  componentDidUpdate(prevProps, prevState) {
    this.presenter.componentDidUpdate(prevProps, prevState);
  }

  closeDialog() {
    dialog.close();
  }
  onClickAddCollection() {
    // create empty schema
    dialog.fire({
      html: (
        <FormCollection
          schema={{}}
          onSubmit={(schema) => this.presenter.onSubmitAddCollection(schema)}
          onCancel={() => dialog.close()}
        />
      ),
      footer: false,
    });
  }

  onClickEditCollection(schema) {
    dialog.fire({
      html: (
        <FormCollection
          schema={schema}
          onSubmit={(s) => this.presenter.onSubmitEditCollection(s)}
          onCancel={() => dialog.close()}
        />
      ),
      footer: false,
    });
  }

  onClickAddField(schema) {
    const schemas = this.getSchemas();
    dialog.fire({
      html: (
        <AddField
          schema={schema}
          collections={schemas.map((s) => s.collection)}
          onSubmit={(s) => this.presenter.onSubmitEditCollection(s)}
          onCancel={() => dialog.close()}
        />
      ),
      footer: false,
    });
  }

  onCLickAccess() {
    function submit(acl) {
      this.presenter.onSubmitAccess(acl);
    }
    const acl = mergeACl(this.state.selected);
    dialog.fire({
      html: (
        <FormAccess
          currentUser={this.getCurrentUser()}
          acl={acl}
          onSubmit={submit.bind(this)}
          onCancel={() => dialog.close()}
        />
      ),
      footer: false,
    });
  }

  onClickDeleteField() {
    const schema = this.getSchema(this.getCollectionName());
    dialog.fire({
      html: (
        <DeleteField
          fields={Object.keys(schema.fields)}
          onSubmit={(f) => this.presenter.onSubmitDeleteField(f)}
          onCancel={() => dialog.close()}
        />
      ),
      footer: false,
    });
  }

  onClickDeleteCollection() {
    const schema = this.getSchema(this.getCollectionName());
    dialog.fire({
      html: (
        <DeleteCollection
          schema={schema}
          onSubmit={() =>
            this.presenter.onSubmitDeleteCollection(schema.collection)
          }
          onCancel={() => dialog.close()}
        />
      ),
      footer: false,
    });
  }

  onClickImport() {
    browseFile("*").then((files) => {
      if (files.length > 0) {
        const file = files[0];
        this.presenter.onClickImport(file);
      }
    });
  }
  onClickExport() {
    this.presenter.onClickExport();
  }

  onChangeFilter(type, value, field) {
    const where = {};
    switch (type) {
      case "Pointer":
        if (Object.keys(value).length > 0) {
          where[field] = { id: value.id };
        }
        break;
      case "Boolean":
        where[field] = value;
        break;
      default:
        where[field] = { $regex: value, $options: "i" };
    }
    this.searchSubmit(where);
  }

  searchSubmit(where, merge) {
    console.log("WHER: ", where);
    // console.log("WHER: ", merge);
    if (this.getCollectionName() === "daily_time_record") {
      where.$or.push({ timeRecStats: { $elemMatch: where.$or[0].id } });
    }
    this.presenter.searchSubmit(where, merge);
  }

  render() {
    const schema = this.getSchema(this.getCollectionName());
    const { objects, selected, count, progress } = this.state;
    if (!schema) return <Progress />;
    const user = this.getCurrentUser();
    return (
      <>
        <NavBar
          action={() => {
            return (
              <div className="dropdown dropstart d-inline-block">
                <i
                  role="button"
                  data-bs-toggle="dropdown"
                  className="bi bi-three-dots-vertical text-dark"
                ></i>
                <div className="dropdown-menu fs-xs">
                  <button
                    onClick={this.onClickImport.bind(this)}
                    className="dropdown-item py-3"
                  >
                    <i className="bi bi-arrow-down-square pe-2" />
                    Import Data
                  </button>
                  <button
                    onClick={this.onClickExport.bind(this)}
                    className="dropdown-item py-3"
                  >
                    <i className="bi bi-arrow-up-square pe-2" />
                    Export Data
                  </button>
                  <button
                    onClick={this.onCLickAccess.bind(this)}
                    disabled={selected.length < 1}
                    className="dropdown-item py-3"
                  >
                    <i className="bi  bi-ui-checks mr-5 pe-2" />
                    Access
                  </button>
                  <button
                    onClick={this.onClickDeleteSelected.bind(this)}
                    disabled={selected.length < 1}
                    className="dropdown-item py-3"
                  >
                    <i className="bi bi-trash pe-2" />
                    Delete selected
                  </button>
                  {user.isMaster && (
                    <>
                      <div className="dropdown-divider"></div>
                      <button
                        onClick={this.onClickAddField.bind(this, schema)}
                        className="dropdown-item py-3"
                      >
                        <i className="bi bi-journal-plus pe-2" />
                        Add a field
                      </button>
                      <button
                        onClick={this.onClickDeleteField.bind(this)}
                        className="dropdown-item py-3"
                      >
                        <i className="bi bi-journal-x pe-2" />
                        Delete a field
                      </button>
                      <button
                        onClick={this.onClickEditCollection.bind(this, schema)}
                        className="dropdown-item py-3"
                      >
                        <i className="bi bi-pencil-square pe-2" />
                        Edit this collection
                      </button>
                      <button
                        onClick={this.onClickDeleteCollection.bind(this)}
                        className="dropdown-item py-3"
                      >
                        <i className="bi bi-folder-x pe-2" />
                        Delete this collection
                      </button>
                      <button
                        onClick={this.onClickAddCollection.bind(this)}
                        className="dropdown-item py-3"
                      >
                        <i className="bi bi-folder-plus pe-2" />
                        Add a collection
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          }}
        />
        <div className="overflow-auto">
          <InfiniteScroll
            className="h-100"
            loadMore={this.loadMore.bind(this)}
            hasMore={!progress && count > objects.length}
          >
            <div className="p-3 p-lg-4">
              <div className="d-flex justify-content-between align-items-center">
                <h1
                  className="fw-bold text-capitalize"
                  // style={{ color: "#006BAC" }}
                >
                  {schema.label || this.getCollectionName()}
                </h1>
                <div className="text-nowrap d-grid">
                  <div className="d-flex gap-2">
                    <span>
                      {selected.length > 0 ? "Selected: " : "Total: "}
                    </span>
                    <span className="fs-sm text-nowrap">
                      {selected.length > 0 ? selected.length : objects.length}
                    </span>
                    <span>of </span>
                    <span className="fs-sm text-nowrap">{count}</span>
                  </div>
                  <Button
                    className="btn btn-primary"
                    onClick={() => this.presenter.exportCSVToCSV(schema)}
                  >
                    Export CSV
                  </Button>
                </div>
              </div>
              <div className="d-flex mt-3">
                {Object.keys(schema.filters || {}).map((field) => {
                  let { type, ...options } = schema.filters[field];
                  return (
                    <InputFactory
                      key={field}
                      className="ms-1"
                      type={type}
                      field={field}
                      where={{}}
                      onChange={this.onChangeFilter.bind(this, type)}
                      {...options}
                    />
                  );
                })}
              </div>
              <Search
                schemas={this.getSchemas()}
                className="mt-3"
                onSubmit={this.searchSubmit.bind(this)}
                fields={schema.fields}
              />
              <Table
                fields={schema.fields}
                objects={objects}
                collection={this.getCollectionName()}
                selectable
                collapsable={
                  user?.username === "mweeb@company.com" ? true : false
                }
                excludeFields={Object.keys(schema.fields).reduce(
                  (acc, key) => {
                    const options = schema.fields[key];
                    if (options.read === false) {
                      acc.push(key);
                    }
                    switch (options._type || options.type) {
                      case "Relation":
                      case "Object":
                      case "File":
                        acc.push(key);
                        break;
                      default:
                    }
                    return acc;
                  },
                  ["id", "acl", "password"]
                )}
                selected={selected}
                onSelect={this.onSelect.bind(this)}
                onSelectAll={this.onSelectAll.bind(this)}
                progress={progress}
                onClickItem={this.onClickItem.bind(this)}
                className="mt-3"
              />
            </div>
          </InfiniteScroll>
        </div>
        <div className="position-fixed bottom-0 end-0 m-4">
          <Button
            className="btn text-white shadow-sm"
            onClick={this.onClickAdd.bind(this)}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "25px",
              backgroundColor: "#006BAC",
            }}
          >
            <i className="bi bi-plus-lg" />
          </Button>
        </div>
      </>
    );
  }
}

export default withRouter(CollectionListPage);
