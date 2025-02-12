import React from 'react';
import RelatedFactory from '../RelatedFactory';


const defaultProps = {}

function InputRelation({onChange, schema, label, field, defaultValue, ...props}) {
    const _schema = {
        collection: props.target,
        fields: {}
    };
    _schema.fields[field] = {
        type: 'Pointer',
        target: props.target,
        label: label,
        col: "col-10"
    }
    const _onChange = (value) => {
        onChange(
            value.reduce((acc, cur) => {
                if (cur[field] && Object.keys(cur[field]).length > 0) {
                    acc.push(cur[field]);
                }
                return acc;
            }, [])
        )
    }
    const mapValue = () => {
        return defaultValue.map(o => {
            const object = {};
            object.id = o.id;
            object[field] = o;
            return object;
        });
    }
    return <RelatedFactory
        col="col=12"
        onChange={_onChange}
        schema={_schema}
        defaultValue={defaultValue && mapValue()}
        {...props}/>;
}

InputRelation.defaultProps = defaultProps;

export default InputRelation;
