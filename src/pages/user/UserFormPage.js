import BasePage from "../../base/BasePage";
import UserFormPagePresenter from "./UserFormPagePresenter";
import getSchemaByClass from "../../getSchemaByClass";
import InputFactory from "../../components/InputFactory";
import {saveObjectUseCase, findObjectUseCase, updateObjectUseCase} from '../../domain/object';
import {NavBar} from "nq-component";
import withRouter from "../../withRouter";

class UserFormPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {object: {}};
        this.presenter = new UserFormPagePresenter(this, saveObjectUseCase(), findObjectUseCase(), updateObjectUseCase());
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    getClassName() {
        return 'users';
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
        const schemas = this.context.schemas;
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
        if (!schema) return <h1>no schema</h1>;
        const {fields} = schema;

        return (
            <>
                <NavBar className="shadow-sm"/>
                <div className="container-fluid mt-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <form className="p-2" onSubmit={this.formSubmit.bind(this)}>
                                <div className="row g-3 mb-3">
                                    <div className="px-2">
                                        <p className="small fw-bold mb-0 ms-1">General Details</p>
                                        <hr className="dropdown-divider"/>
                                    </div>
                                    {
                                        Object.keys(fields).map((field) => {
                                            let {type, ...options} = fields[field];
                                            if (options.hasOwnProperty('write') && !options.write) return null;
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
            </>
        )
    }
}

export default withRouter(UserFormPage);
