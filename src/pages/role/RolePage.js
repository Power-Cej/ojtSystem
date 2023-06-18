import BasePage from "../../base/BasePage";

import {InputString, Table} from "nq-component";
import {Checkbox} from "nq-component";
import RolePagePresenter from "./RolePagePresenter";
import {findObjectUseCase, saveObjectUseCase, updateObjectUseCase} from "../../usecases/object";
import {updateSchemaUseCase} from "../../usecases/schema/usecases";
import withRouter from "../../withRouter";
import NavBar from "../../components/navbar";
import React from "react";

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

    getCollectionName() {
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
        const fields = {
            Collections: {
                type: "String"
            }
        };
        const objects = schemas.map(s => {
            return {
                id: s.collection,
                Collections: s.collection,
                schema:s,
            };
        })
        return (
            <>
                <NavBar className="shadow-sm"/>
                <div className="container">
                    <div className="py-3 px-lg-5 py-lg-4">
                        <h1 className="fw-bold mt-3 text-capitalize">{this.getCollectionName()}</h1>
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
                                    <Table
                                        fields={fields}
                                        objects={objects}
                                        onCollapse={({schema}) => {
                                            const collection = schema.collection;
                                            const permissions = schema.permissions;
                                            return (
                                                <div className="row">
                                                    {
                                                        permissionKeys.map(key => {
                                                            const id = this.getPermissionId().toLowerCase();
                                                            const access = permissions[key] || [];
                                                            const check = access.includes(id);
                                                            if (!user.isMaster && key === 'modify') return null;
                                                            return (
                                                                <div className="col-6">
                                                                    <Checkbox
                                                                        className="text-capitalize"
                                                                        label={key}
                                                                        onChange={this.permissionChange.bind(this, schema, key)}
                                                                        checked={check}
                                                                    />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        }}
                                    />
                                    <div className="mt-3">
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
