import React from 'react';

import classNames from "../../classNames";
import objectToOption from './objectToOption';
import GetOption from './GetOption';
import SelectSearch from "../SelectSearch";


const defaultProps = {
    where: {},
    schema: {},
    onChange: () => {
    },
    portal: "",
    indexes: ["name"]
}

function InputPointer({
                          className,
                          isMulti,
                          schema,
                          find,
                          where,
                          disabled,
                          onChange,
                          label,
                          indexes,
                          portal,
                          defaultValue,
                          ...props
                      }) {
    const [value, setValue] = React.useState([]);
    // set default value
    React.useEffect(() => {
        if (isMulti) {
            defaultValue && setValue(defaultValue.map(obj => objectToOption(obj, indexes)));
        } else {
            defaultValue && setValue(objectToOption(defaultValue, indexes));
        }
    }, [indexes]);

    // load or filter the options
    function loadOptions(word, callback) {
        GetOption(schema.collection, word, indexes, find, where, callback);
    }

    function _onChange(data) {
        setValue(data);
        onChange(isMulti ? data.map(o => o.object) : data.object);
    }
    return (
        <SelectSearch
            className={classNames(className)}
            loadOptions={loadOptions}
            value={value}
            onChange={_onChange}
            {...props}
        />
    );
}

InputPointer.defaultProps = defaultProps;

export default InputPointer;
