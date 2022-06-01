import React from 'react';
import AsyncSelect from 'react-select/async';
import classNames from "../../../../classNames";
import optionToObject from '../InputRelation/optionToObject';
import GetOption from '../InputRelation/GetOption';
import Context from "../../../../AppContext";
import getIndexes from '../../../../getIndexes';
import getSchemaByClass from '../../../../getSchemaByClass';
import objectToOption from "../InputRelation/objectToOption";
// possible to reuse the InputRelations with props isMulti
// for not dependent to each other it's ok for now
function InputPointer({className, field, object, target, schemas}) {
    const context = React.useContext(Context);
    const schema = getSchemaByClass(context.schemas || schemas, target);
    const indexes = React.useMemo(() => {
        const i = getIndexes(schema.fields);
        return i.length > 0 ? i : ['name'];
    }, [schema.fields]);
    const relations = React.useMemo(() => {
        return object[field];
    }, [object, field]);
    const classes = classNames(className);
    const [values, setValues] = React.useState();
    React.useEffect(() => {
        relations && setValues(objectToOption(relations, indexes));
    }, [relations, indexes]);

    function loadOptions(key, callback) {
        new GetOption(target, indexes, key, callback);
    }

    function onChange(values) {
        setValues(values);
        object[field] = optionToObject(values);
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
            isMulti={false}
            cacheOptions
        />
    );
}

export default InputPointer;
