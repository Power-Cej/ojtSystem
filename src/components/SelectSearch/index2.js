import React, {useState, useEffect, useRef} from "react";

const noop = () => {
}
const defaultProps = {
    loadOptions: noop,
    onChange: noop,
    value: {label: "", value: ""},
    label: "Select"
}

function SelectSearch({value, label, onChange, loadOptions}) {
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState('');
    const [text, setText] = useState('');
    const [isOpen, setOpen] = useState(false);
    const ref = useRef(null);

    // handle click outside event
    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClickOutside);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    // when value change
    useEffect(() => {
        setText(value.label);
        setSearch("");
    }, [value]);

    function _onChange(e) {
        const character = e.target.value.replace(text, '');
        if (search === "") {
            e.target.value = character;
        }
        // set the new character input by the user
        setSearch(e.target.value);
        setText(e.target.value);
        // load with search text
        loadOptions(e.target.value, setOptions);
    }

    // call the load in initialize
    useEffect(() => {
        loadOptions(search, setOptions);
    }, []);

    function onClick(e) {
        if (!isOpen) {
            e.target.blur();
        }
        setOpen(true);
    }

    function onSelect(value) {
        onChange(value);
        setOpen(false);
        if (search) {
            // reset the options if has search
            loadOptions('', setOptions);
        }
    }
    return (
        <div className="input-group" ref={ref}>
            <div style={{position: 'relative', width: '100%'}}>
                <input
                    onClick={onClick}
                    type="text"
                    className="form-select form-control"
                    placeholder={label}
                    value={text}
                    onChange={_onChange}
                    style={{cursor: isOpen ? 'text' : 'default'}}
                />
                {isOpen && (
                    <div className="list-group rounded-0"
                         style={{
                             position: 'absolute',
                             top: '100%',
                             width: '100%',
                             maxHeight: '200px',
                             overflowY: 'auto',
                             zIndex: 1000
                         }}>
                        {
                            options.map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className="list-group-item list-group-item-action"
                                    onClick={() => onSelect(option)}>
                                    {option.label}
                                </button>
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

SelectSearch.defaultProps = defaultProps;
export default SelectSearch;
