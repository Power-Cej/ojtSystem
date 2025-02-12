import React from "react";
import Search from "../Search";
import OutputTable from "../OutputTable";
import FormDialog from "../FormDialog";

const defaultProps = {};

function RelationDialog({schema, onClickItem, onCancel, findObject, saveObject, saveImage, saveFile, schemas}) {
    const [isAdd, setIsAdd] = React.useState(false);
    const [where, setWhere] = React.useState({});

    function onSubmitSearch(where) {
        setWhere(where);
    }

    if (isAdd) {
        return (
            <FormDialog
                onSave={onClickItem}
                schema={schema}
                onBack={() => setIsAdd(false)}
                findObject={findObject}
                saveObject={saveObject}
                saveFile={saveFile}
                saveImage={saveImage}
                schemas={schemas}/>
        )
    }
    return (
        <div className="py-4 px-2">
            <h4 className="fw-bold">Select {schema.label || schema.collection}</h4>
            <Search
                className="mt-3"
                fields={schema.fields}
                onSubmit={onSubmitSearch}
            />
            <div className="overflow-auto mt-3" style={{maxHeight: "400px"}}>
                <OutputTable
                    where={where}
                    onClickItem={onClickItem}
                    schema={schema}
                    findObject={findObject}
                    excludeFields={
                        Object.keys(schema.fields)
                            .reduce((acc, key) => {
                                const options = schema.fields[key];
                                if (options.read === false) {
                                    acc.push(key);
                                }
                                switch (options._type || options.type) {
                                    case 'Relation':
                                    case 'Array':
                                    case 'Object':
                                    case 'File':
                                        acc.push(key);
                                        break;
                                    default:
                                }
                                return acc;
                            }, ['acl', 'password'])
                    }
                />
            </div>
            <div className="text-end mt-3">
                <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    onClick={() => setIsAdd(true)}>
                    <i className="bi bi-plus me-2"></i>ADD
                </button>
                <button
                    type="button"
                    className="btn btn-outline-primary btn-sm ms-2"
                    onClick={onCancel}>CANCEL
                </button>
            </div>
        </div>
    )
}

RelationDialog.defaultProps = defaultProps;
export default RelationDialog;
