import React from 'react';
import {Checkbox} from "nq-component";


const permissionKeys = ['read', 'write'];

function Access({access, onSubmit, onCancel}) {
    const [_access, setAccess] = React.useState({...access});
    const list = Array.from(new Set([...access.read, ...access.write]));

    function permissionChange(id, key, checked) {
        if (checked) {
            _access[key].push(id);
        } else {
            const index = _access[key].indexOf(id);
            _access[key].splice(index, 1);
        }
        setAccess({..._access});
    }

    function onKeyDown(e) {
        const value = e.target.value;
        switch (e.keyCode) {
            case 13:
                e.preventDefault();
                _access.read.push(value);
                _access.write.push(value);
                setAccess({..._access});
                break;
            default:
        }
    }

    return (
        <>
            <div className="p-2 pb-3">
                <form onSubmit={onSubmit}>
                    <div className="row g-3">
                        <div className="col-md-12">
                            <div className="table-responsive shadow-sm mb-3">
                                <table className="table mb-0 w-100 table-striped">
                                    <thead className="table-dark">
                                    <tr>
                                        <th className="fs-xs align-middle">Privilege</th>
                                        {
                                            permissionKeys.map(key => {
                                                return (
                                                    <th key={key}
                                                        className="fs-xs align-middle text-capitalize">{key}</th>
                                                )
                                            })
                                        }
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        list.map(id => {
                                            return (
                                                <tr
                                                    key={id}>
                                                    <td className="fs-sm">{id === '*' ? 'Public' : id}</td>
                                                    {
                                                        permissionKeys.map(key => {
                                                            const check = _access[key].includes(id);
                                                            return (
                                                                <td key={id + key}>
                                                                    <Checkbox
                                                                        checked={check}
                                                                        onChange={permissionChange.bind(this, id, key)}/>
                                                                </td>
                                                            )
                                                        })
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr>
                                        <td>
                                            <input
                                                onKeyDown={onKeyDown}
                                                placeholder="add access"/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="col-md-12 text-end">
                            <button
                                type="submit"
                                className="btn btn-primary btn-sm">
                                <i className="bi bi-file-earmark-check me-2"></i>Save class
                            </button>
                            <button
                                type="button"
                                className="btn btn-light btn-sm ms-3"
                                onClick={onCancel}>Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Access;
