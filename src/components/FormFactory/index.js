import React from "react";
import InputFactory from "../InputFactory";
import FormTab from "./FormTab";


function group(schema) {
    const {fields, sections} = schema;
    const groups = {
        "General Details": {}
    };
    for (const key in fields) {
        const {section, ...options} = fields[key];
        if (sections && sections[section]) {
            groups[section] = groups[section] || {};
            groups[section][key] = options;
        } else {
            groups["General Details"][key] = options;
        }
    }
    return groups;
}


function FormFactory({schema, object, onChange}) {
    const [_tab, setTab] = React.useState();
    const tabs = schema.tabs;
    const sections = schema.sections || {};
    const groups = group(schema);
    return (
        <>
            <FormTab
                onSet={setTab}
                tabs={tabs}/>
            <div className="row g-3 mt-3">
                {
                    Object.keys(groups)
                        .map(key => {
                            const fields = groups[key];
                            const {label} = sections[key] || {};
                            return (
                                <>
                                    <div className="col-12">
                                        <p className="small fw-bold mb-0 ms-1">{label || key}</p>
                                        <hr/>
                                    </div>
                                    {
                                        Object.keys(fields).map((field) => {
                                            let {type, pattern, write, tab, col, ...options} = fields[field];
                                            if ((_tab && tab ) && (_tab !== tab)) return null;
                                            if (write === false) return null;
                                            if (field === 'password') {
                                                type = "Password";
                                            }
                                            return (
                                                <div className={col || "col-md-4"}
                                                     key={field}>
                                                    <label
                                                        className="form-label fs-sm">{field}</label>
                                                    <InputFactory
                                                        className="fs-sm"
                                                        field={field}
                                                        type={type}
                                                        object={object}
                                                        onChange={onChange.bind(this, field)}
                                                        {...options}/>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                            )
                        })
                }

            </div>
        </>
    )
}

export default FormFactory;