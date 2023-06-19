import React from 'react';
import {
    InputRelation,
    InputString,
    InputPassword,
    InputNumber,
    InputText,
    InputImage,
    Checkbox,
    InputJson,
} from "nq-component";
import InputPointer from "../InputPointer";
import {findObjectUseCase} from "../../usecases/object";
import {saveImageUseCase} from "../../usecases/file";
import Context from "../../AppContext";
import InputSelect from "../InputSelect";

const find = findObjectUseCase();
const save = saveImageUseCase();
const defaultProps = {
    object: {}
}

function InputFactory({type, _type, field, object, schemas, ...options}) {
    const context = React.useContext(Context);
    const value = object[field];
    switch (_type || type) {
        case 'Email':
        case 'String':
            return <InputString
                type={type.toLowerCase()}
                defaultValue={value}
                field={field}
                object={object}
                {...options}/>;
        case 'Date':
            return <InputString
                type={type.toLowerCase()}
                field={field}
                object={object}
                {...options}/>;
        case 'Password':
            return <InputPassword
                field={field}
                object={object}
                {...options}/>;
        case 'Number':
        case 'Tel':
            return <InputNumber
                field={field}
                object={object}
                {...options}/>;

        case 'Text':
            return <InputText
                field={field}
                type={type.toLowerCase()}
                object={object}
                {...options}/>;
        case 'Relation':
            return <InputRelation
                isMulti={type === 'Relation'}
                schema={options.schema || (schemas || context.schemas).find(s => s.collection === options.target)}
                find={find}
                {...options}/>;
        case 'Pointer':
            return <InputPointer
                schema={options.schema || (schemas || context.schemas).find(s => s.collection === options.target)}
                find={find}
                {...options}/>;
        case 'Image':
            return <InputImage
                field={field}
                object={object}
                save={save}
                {...options}/>;
        case 'Boolean':
            return <Checkbox
                id={object.id}
                type={type.toLowerCase()}
                {...options}/>;
        case 'Object':
        case 'Array':
            return <InputJson
                id={object.id}
                defaultValue={JSON.stringify(value, null, 4) || ''}
                {...options}/>;
        case 'Enum':
            return <InputSelect
                type={type.toLowerCase()}
                options={options.options}
                {...options}/>;
        default:
            return null;
    }
}

InputFactory.defaultProps = defaultProps;
export default InputFactory;
