import React from "react";
import { InputJson } from "nq-component";
import CollectionFormPresenter from "./CollectionFormPresenter";
import { getObjectUseCase, upsertUseCase } from "../../usecases/object";
import withRouter from "../../withRouter";
import BaseFormPage from "../../base/BaseFormPage";
import NavBar from "../../components/navbar";
import FormFactory from "../../components/FormFactory";
import { param } from "framer-motion/client";

class CollectionFormPage extends BaseFormPage {
  constructor(props) {
    super(props);
    this.state = { object: {}, advanced: false };
    this.presenter = new CollectionFormPresenter(
      this,
      getObjectUseCase(),
      upsertUseCase()
    );
  }

  onClickAdvance() {
    this.setState({ advanced: !this.state.advanced });
  }

  onChangeObject(object) {
    this.presenter.onChangeObject(object);
  }

  render() {
    const object = this.state.object;
    const advanced = this.state.advanced;
    const schema = this.getSchema(this.getCollectionName());
    if (!schema) return <h1>no schema</h1>;
    const params = this.getParams();
    const forViewing = params?.["*"]?.includes("view");
    const label =
      this.getObjectId() === undefined
        ? "Add New "
        : forViewing
        ? "View "
        : "Edit ";

    // const excludeFields = forViewing ? ["password"] : []
    return (
      <>
        <NavBar
          action={() => (
            <div className="dropdown dropstart d-inline-block">
              <i
                role="button"
                data-bs-toggle="dropdown"
                className="bi bi-three-dots-vertical text-white"
                style={{ fontSize: "clamp(1.5rem, 2vw, 1.8rem)" }}
              ></i>
              <div className="dropdown-menu fs-xs">
                <button
                  onClick={this.onClickAdvance.bind(this)}
                  className="dropdown-item py-3"
                >
                  <i className="bi bi-gear pe-2" />
                  Toggle Advance
                </button>
              </div>
            </div>
          )}
        />
        <div className="overflow-auto">
          <div className="h-100">
            <div className="p-3 p-lg-4">
              <div className="d-flex gap-2 align-items-center">
                <i
                  className="bi bi-chevron-left"
                  onClick={() => this.navigateBack()}
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                />
                <h2 className="fw-bold text-capitalize pt-1">
                  {label + (schema.label || this.getCollectionName())}
                </h2>
              </div>
              <div
                className="text-white fw-bold bg-white"
                style={{
                  backgroundColor: "#006BAC",
                  borderRadius: "5px 5px 0 0",
                }}
              >
                <p
                  className="d-flex align-content-center text-capitalize text-primary bg-white"
                  style={{
                    padding: "13px",
                    margin: "0px",
                    fontSize: "14px",
                  }}
                >
                  Details
                  {/* {label} {schema.label || this.getCollectionName()} Information
                  Form */}
                </p>
              </div>
              <div
                className="bg-white shadow rounded-bottom p-3 px-lg-5 py-lg-4 overflow-auto"
                style={{ height: "70vh" }}
              >
                <form onSubmit={this.onSubmitForm.bind(this)}>
                  <div className="row g-3">
                    {advanced ? (
                      <InputJson
                        defaultValue={object}
                        onChange={this.onChangeObject.bind(this)}
                        rows="15"
                      />
                    ) : (
                      <FormFactory
                        schema={schema}
                        object={object}
                        disabled={forViewing}
                        onChange={this.onChange.bind(this)}
                        // excludeFields={["password"]}
                      />
                    )}
                  </div>
                  <div className="mt-4">
                    {!forViewing && (
                      <button
                        type="submit"
                        className="btn text-primary fs-sm me-3"
                        style={{
                          backgroundColor: "#D1D1D1E7",
                        }}
                      >
                        <i className="bi bi-file-earmark-check me-2"></i>SAVE
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-light fs-sm bg-primary text-white"
                      onClick={this.onClickBack.bind(this)}
                    >
                      GO BACK
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(CollectionFormPage);
