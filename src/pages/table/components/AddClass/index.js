import React from 'react';
import {InputString} from "nq-component";
import {InputIcon} from "nq-component";
import {Switch} from "nq-component";
import {InputJson} from "nq-component";

function AddCLass({schema, onSubmit, onCancel}) {
    const [isAdvanced, setAdvanced] = React.useState(false);
    return (
        <>
            <div className="bg-light p-2">
                <div className="d-flex justify-content-between">
                    <label>SCHEMA</label>
                    <Switch onChange={setAdvanced} id="schema-advance" label="Advanced"/>
                </div>
            </div>
            <div className="p-2 pb-3">
                <form onSubmit={onSubmit}>
                    <div className="row g-3">
                        {
                            isAdvanced && (
                                <InputJson
                                    field="schema"
                                    object={{schema: schema}}
                                    rows="10"
                                />
                            )
                        }
                        {
                            !isAdvanced && (
                                <>
                                    <div className="col-md-12">
                                        <label className="form-label">collection name</label>
                                        <InputString
                                            field="collection"
                                            placeholder="give it a good name"
                                            required
                                            object={schema}/>
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">icon</label>
                                        <InputIcon
                                            field='icon'
                                            object={schema}/>
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">label</label>
                                        <InputString
                                            field='label'
                                            placeholder="optional"
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

export default AddCLass;
