import {InputArray} from "nq-component";
import React from "react";

function TypeEnum({field}) {
    React.useEffect(() => {
        field['type'] = 'String';
        field['_type'] = 'Enum';
        return () => {
            delete field['_type'];
        }
    }, [field]);
    return (
        <div className="col-md-12">
            <label className="form-label fs-sm">values</label>
            <InputArray
                className="form-control form-control"
                field="values"
                required
                object={field}/>
        </div>
    )
}

export default TypeEnum;
