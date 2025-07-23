import React from "react";
import FormFactory from "../FormFactory";

function FormDialog({schema, object, onSave, onBack, findObject, saveObject, saveImage, saveFile, schemas, ...props}) {
    const [change, setChange] = React.useState({});

    function onChange(value, field) {
        setChange({
            ...change,
            [field]: value,
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        try {
            const object = await saveObject.execute(schema.collection, change);
            onSave(object);
        } catch (error) {
            console.error("FAILED SEND", error);
        }
    }

    return (
        <div className="py-4 px-2">
            <h4 className="fw-bold">Create {schema.label || schema.collection}</h4>
            <form onSubmit={onSubmit}>
                <div className="row g-2">
                    <FormFactory
                        className="col-md-6"
                        schema={schema}
                        object={object}
                        onChange={onChange}
                        findObject={findObject}
                        saveObject={saveObject}
                        saveFile={saveFile}
                        saveImage={saveImage}
                        schemas={schemas}
                        {...props}/>
                </div>
                <div className="text-end mt-3">
                    <button
                        type="submit"
                        className="btn btn-primary btn-sm">
                        <i className="bi bi-plus me-2"></i>SAVE AND ASSOCIATE
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-primary btn-sm ms-2"
                        onClick={onBack}>GO BACK
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormDialog;