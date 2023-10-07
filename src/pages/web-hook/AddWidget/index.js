import React from "react";
// import InputFactory from "../../../../components/InputFactory";
import { Switch } from "nq-component";
import InputFactory from "../../../components/InputFactory";

const options = ["CardCount"];

function AddHook({ collections, onSubmit, onCancel }) {
  const [isAdvanced, setAdvanced] = React.useState(false);
  const [object, setObject] = React.useState();

  function onChange(field, value) {
    setObject((state) => ({ ...state, [field]: value }));
  }

  function _onSubmit(e) {
    e.preventDefault();
    onSubmit(object);
  }

  function onChangeObject(object) {
    setObject(object);
  }

  return (
    <div className="p-3 pb-4">
      <h4 className="fw-bold">Add Hooks</h4>
      <div className="bg-light p-2">
        <div className="d-flex justify-content-between">
          <label>JSON</label>
          <Switch
            onChange={setAdvanced}
            id="dashboard-advance"
            label="Advanced"
          />
        </div>
      </div>
      <form className="mt-3" onSubmit={_onSubmit}>
        <div className="row g-3">
          {isAdvanced ? (
            <div className="col-md-12">
              <InputFactory
                type="Object"
                field="object"
                object={{ object: object }}
                onChange={onChangeObject}
                rows="10"
              />
            </div>
          ) : (
            <>
              <div className="col-md-12">
                <label className="form-label fs-sm">Collection</label>
                <InputFactory
                  object={object}
                  type="String"
                  options={options}
                  onChange={onChange.bind(this, "collection")}
                  field="collection"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="form-label fs-sm">Url</label>

                <InputFactory
                  object={object}
                  type="String"
                  options={options}
                  onChange={onChange.bind(this, "url")}
                  field="url"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="form-label fs-sm">Trigger</label>
                <InputFactory
                  object={object}
                  type="String"
                  options={options}
                  onChange={onChange.bind(this, "trigger")}
                  field="trigger"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="form-label fs-sm">Payload</label>
                <InputFactory
                  type="Object"
                  field="payload"
                  object={{ object: object }}
                  onChange={onChangeObject}
                  rows="5"
                />
              </div>
              <div className="col-md-12">
                <label className="form-label fs-sm">Headers</label>
                <InputFactory
                  type="Object"
                  field="payload"
                  object={{ object: object }}
                  onChange={onChangeObject}
                  rows="5"
                />
              </div>
              <div className="col-md-12">
                <label className="form-label fs-sm">Timeout</label>
                <InputFactory
                  object={object}
                  type="Number"
                  options={options}
                  onChange={onChange.bind(this, "timeout")}
                  field="timeout"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="form-label fs-sm">Trigger</label>
                <InputFactory
                  object={object}
                  type="Boolean"
                  options={options}
                  onChange={onChange.bind(this, "override")}
                  field="override"
                  className="form-control"
                  required
                />
              </div>
            </>
          )}
          <div className="col-md-12 text-end">
            <button type="submit" className="btn btn-sm btn-primary fs-sm">
              <i className="bi bi-file-earmark-check me-2"></i>ADD Hooks
            </button>
            <button
              type="button"
              className="btn btn-light btn-sm fs-sm ms-2"
              onClick={onCancel}
            >
              CANCEL
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddHook;
