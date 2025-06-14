import React, { Component } from "react";
import BasePage from "../../base/BasePage";
import FunctionPresenter from "./FunctionPresenter";
import { restUseCase } from "../../usecases/rest";
import NavBar from "../../components/navbar";
import AddFunction from "./AddFunction";
import { Button, Progress, dialog } from "nq-component";
import fieldss from "./fieldss.json";

class FunctionPage extends BasePage {
  constructor(props) {
    super(props);
    this.presenter = new FunctionPresenter(this, restUseCase());
    this.state = { object: null, progress: true };
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  setObject(object) {
    this.setState({ object });
  }

  onClickAddFunction() {
    const schemas = this.getSchemas();
    dialog.fire({
      html: (
        <AddFunction
          collections={schemas.map((s) => s.collection)}
          onSubmit={(o) => {
            dialog.close();
            this.presenter.onSubmitAddFunctions(o);
          }}
          onCancel={() => dialog.close()}
        />
      ),
      footer: false,
    });
  }
  render() {
    const { object, progress } = this.state;
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
                    onClick={this.onClickAddFunction.bind(this)}
                    className="dropdown-item py-3"
                  >
                    <i className="bi bi-folder-plus pe-2" />
                    Add Function
                  </button>
                </div>
              </div>
            );
          }}
        />

        <div className="overflow-auto">
          <div className="p-3 p-lg-4">
            <h1>Function</h1>
            <table className="table table-striped ">
              <thead>
                <tr>
                  {Object.keys(fieldss).map((key, index) => (
                    <th key={index} className="bg-dark text-white">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {object?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.target}</td>
                    <td>{item.query.id}</td>
                    <td>{item.value.status}</td>
                    <td>
                      <button className="btn btn-primary me-2">
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-primary me-2"
                        // onClick={this.deleteClick.bind(this, item._id?.$oid)}
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

export default FunctionPage;
