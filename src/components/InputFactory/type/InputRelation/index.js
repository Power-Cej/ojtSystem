import React from 'react';
import AsyncSelect from 'react-select/async';
import classNames from "../../../../classNames";
import objectToOption from './objectToOption';
import GetOption from './GetOption';
import Context from "../../../../AppContext";
import getIndexes from '../../../../getIndexes';
import getSchemaByClass from '../../../../getSchemaByClass';

function InputRelation({className, field, object, target}) {
    const {schemas} = React.useContext(Context);
    const schema = getSchemaByClass(schemas, target);
    const indexes = React.useMemo(() => {
        const i = getIndexes(schema.fields);
        return i.length > 0 ? i : ['name'];
    }, [schema.fields]);
    const relations = React.useMemo(() => {
        return object[field] || [];
    }, [object, field]);
    const classes = classNames(className);
    const [values, setValues] = React.useState([]);
    React.useEffect(() => {
        setValues(relations.map(obj => objectToOption(obj, indexes)));
        object[field] = [];
    }, [relations, indexes]);

    function loadOptions(key, callback) {
        new GetOption(target, indexes, key, callback);
    }

    function onChange(_values) {
        const added = _values
            .filter(i => !values.includes(i))
            .map(o => ({id: o.id}));
        const removed = values.filter(i => !_values.includes(i))
            .map(o => ({id: o.id, __operation: 'REMOVE'}));
        const objects = [...added, ...removed];
        object[field] = [...objects, ...object[field].filter(a => !objects.find(b => a.id === b.id))];
        setValues(_values);
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
