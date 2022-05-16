import InputString from "../../../../components/InputFactory/type/InputString";
import InputIcon from "../../../../components/InputFactory/type/InputIcon";

function AddCLass({object, onSubmit, onCancel}) {
    return (
        <div className="p-2 pb-3">
            <form onSubmit={onSubmit}>
                <div className="row g-3">
                    <div className="col-md-12">
                        <label className="form-label">class name</label>
                        <InputString
                            field="name"
                            placeholder="give it a good name"
                            required
                            object={object}/>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">icon</label>
                        <InputIcon
                            field='icon'
                            object={object}/>
                    </div>
                    <div className="col-md-12 text-end">
                        <button
                            type="submit"
                            className="btn btn-primary btn-sm">
                            <i className="bi bi-file-earmark-check me-2"></i>Create class
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
    );
}

export default AddCLass;
