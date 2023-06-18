import React from 'react';

import AsyncSelect from 'react-select/async';
import classNames from "../../classNames";
import objectToOption from './objectToOption';
import GetOption from './GetOption';


const defaultProps = {
    where: {},
    schema: {},
    onChange: () => {
    },
    portal: "",
    indexes: ["name"]
}

function InputRelation({
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

    console.log("changes");
    return (
        <AsyncSelect
            placeholder={label}
            classNamePrefix="custom-form-control"
            menuPortalTarget={portal}
            loadOptions={loadOptions}
            value={value}
            defaultOptions={true}
            onChange={_onChange}
            className={classNames(className)}
            isMulti={isMulti}
            cache={false}
            cacheOptions={false}
            isDisabled={disabled}
            {...props}
        />
    );
}

InputRelation.defaultProps = defaultProps;

export default InputRelation;
