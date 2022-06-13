import changes from "../../changes";

class FormPagePresenter {
    constructor(view, saveObjectUseCase, findObjectUseCase, updateObjectUseCase) {
        this.view = view;
        this.saveObjectUseCase = saveObjectUseCase;
        this.findObjectUseCase = findObjectUseCase;
        this.updateObjectUseCase = updateObjectUseCase;
        this.roles = [];
        this.user = {};
    }

    componentDidMount() {
        this.init();
    }

    init() {
        const id = this.view.getObjectId();
        if (id) {
            this.view.showProgress();
            Promise.resolve()
                .then(() => this.getRoles())
                .then(() => this.getUser())
                .then(() => this.setUser())
                .catch(error => {
                    this.view.hideProgress();
                    this.view.showError(error);
                });
        }
    }

    getRoles() {
        const id = this.view.getObjectId();
        const query = {where: {users: [{id}]}};
        return this.findObjectUseCase
            .execute('roles', query)
            .then(roles => {
                this.roles = roles;
            });
    }

    getUser() {
        const id = this.view.getObjectId();
        const query = {include: ['all'], where: {id}};
        return this.findObjectUseCase
            .execute('users', query)
            .then(([user]) => {
                this.user = user;
            });
    }

    setUser() {
        this.view.hideProgress();
        const user = this.user;
        user.roles = this.roles;
        this.view.setObject(Object.assign({}, user));
    }

    submit() {
        this.view.showProgress();
        Promise.resolve()
            .then(() => this.saveUser())
            .then(() => this.saveRoles())
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

    saveUser() {
        const user = this.view.getObject();
        const action = user.id ? this.updateObjectUseCase : this.saveObjectUseCase;
        const change = changes(this.user, user);
        change.id = user.id;
        delete change.roles;
        return action.execute('users', change)
            .then(_user => {
                this.user = _user;
                this.user.roles = user.roles;
            });
    }
    
    saveRoles() {
        const user = this.user;
        const roles = this.user.roles;
        const promises = roles.map(role => {
            return this.updateObjectUseCase
                .execute('roles', {id: role.id, users: [{id: user.id, __operation: role.__operation}]});
        });
        return Promise.all(promises);
    }

    backClick() {
        this.view.navigateBack();
    }
}

export default FormPagePresenter;
