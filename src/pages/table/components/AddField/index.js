import React from "react";
import InputString from "../../../../components/InputFactory/type/InputString";
import InputSelect from "../../../../components/InputFactory/type/InputSelect";

const options = ['String', 'Number', 'Boolean', 'Date', 'Object', 'Array', 'Pointer', 'Relation', 'Image'];


function AddField({object, onSubmit, onCancel, schemas}) {
    const [isPointer, setPointer] = React.useState(false);

    function onChange(value) {
        setPointer(value === 'Pointer');
    }
    
    return (
        <div className="p-3 pb-4">
            <form onSubmit={onSubmit}>
                <div className="row g-3">
                    <div className="col-md-12">
                        <label className="form-label fs-sm">field name</label>
                        <InputString
                            className="form-control form-control"
                            field="name"
                            placeholder="give it a good name"
                            required
                            object={object}/>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label fs-sm">field type</label>
                        <InputSelect
                            onChange={onChange}
                            className="form-control form-control"
                            field="type"
                            options={options}
                            required
                            object={object}/>
                    </div>
                    {
                        isPointer && (
                            <div className="col-md-12">
                                <label className="form-label fs-sm">target class</label>
                                <InputSelect
                                    className="form-control form-control"
                                    field="target"
                                    options={schemas}
                                    required
                                    object={object}/>
                            </div>
                        )
                    }

                    <div className="col-md-12 text-end">
                        <button
                            type="submit"
                            className="btn btn-primary fs-sm">
                            <i className="bi bi-file-earmark-check me-2"></i>ADD FIELD
                        </button>
                        <button
                            type="button"
                            className="btn btn-light fs-sm ms-2"
                            onClick={onCancel}>CANCEL
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default AddField;
