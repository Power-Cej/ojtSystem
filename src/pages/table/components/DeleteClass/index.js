import {InputString} from "nq-component";

function DeleteClass({object, onSubmit, onCancel}) {
    return (
        <div className="p-2">
            <form onSubmit={onSubmit}>
                <div>
                    <label className="form-label">class name</label>
                    <InputString
                        field="className"
                        placeholder="Current class name"
                        required
                        object={object}/>
                </div>
                <div className="mt-3 text-end">
                    <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={onCancel}>Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-danger btn-sm ms-2">
                        <i className="bi bi-trash me-2"></i>Yes, Delete
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DeleteClass;
