import React from "react";
import {findObjectUseCase, saveObjectUseCase} from "../../usecases/object";
import {saveFileUseCase, saveImageUseCase} from "../../usecases/file";
import Context from "../../AppContext";
import InputFactory from "../InputFactory";
import {FormFactory as Factory} from "nq-component";


function FormFactory({schema, object, onChange, excludeFields, ...props}) {
    const context = React.useContext(Context);
    return <Factory
        className="col-md-4"
        schema={schema}
        schemas={context.schemas}
        object={object}
        onChange={onChange}
        excludeFields={excludeFields}
        findObject={findObjectUseCase()}
        saveObject={saveObjectUseCase()}
        saveImage={saveImageUseCase()}
        saveFile={saveFileUseCase()}
        componentFactory={InputFactory}
        {...props}/>
}

export default FormFactory;
