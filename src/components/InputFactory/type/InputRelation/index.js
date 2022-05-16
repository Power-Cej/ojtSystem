import React from 'react';
import AsyncSelect from 'react-select/async';
import classNames from "../../../../classNames";
import optionToObject from './optionToObject';
import objectToOption from './objectToOption';
import GetOption from './GetOption';
import Context from "../../../../AppContext";
import getIndexes from '../../../../getIndexes';
import getSchemaByClass from '../../../../getSchemaByClass';

function InputRelation({className, field, object, options}) {
    const {schemas} = React.useContext(Context);
    const {targetClass} = options;
    const schema = getSchemaByClass(schemas, targetClass);
    const indexes = React.useMemo(() => {
        const i = getIndexes(schema.fields);
        return i.length > 0 ? i : ['name'];
    }, [schema.fields]);
    const relations = React.useMemo(() => {
        return object[field] || [];
    }, [object, field]);
    const classes = classNames(className);
    const [values, setValues] = React.useState();
    React.useEffect(() => {
        setValues(relations.map(obj => objectToOption(obj, indexes)));
    }, [relations, indexes]);

    function loadOptions(key, callback) {
        new GetOption(targetClass, indexes, key, callback);
    }

    function onChange(values) {
        setValues(values);
        object[field] = values.map(optionToObject);
    }

    return (
        <AsyncSelect
            placeholder={`select ${field}`}
            classNamePrefix="custom-form-control"
            menuPortalTarget={document.body}
            loadOptions={loadOptions}
            value={values}
            defaultOptions={true}
            onChange={onChange}
            className={classes}
            isMulti
            cacheOptions
        />
    );
}

export default InputRelation;
