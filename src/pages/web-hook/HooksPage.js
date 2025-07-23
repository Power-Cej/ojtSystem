import React from "react";
import { restUseCase } from "../../usecases/rest";
import BasePage from "../../base/BasePage";
import { Button, Table, dialog } from "nq-component";
import fields from "./fields.json";
import NavBar from "../../components/navbar";
import AddHook from "./AddWidget";
import HooksPresenter from "./HooksPresenter";

class HooksPage extends BasePage {
  constructor(props) {
    super(props);
    this.state = { object: null, progress: true };
    this.presenter = new HooksPresenter(this, restUseCase());
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  setObject(object) {
    this.setState({ object });
  }

  addClick() {
    this.presenter.addClick();
  }

  deleteClick(objectId) {
    console.log("Object ID to delete:", objectId);
  }

  onClickAddHooks() {
    const schemas = this.getSchemas();
    dialog.fire({
      html: (
        <AddHook
          collections={schemas.map((s) => s.collection)}
          onSubmit={(o) => {
            dialog.close();
            this.presenter.onSubmitAddHooks(o);
          }}
          onCancel={() => dialog.close()}
        />
      ),
      footer: false,
    });
  }

  render() {
    const { object } = this.state;

    return (
      <>
        <NavBar
          action={() => {
            // if (!user.isMaster) return null;
            return (
              <div
                className="dropdown dropstart d-inline-block"
                style={{ fontSize: "clamp(1.5rem, 2vw, 1.8rem)" }}
              >
                <i
                  role="button"
                  data-bs-toggle="dropdown"
                  className="bi bi-three-dots-vertical"
                ></i>
                <div className="dropdown-menu fs-xs">
                  <button
                    onClick={this.onClickAddHooks.bind(this)}
                    className="dropdown-item py-3"
                  >
                    <i className="bi bi-folder-plus pe-2" />
                    Add Hooks
                  </button>
                </div>
              </div>
            );
          }}
        />

        <div className="overflow-auto">
          <div className="p-3 p-lg-4">
            <h1>Hooks</h1>
            <table className="table table-striped ">
              <thead>
                <tr>
                  {Object.keys(fields).map((key, index) => (
                    <th key={index} className="bg-dark text-white">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {object?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.collection}</td>
                    <td>{item.url}</td>
                    <td>{item.trigger}</td>
                    <td>
                      <button className="btn btn-primary me-2">
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-primary me-2"
                        onClick={this.deleteClick.bind(this, item._id?.$oid)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default HooksPage;
