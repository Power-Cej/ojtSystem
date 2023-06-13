import {InputSelect} from "nq-component";
import React from "react";

const options = ['id', 'createdAt', 'updatedAt', 'acl', 'username', 'password', 'email', 'emailVerified'];

function DeleteField({object, onSubmit, onCancel, fields}) {
    return (
        <>
            <div className="p-3 pb-4">
                <h4 className="fw-bold">Delete Field</h4>
                <form onSubmit={onSubmit}>
                    <div>
                        <label className="form-label">Which field</label>
                        <InputSelect
                            field="name"
                            options={fields.filter(f => !options.includes(f))}
                            required
                            object={object}/>
                    </div>
                    <div className="mt-3 text-end">
                        <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={onCancel}>CANCEL
                        </button>
                        <button
                            type="submit"
                            className="btn btn-outline-danger btn-sm ms-3">
                            <i className="bi bi-trash me-2"></i>YES, DELETE
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default DeleteField;
