import React from 'react';

let timeout;

function Search({fields, onSubmit}) {
    const keys = Object.keys(fields);
    const [key, setKey] = React.useState(keys.length > 0 ? keys[0] : "");
    const [query, setQuery] = React.useState({});

    function submit(e) {
        e.preventDefault();
        onSubmit(query);
    }

    function onChange(value) {
        const query = {};
        query[key] = {$regex: value, $options: 'i'};
        setQuery(query);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSubmit(query);
        }, 300);
    }

    return (
        <form className="d-flex justify-content-end" onSubmit={submit}>
            <div>
                <div className="input-group">
                    <select
                        onChange={e => setKey(e.target.value)}
                        className="form-select shadow-none fs-xs">
                        {
                            Object.keys(fields)
                                .map((key) => {
                                    const options = fields[key];
                                    if (options.hasOwnProperty('read') && !options.read) return null;
                                    return (
                                        <option key={key} value={key}>{key}</option>
                                    );
                                })
                        }
                    </select>
                    <input
                        type="text"
                        onChange={e => onChange(e.target.value)}
                        className="form-control form-control-sm shadow-none"
                        placeholder="Search"/>
                </div>
            </div>
        </form>
    );
}

export default Search;
