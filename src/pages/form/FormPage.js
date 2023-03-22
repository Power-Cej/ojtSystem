import BasePage from "../../base/BasePage";
import FormPagePresenter from "./FormPagePresenter";
import InputFactory from "../../components/InputFactory";
import {saveObjectUseCase, findObjectUseCase, updateObjectUseCase} from '../../usecases/object';
import {NavBar} from "nq-component";
import camelToTitleCase from "../../camelToTitleCase";
import withRouter from "../../withRouter";

class FormPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {object: {}};
        this.presenter = new FormPagePresenter(this, saveObjectUseCase(), findObjectUseCase(), updateObjectUseCase());
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    getCollectionName() {
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


    backCLick() {
        this.presenter.backClick();
    }


    setObject(object) {
        this.setState({object});
    }

    render() {
        const object = this.state.object;
        const schema = this.getSchema(this.getCollectionName());
        if (!schema) return <h1>no schema</h1>;
        const {fields} = schema;
        return (
            <>
                <NavBar className="shadow-sm"/>
                <div className="container p-3 px-lg-5 py-lg-4 overflow-auto">
                    <h2>
                        Add New Items
                    </h2>
                    <div className="mt-3 bg-white shadow rounded p-3 px-lg-5 py-lg-4">
                        <form onSubmit={this.formSubmit.bind(this)}>
                            <div className="row g-3 mb-3">
                                <div className="px-2">
                                    <p className="small fw-bold mb-0 ms-1">General Details</p>
                                    <hr className="dropdown-divider"/>
                                </div>
                                {
                                    Object.keys(fields).map((field) => {
                                        const {type, ...options} = fields[field];
                                        if (options.hasOwnProperty('write') && !options.write) return null;
                                        return (
                                            <div className="col-md-4" key={field}>
                                                <label
                                                    className="form-label fs-sm">{camelToTitleCase(field)}</label>
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
            </>
        )
    }
}

export default withRouter(FormPage);
