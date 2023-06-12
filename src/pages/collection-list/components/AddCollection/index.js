import React from 'react';
import {InputString} from "nq-component";
import {InputIcon} from "nq-component";
import {Switch} from "nq-component";
import {InputJson} from "nq-component";

function AddCollection({schema, onSubmit, onCancel}) {
    const [isAdvanced, setAdvanced] = React.useState(false);
    return (
        <>
            <div className="p-3 pb-4">
                <h4 className="fw-bold">Add Collection</h4>
                <div className="bg-light p-2">
                    <div className="d-flex justify-content-between">
                        <label>SCHEMA</label>
                        <Switch onChange={setAdvanced} id="schema-advance" label="Advanced"/>
                    </div>
                </div>
                <form className="mt-3" onSubmit={onSubmit}>
                    <div className="row g-3">
                        {
                            isAdvanced && (
                                <div className="col-md-12">
                                    <InputJson
                                        field="schema"
                                        object={{schema: schema}}
                                        rows="10"
                                    />
                                </div>
                            )
                        }
                        {
                            !isAdvanced && (
                                <>
                                    <div className="col-md-12">
                                        <label className="form-label">Collection Name</label>
                                        <InputString
                                            field="collection"
                                            placeholder="Give it a good name"
                                            required
                                            object={schema}/>
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">Description</label>
                                        <InputString
                                            field="description"
                                            placeholder="A short description"
                                            object={schema}/>
                                    </div>
                                </>
                            )
                        }
                        <div className="col-md-12 text-end">
                            <button
                                type="submit"
                                className="btn btn-primary btn-sm">
                                <i className="bi bi-file-earmark-check me-2"></i>Save class
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm ms-2"
                                onClick={onCancel}>Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddCollection;
