import React from 'react';
import InputString from "./type/InputString";
import InputRelation from "./type/InputRelation";
import InputPointer from "./type/InputPointer";
import InputPassword from "./type/InputPassword";
import InputImage from "./type/InputImage";
import InputText from "./type/InputText";
import InputDate from "./type/InputDate";
import InputNumber from "./type/InputNumber";

function InputFactory({type, field, object, ...options}) {
    switch (type) {
        case 'Email':
        case 'String':
            return <InputString
                field={field}
                type={type.toLowerCase()}
                object={object}
                {...options}/>;
        case 'Number':
        case 'Tel':
            return <InputNumber
                field={field}
                object={object}
                {...options}/>;
        case 'Date':
            return <InputDate
                field={field}
                type={type.toLowerCase()}
                object={object}
                {...options}/>;
        case 'Text':
            return <InputText
                field={field}
                type={type.toLowerCase()}
                object={object}
                {...options}/>;
        case 'Password':
            return <InputPassword
                field={field}
                type={type.toLowerCase()}
                object={object}
                {...options}/>;

        case 'Relation':
            return <InputRelation
                field={field}
                type={type.toLowerCase()}
                object={object}
                {...options}/>;
        case 'Pointer':
            return <InputPointer
                field={field}
                type={type.toLowerCase()}
                object={object}
                {...options}/>;
        case 'Image':
            return <InputImage
                field={field}
                type={type.toLowerCase()}
                object={object}
                {...options}/>;
        default:
            return <div/>;
    }
}

export default InputFactory;
