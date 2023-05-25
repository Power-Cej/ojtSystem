import React from "react";
import {InputString} from "nq-component";
import {InputSelect} from "nq-component";
import {InputBooleanSwitch} from "nq-component";
import OptionType from "./OptionType";

const options = ['String', 'Number', 'Boolean', 'Date', 'Object', 'Array', 'Pointer', 'Relation', 'Image', 'Enum'];


function AddField({field, onSubmit, onCancel, collections}) {
    const [type, setType] = React.useState('String');
    React.useEffect(() => {
        field['type'] = 'String';
    }, [field]);
    return (
        <div className="p-3 pb-4">
            <form onSubmit={onSubmit}>
                <div className="row g-3">
                    <div className="col-md-12">
                        <label className="form-label fs-sm">Field name</label>
                        <InputString
                            className="form-control"
                            field="name"
                            placeholder="give it a good name"
                            required
                            object={field}/>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label fs-sm">Field type</label>
                        <InputSelect
                            onChange={value => setType(value)}
                            className="form-control"
                            field="type"
                            options={options}
                            required
                            object={field}/>
                    </div>
                    <OptionType
                        type={type}
                        field={field}
                        collections={collections}/>
                    <div className="col-md-12">
                        <InputBooleanSwitch
                            id="switch-required"
                            field="required"
                            object={field}/>
                    </div>
                    <div className="col-md-12">
                        <InputBooleanSwitch
                            id="switch-unique"
                            field="unique"
                            object={field}/>
                    </div>
                    <div className="col-md-12">
                        <InputBooleanSwitch
                            id="switch-index"
                            field="index"
                            object={field}/>
                    </div>
                    <div className="col-md-12 text-end">
                        <button
                            type="submit"
                            className="btn btn-sm btn-primary fs-sm">
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
