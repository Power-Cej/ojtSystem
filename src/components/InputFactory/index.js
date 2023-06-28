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

const findObject = findObjectUseCase();
const saveImage = saveImageUseCase();
const saveFile = saveFileUseCase();
const defaultProps = {
    object: {}
}

function InputFactory(props) {
    const {type, _type, field, object, schemas, hidden, required, ...options} = props;
    const context = React.useContext(Context);
    const value = object[field];
    switch (_type || type) {
        case 'Email':
        case 'String':
            return <InputString
                defaultValue={value}
                type={type.toLowerCase()}
                {...options}/>;
        case 'Date':
            return <InputString
                defaultValue={value && value.slice(0, 10)}
                type={type.toLowerCase()}
                {...options}/>;
        case 'Password':
            return <InputPassword
                {...options}/>;
        case 'Number':
        case 'Tel':
            return <InputNumber
                defaultValue={value}
                {...options}/>;
        case 'Text':
            return <InputText
                field={field}
                type={type.toLowerCase()}
                object={object}
                required={required}
                {...options}/>;
        case 'Relation':
            return <InputRelation
                defaultValue={value}
                isMulti={type === 'Relation'}
                schema={options.schema || (schemas || context.schemas).find(s => s.collection === options.target)}
                find={findObject}
                required={required}
                {...options}/>;
        case 'Pointer':
            return <InputPointer
                defaultValue={value}
                schema={options.schema || (schemas || context.schemas).find(s => s.collection === options.target)}
                find={findObject}
                required={required}
                {...options}/>;
        case 'Image':
            return <InputImage
                value={value}
                save={saveImage}
                required={required}
                {...options}/>;
        case 'File':
            return <InputFile
                value={value}
                save={saveFile}
                required={required}
                {...options}/>;
        case 'Boolean':
            return <Checkbox
                defaultChecked={value}
                id={object.id}
                required={required}
                {...options}/>;
        case 'Object':
        case 'Array':
            return <InputJson
                defaultValue={JSON.stringify(value, null, 4) || ''}
                id={object.id}
                required={required}
                {...options}/>;
        case 'Enum':
            return <InputSelect
                defaultValue={value}
                type={type.toLowerCase()}
                options={options.options}
                label={(options.dynamic ? "Select of type " : "Select ") + field}
                required={required}
                {...options}/>;
        default:
            return null;
    }
}

InputFactory.defaultProps = defaultProps;
export default InputFactory;
