import React from "react";
import CollectionFormPresenter from "./CollectionFormPresenter";
import InputFactory from "../../components/InputFactory";
import {getObjectUseCase, upsertUseCase} from '../../usecases/object';
import {NavBar} from "nq-component";
import withRouter from "../../withRouter";
import BaseFormPage from "../../base/BaseFormPage";

class CollectionFormPage extends BaseFormPage {
    constructor(props) {
        super(props);
        this.state = {object: {}};
        this.presenter = new CollectionFormPresenter(this, getObjectUseCase(), upsertUseCase());
    }

    render() {
        const object = this.state.object;
        const schema = this.getSchema(this.getCollectionName());
        if (!schema) return <h1>no schema</h1>;
        const {fields} = schema;
        const label = this.getObjectId() === undefined ? "Add New " : "Edit ";
        return (
            <>
                <NavBar className="shadow-sm"/>
                <div className="overflow-auto">
                    <div className="h-100">
                        <div className="p-3 p-lg-4">
                            <h1 className="fw-bold mt-3 text-capitalize">{label + this.getCollectionName()}</h1>
                            <div className="mt-3 bg-white shadow rounded p-3 px-lg-5 py-lg-4">
                                <form onSubmit={this.formSubmit.bind(this)}>
                                    <div className="row g-3 mb-3">
                                        <div className="px-2">
                                            <p className="small fw-bold mb-0 ms-1">General Details</p>
                                            <hr className="dropdown-divider"/>
                                        </div>
                                        {
                                            Object.keys(fields).map((field) => {
                                                let {type, pattern, ...options} = fields[field];
                                                if (field === 'password') {
                                                    type = "Password";
                                                }
                                                if (options.hasOwnProperty('write') && !options.write) return null;
                                                return (
                                                    <div className="col-md-4" key={field}>
                                                        <label
                                                            className="form-label fs-sm">{field}</label>
                                                        <InputFactory
                                                            className="fs-sm"
                                                            field={field}
                                                            type={type}
                                                            object={object}
                                                            onChange={this.onChange.bind(this, field)}
                                                            {...options}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-primary fs-sm me-3">
                                            <i className="bi bi-file-earmark-check me-2"></i>SAVE
                                        </button>
                                        <button type="button" className="btn btn-light fs-sm"
                                                onClick={this.backCLick.bind(this)}>GO BACK
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(CollectionFormPage);
