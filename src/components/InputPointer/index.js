import React from 'react';

import classNames from "../../classNames";
import objectToOption from './objectToOption';
import getOption from './getOption';
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
    const [value, setValue] = React.useState();
    const [options, setOptions] = React.useState([]);
    // set default value
    React.useEffect(() => {
        if (isMulti) {
            defaultValue && setValue(defaultValue.map(obj => objectToOption(obj, indexes)));
        } else {
            defaultValue && setValue(objectToOption(defaultValue, indexes));
        }
    }, [indexes, defaultValue, isMulti]);

    // load the initial select
    React.useEffect(() => {
        setValue({label: '', value: ''});//reset
        getOption(schema.collection, '', indexes, find, where, setOptions);
    }, [schema, find, indexes, where]);

    function _onChange(option) {
        setValue(option);
        onChange(isMulti ? option.map(o => o.object) : option.object);
    }

    function onSearch(word) {
        getOption(schema.collection, word, indexes, find, where, setOptions);
    }


    return (
        <SelectSearch
            className={classNames(className)}
            options={options}
            value={value}
            onSearch={onSearch}
            onChange={_onChange}
            label={`Select ${schema.collection}`}
            focus
            {...props}
        />
    );
}

InputPointer.defaultProps = defaultProps;

export default InputPointer;
