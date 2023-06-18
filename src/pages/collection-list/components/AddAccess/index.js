import React from "react";
import InputFactory from "../../../../components/InputFactory";
import schemas from "../../../../schemas.json";

const options = ["Roles", "Users"];

function AddAccess({onBack}) {
    const [collection, setCollection] = React.useState(options[1]);

    function onChangeAccess(object) {
    }

    function onChangeCollection(value) {
        setCollection(value);
    }

    return (
        <div className="p-2 pb-3">
            <h4 className="fw-bold">Add Access</h4>
            <div className="row g-3 align-items-center mt-3">
                <div className="col-auto">
                    <label className="col-form-label">Add Access for</label>
                </div>
                <div className="col">
                    <InputFactory
                        options={options}
                        onChange={onChangeCollection}
                        type="Enum"/>
                </div>
                <div className="col-12">
                    <label className="form-label">{collection}:</label>
                    <InputFactory
                        onChange={onChangeAccess}
                        schema={schemas.find(s => s.collection === collection.toLowerCase())}
                        type="Pointer"/>
                </div>
                <div className="col-12 text-end mt-5">
                    <button
                        type="submit"
                        className="btn btn-primary btn-sm">
                        <i className="bi bi-plus me-2"></i>ADD
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-primary btn-sm ms-2"
                        onClick={onBack}>BACK
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddAccess;