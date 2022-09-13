import {InputSelect} from "nq-component";
import React from "react";

function TypeRelation({field, collections}) {
    React.useEffect(() => {
        field['target'] = collections[0];
        return () => {
            delete field['target'];
        }
    }, [field, collections]);
    return (
        <div className="col-md-12">
            <label className="form-label fs-sm">target class</label>
            <InputSelect
                className="form-control form-control"
                field="target"
                options={collections}
                object={field}
                required
            />
        </div>
    )
}

export default TypeRelation;
