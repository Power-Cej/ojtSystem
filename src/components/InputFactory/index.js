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
    const {type, _type, field, object, schemas, ...options} = props;
    const context = React.useContext(Context);
    const value = object[field];
    switch (_type || type) {
        case 'Email':
        case 'String':
            return <InputString
                type={type.toLowerCase()}
                defaultValue={value}
                {...options}/>;
        case 'Date':
            return <InputString
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
                {...options}/>;
        case 'Relation':
            return <InputRelation
                defaultValue={value}
                isMulti={type === 'Relation'}
                schema={options.schema || (schemas || context.schemas).find(s => s.collection === options.target)}
                find={findObject}
                {...options}/>;
        case 'Pointer':
            return <InputPointer
                defaultValue={value}
                schema={options.schema || (schemas || context.schemas).find(s => s.collection === options.target)}
                find={findObject}
                {...options}/>;
        case 'Image':
            return <InputImage
                value={value}
                save={saveImage}
                {...options}/>;
        case 'File':
            return <InputFile
                value={value}
                save={saveFile}
                {...options}/>;
        case 'Boolean':
            return <Checkbox
                defaultChecked={value}
                id={object.id}
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
