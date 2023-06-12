import React from 'react';
import {
    InputString,
    InputPassword,
    InputDate,
    InputNumber,
    InputSelect,
    InputText,
    InputRelation,
    InputImage,
    InputBooleanCheckbox,
    InputJson,
} from "nq-component";
import {findObjectUseCase} from "../../usecases/object";
import {saveImageUseCase} from "../../usecases/file";
import Context from "../../AppContext";

const find = findObjectUseCase();
const save = saveImageUseCase();

function InputFactory({type, _type, field, object, ...options}) {
    const context = React.useContext(Context);
    switch (_type || type) {
        case 'Email':
        case 'String':
            return <InputString
                field={field}
                type={type.toLowerCase()}
                object={object}
                {...options}/>;
        case 'Password':
            return <InputPassword
                field={field}
                object={object}
                {...options}/>;
        case 'Enum':
            return <InputSelect
                field={field}
                type={type.toLowerCase()}
                object={object}
                options={options.values}
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
        case 'Relation':
        case 'Pointer':
            return <InputRelation
                isMulti={type === 'Relation'}
                field={field}
                type={type.toLowerCase()}
                object={object}
                schemas={context.schemas}
                find={find}
                {...options}/>;
        case 'Image':
            return <InputImage
                field={field}
                object={object}
                save={save}
                {...options}/>;
        case 'Boolean':
            return <InputBooleanCheckbox
                id={object.id}
                field={field}
                type={type.toLowerCase()}
                object={object}
                {...options}/>;
        case 'Object':
        case 'Array':
            return <InputJson
                id={object.id}
                field={field}
                object={object}
                {...options}/>;
        default:
            return null;
    }
}

export default InputFactory;
