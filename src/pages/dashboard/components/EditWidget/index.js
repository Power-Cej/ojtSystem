import React from "react";
import InputFactory from "../../../../components/InputFactory";
import {Switch} from "nq-component";

function EditWidget({widgets}) {
    const [isAdvanced, setAdvanced] = React.useState(false);

    function _onSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="p-3 pb-4">
            <h4 className="fw-bold">Edit Widget</h4>
            <div className="bg-light p-2">
                <div className="d-flex justify-content-between">
                    <label>OBJECT</label>
                    <Switch onChange={setAdvanced} id="dashboard-advance" label="Advanced"/>
                </div>
            </div>
            <form className="mt-3" onSubmit={_onSubmit}>

            </form>
        </div>
    )
}

export default EditWidget;