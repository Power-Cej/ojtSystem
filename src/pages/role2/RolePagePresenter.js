import changes from "../../changes";

class RolePagePresenter {
    constructor(view, saveObjectUseCase, updateSchemaUseCase, findObjectUseCase, updateObjectUseCase) {
        this.view = view;
        this.saveObjectUseCase = saveObjectUseCase;
        this.updateSchemaUseCase = updateSchemaUseCase;
        this.findObjectUseCase = findObjectUseCase;
        this.updateObjectUseCase = updateObjectUseCase;
        this.object = {};
        this.newShemas = [];
    }

    componentDidMount() {
        this.init();
    }

    init() {
        const className = this.view.getCollectionName();
        const id = this.view.getObjectId();
        const query = {include: ['all'], where: {id}};
        if (id) {
            this.view.showProgress();
            this.findObjectUseCase
                .execute(className, query)
                .then(([object]) => {
                    this.view.hideProgress();
                    this.object = object;
                    this.view.setObject(Object.assign({}, object));
                })
                .catch(error => {
                    this.view.hideProgress();
                    this.view.showError(error);
                });
        }
    }

    submit() {
        const className = this.view.getCollectionName();
        const object = this.view.getObject();
        this.view.showProgress();
        if (object.id) {
            const change = changes(this.object, object);
            change.id = this.object.id;
            this.updateObjectUseCase.execute(className, change)
                .then(this.saveSchema.bind(this))
                // .then(() => {
                //     this.view.hideProgress();
                //     this.view.showSuccessSnackbar("Successfully updated!");
                //     this.view.navigateBack();
                // })
                .catch(error => {
                    this.view.hideProgress();
                    this.view.showError(error);
                });
        } else {
            const roles = this.view.getCurrentRoles();
            const aclRoles = roles.map(r => `role:${r.name}`);
            const user = this.view.getCurrentUser();
            const acl = {
                read: [user.id, aclRoles],
                write: [user.id, aclRoles],
            }
            object.acl = acl;
            this.saveObjectUseCase.execute(className, object)
                .then(this.saveSchema.bind(this))
                // .then(() => {
                //     this.view.hideProgress();
                //     this.view.showSuccessSnackbar("Successfully saved!");
                //     this.view.navigateBack();
                // })
                .catch(error => {
                    this.view.hideProgress();
                    this.view.showError(error);
                });
        }
    }

    backClick() {
        // @todo check if object is un-save show discard
        this.view.navigateBack();
    }

    saveSchema() {
        const promises = this.newShemas.map(schema => this.updateSchemaUseCase.execute(schema));
        Promise.all(promises)
            .then(() => {
                this.view.hideProgress();
                this.view.showSuccessSnackbar("Successfully saved!");
                this.view.navigateBack();
            })
            .catch(error => {
                this.view.hideProgress();
                this.view.showError(error);
            });
    }

    permissionChange(schema, key, checked) {
        const schemas = this.view.getSchemas();
        const id = this.view.getPermissionId().toLowerCase();
        const permissions = schema.permissions;
        if (checked) {
            permissions[key] = permissions[key] || [];
            permissions[key].push(id);
        } else {
            const index = permissions[key].indexOf(id);
            permissions[key].splice(index, 1);
        }
        const index = this.newShemas.indexOf(schema);
        if (index < 0) {
            this.newShemas.push(schema);
        }
        this.view.setSchemas(schemas);
    }

}

export default RolePagePresenter;
