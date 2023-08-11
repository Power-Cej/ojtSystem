import React from 'react';
import {InputFactory as Factory} from "nq-component";
import {findObjectUseCase, saveObjectUseCase} from "../../usecases/object";
import {saveFileUseCase, saveImageUseCase} from "../../usecases/file";
import Context from "../../AppContext";

const defaultProps = {}

function InputFactory({type, _type, field, object, hidden, required, onChange, ...props}) {
    const context = React.useContext(Context);

    return <Factory
        type={type}
        _type={_type}
        field={field}
        object={object}
        schemas={context.schemas}
        hidden={hidden}
        required={required}
        onChange={onChange}
        findObject={findObjectUseCase()}
        saveObject={saveObjectUseCase()}
        saveImage={saveImageUseCase()}
        saveFile={saveFileUseCase()}
        {...props}/>
}

InputFactory.defaultProps = defaultProps;
export default InputFactory;
