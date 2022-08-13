import BasePage from "../../base/BasePage";
import NavBar from "../../components/NavBar";
import InputString from "../../components/InputFactory/type/InputString";
import Checkbox from "../../components/Checkbox";
import RolePagePresenter from "./RolePagePresenter";
import {findObjectUseCase, saveObjectUseCase, updateObjectUseCase} from "../../domain/object";
import getSchemaByClass from "../../getSchemaByClass";
import {updateSchemaUseCase} from "../../domain/schema/usecases";
import withRouter from "../../withRouter";

const permissionKeys = ['modify', 'find', 'create', 'update', 'delete'];

class RolePage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {role: {}};
        this.presenter = new RolePagePresenter(this, saveObjectUseCase(), updateSchemaUseCase(), findObjectUseCase(), updateObjectUseCase());
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    getClassName() {
        return 'roles';
    }

    getObjectId() {
        return this.props.params.id;
    }

    formSubmit(e) {
        e.preventDefault();
        this.presenter.submit();
    }

    getObject() {
        return this.state.role;
    }

    getSchema() {
        const schemas = this.props.schemas;
        return getSchemaByClass(schemas, this.getClassName());
    }

    backCLick() {
        this.presenter.backClick();
    }

    setObject(role) {
        this.setState({role});
    }

    getPermissionId() {
        return 'role:' + this.state.role.name;
    }

    permissionChange(schema, key, checked) {
        this.presenter.permissionChange(schema, key, checked);
    }

    render() {
        const role = this.state.role;
        const user = this.getCurrentUser();
        const schemas = this.getSchemas();
        return (
            <>
                <NavBar className="shadow-sm"/>
                <div className="container">
                    <div className="py-3 px-lg-5 py-lg-4">
                        <div className="shadow-sm rounded bg-white">
                            <div className="p-3 px-lg-5 py-lg-4">
                                <form onSubmit={this.formSubmit.bind(this)}>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label fs-sm">Role Name</label>
                                        <InputString
                                            object={role}
                                            field="name"
                                        />
                                    </div>
                                    <div className="table-responsive shadow-sm mb-3">
                                        <table className="table mb-0 w-100 table-striped">
                                            <thead className="table-dark">
                                            <tr>
                                                <th className="fs-xs align-middle">Privilege</th>
                                                {
                                                    permissionKeys.map(key => {
                                                        if (!user.isMaster && key === 'modify') return null;
                                                        return (
                                                            <th key={key}
                                                                className="fs-xs align-middle text-capitalize">{key}</th>
                                                        )
                                                    })
                                                }
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                schemas.map(schema => {
                                                    const collection = schema.name;
                                                    const permissions = schema.permissions;
                                                    return (
                                                        <tr>
                                                            <td className="fs-sm">{collection}</td>
                                                            {
                                                                permissionKeys.map(key => {
                                                                    const id = this.getPermissionId().toLowerCase();
                                                                    const access = permissions[key] || [];
                                                                    const check = access.includes(id);
                                                                    if (!user.isMaster && key === 'modify') return null;
                                                                    return (
                                                                        <td key={key}>
                                                                            <Checkbox
                                                                                onChange={this.permissionChange.bind(this, schema, key)}
                                                                                checked={check}/>
                                                                        </td>
                                                                    )
                                                                })
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
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

export default withRouter(RolePage);
