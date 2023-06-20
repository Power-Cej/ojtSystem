import React from 'react';
import AsyncSelect from 'react-select/async';
import classNames from "../../classNames";
import objectToOption from './objectToOption';
import GetOption from './GetOption';
import getIndexes from '../../getIndexes';

const defaultProps = {
    where: {},
    schema: {},
    onChange: () => {
    },
    portal: ""
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
    // get schema
    const fields = schema.fields;
    const _indexes = React.useMemo(() => {
        const items = getIndexes(fields);
        // name is the default index of the fields
        return items.length > 0 ? items : ['name'];
    }, [fields]);
    const [value, setValue] = React.useState([]);
    // set default value
    React.useEffect(() => {
        if (isMulti) {
            defaultValue && setValue(defaultValue.map(obj => objectToOption(obj, _indexes)));
        } else {
            defaultValue && setValue(objectToOption(defaultValue, _indexes));
        }
    }, [_indexes, defaultValue, isMulti]);

    // load or filter the options
    function loadOptions(word, callback) {
        new GetOption(schema.collection, _indexes, word, callback, find, where);
    }


    function _onChange(data) {
        // filter new value
        const added = data
            .filter(i => !value.includes(i))
            .map(o => ({id: o.value}));
        // filter removed value
        const removed = value.filter(i => !data.includes(i))
            .map(o => ({id: o.value, __operation: 'REMOVE'}));
        // merge new and removed
        const objects = [...added, ...removed];
        onChange(objects);
        setValue(data);
    }

    if (fields === undefined) return <p>invalid schema</p>;
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
            cacheOptions
            isDisabled={disabled}
            {...props}
        />
    );
}

InputRelation.defaultProps = defaultProps;

export default InputRelation;
