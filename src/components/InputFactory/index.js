import React from 'react';
import {
    InputString,
    InputPassword,
    InputDate,
    InputNumber,
    InputSelect,
    InputText,
    InputRelation,
    InputImage
} from "nq-component";
import {findObjectUseCase} from "../../domain/object";
import Context from "../../AppContext";

const find = findObjectUseCase();

function InputFactory({type, _type, name, object, ...options}) {
    const context = React.useContext(Context);
    switch (_type || type) {
        case 'Email':
        case 'String':
            return <InputString
                name={name}
                type={type.toLowerCase()}
                object={object}
                {...options}/>;
        case 'Password':
            return <InputPassword
                name={name}
                object={object}
                {...options}/>;
        case 'Enum':
            return <InputSelect
                name={name}
                type={type.toLowerCase()}
                object={object}
                options={options.values}
                {...options}/>;
        case 'Number':
        case 'Tel':
            return <InputNumber
                name={name}
                object={object}
                {...options}/>;
        case 'Date':
            return <InputDate
                name={name}
                type={type.toLowerCase()}
                object={object}
                {...options}/>;
        case 'Text':
            return <InputText
                name={name}
                type={type.toLowerCase()}
                object={object}
                {...options}/>;
        case 'Relation':
        case 'Pointer':
            return <InputRelation
                isMulti={type === 'Relation'}
                name={name}
                type={type.toLowerCase()}
                object={object}
                schemas={context.schemas}
                find={find}
                {...options}/>;
        case 'Image':
            return <InputImage
                name={name}
                type={type.toLowerCase()}
                object={object}
                {...options}/>;
        default:
            return null;
    }
}

export default InputFactory;
