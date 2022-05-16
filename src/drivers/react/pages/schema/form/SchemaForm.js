import React from 'react';
import SchemaFormPresenter from '../../../presenters/SchemaFormPresenter';
import {addSchemaUseCase} from '../../../domain/schema/usecases';
import InputString from "../../../components/Form/type/InputString";
import InputIcon from "../../../components/Form/type/InputIcon";
import BasePage from "../../../base/BasePage";

class SchemaForm extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new SchemaFormPresenter(this, addSchemaUseCase);
        this.state = {schema: {}};
    }

    onSubmit(e) {
        e.preventDefault();
        this.presenter.onSubmit(this.state.schema);
    }

    render() {
        const {schema} = this.state;
        return (
            <div className="container-fluid p-md-5">

                <div className="row">

                    <div className="col-md-8 col-12 mb-3">

                        <div className="card shadow-sm">
                            <div className="card-body">
                                <form className="p-2" onSubmit={this.onSubmit.bind(this)}>

                                    <InputString
                                        field='className'
                                        object={schema}/>

                                    <InputIcon
                                        field='icon'
                                        object={schema}/>


                                    <button
                                        type="submit"
                                        className="btn btn-dark px-4">
                                        <span className="small fw-bold">Save</span>
                                    </button>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SchemaForm;
