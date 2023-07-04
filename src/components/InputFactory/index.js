import React from 'react';
import {
    InputRelation,
    InputString,
    InputPassword,
    InputNumber,
    InputText,
    Checkbox,
    InputJson,
    InputImage,
    InputFile,
    InputPointer,
    InputSelect,
} from "nq-component";
import {findObjectUseCase} from "../../usecases/object";
import {saveFileUseCase, saveImageUseCase} from "../../usecases/file";
import Context from "../../AppContext";
import InputIcon from "../InputIcon";

const findObject = findObjectUseCase();
const saveImage = saveImageUseCase();
const saveFile = saveFileUseCase();
const defaultProps = {
    object: {}
}

function InputFactory({type, _type, field, object, schemas, hidden, required, ...props}) {
    const context = React.useContext(Context);
    const value = object[field];
    switch (_type || type) {
        case 'Email':
        case 'String':
            return <InputString
                defaultValue={value}
                type={type.toLowerCase()}
                {...props}/>;
        case 'Date':
            return <InputString
                defaultValue={value && value.slice(0, 10)}
                type={type.toLowerCase()}
                {...props}/>;
        case 'Password':
            return <InputPassword
                {...props}/>;
        case 'Number':
        case 'Tel':
            return <InputNumber
                defaultValue={value}
                {...props}/>;
        case 'Text':
            return <InputText
                field={field}
                type={type.toLowerCase()}
                object={object}
                required={required}
                {...props}/>;
        case 'Relation':
            return <InputRelation
                defaultValue={value}
                isMulti={type === 'Relation'}
                schema={props.schema || (schemas || context.schemas).find(s => s.collection === props.target)}
                find={findObject}
                required={required}
                {...props}/>;
        case 'Pointer':
            return <InputPointer
                defaultValue={value}
                schema={props.schema || (schemas || context.schemas).find(s => s.collection === props.target)}
                find={findObject}
                required={required}
                {...props}/>;
        case 'Image':
            return <InputImage
                value={value}
                save={saveImage}
                required={required}
                {...props}/>;
        case 'File':
            return <InputFile
                value={value}
                save={saveFile}
                required={required}
                {...props}/>;
        case 'Boolean':
            return <Checkbox
                defaultChecked={value}
                id={object.id}
                required={required}
                {...props}/>;
        case 'Object':
        case 'Array':
            return <InputJson
                defaultValue={JSON.stringify(value, null, 4) || ''}
                id={object.id}
                required={required}
                {...props}/>;
        case 'Enum':
            return <InputSelect
                defaultValue={value}
                type={type.toLowerCase()}
                options={props.options}
                label={(props.dynamic ? "Select of type " : "Select ") + (field || '')}
                required={required}
                {...props}/>;
        case 'Icon':
            return <InputIcon
                defaultValue={value}
                options={props.options}
                required={required}
                {...props}/>;
        default:
            return null;
    }
}

InputFactory.defaultProps = defaultProps;
export default InputFactory;
