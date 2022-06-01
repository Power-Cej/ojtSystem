import BasePage from "../../base/BasePage";
import FormPagePresenter from "./FormPagePresenter";
import getSchemaByClass from "../../getSchemaByClass";
import InputFactory from "../../components/InputFactory";
import {saveObjectUseCase, findObjectUseCase, updateObjectUseCase} from '../../domain/object';
import NavBar from "../../components/NavBar";
import withContext from "../../withContext";

class FormPage extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new FormPagePresenter(this, saveObjectUseCase(), findObjectUseCase(), updateObjectUseCase());
        this.state = {object: {}};
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    getClassName() {
        return this.props.params.name;
    }

    getObjectId() {
        return this.props.params.id;
    }

    formSubmit(e) {
        e.preventDefault();
        this.presenter.submit();
    }

    getObject() {
        return this.state.object;
    }

    getSchema() {
        const schemas = this.props.schemas;
        return getSchemaByClass(schemas, this.getClassName());
    }

    backCLick() {
        this.presenter.backClick();
    }


    setObject(object) {
        this.setState({object});
    }

    render() {
        const object = this.state.object;
        const schema = this.getSchema();
        if (!schema) return null;
        const {fields} = schema;

        return (
            <>
                <NavBar className="shadow-sm"/>
                <div className="container-fluid mt-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <form className="p-2" onSubmit={this.formSubmit.bind(this)}>
                                <div className="row g-3">
                                    <div className="px-2">
                                        <p className="small fw-bold mb-0 ms-1">General Details</p>
                                        <hr className="dropdown-divider"/>
                                    </div>
                                    {
                                        Object.keys(fields).map((field) => {
                                            let {type, ...options} = fields[field];
                                            if (options.hasOwnProperty('write') && !options.write) return null;
                                            if (schema.name === "users" && field === "password") {
                                                type = "Password";
                                            }
                                            return (
                                                <div className="col-md-4" key={field}>
                                                    <label className="form-label fs-sm">{field}</label>
                                                    <InputFactory
                                                        className="fs-sm"
                                                        field={field}
                                                        type={type}
                                                        object={object}
                                                        {...options}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="mt-3 text-end">
                                    <button type="submit" className="btn btn-primary fs-sm">
                                        <i className="bi bi-file-earmark-check me-2"></i>SAVE
                                    </button>
                                    <button type="button" className="btn btn-light fs-sm ms-2"
                                            onClick={this.backCLick.bind(this)}>GO BACK
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withContext(FormPage);
