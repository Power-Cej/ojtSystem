import localSchemas from "../../schemas.json";
import mergeSchema from "../../mergeSchema";

/**
 * responsible for get the current user and current roles and schemas
 */
class MainPagePresenter {
    constructor(view, getCurrentUserUseCase, getRolesByUserUseCase, signOutUseCase, getSchemaUseCase) {
        this.view = view;
        this.getCurrentUserUseCase = getCurrentUserUseCase;
        this.getRolesByUserUseCase = getRolesByUserUseCase;
        this.signOutUseCase = signOutUseCase;
        this.getSchemaUseCase = getSchemaUseCase;
    }

    componentDidMount() {
        this.init();
    }

    init() {
        this.view.showProgress();
        Promise.resolve()
            .then(() => this.getUser())
            .then(() => this.getRoles())
            .then(() => this.getSchema())
            .then(() => {
                this.view.hideProgress();
            })
            .catch(error => {
                this.view.hideProgress();
                if (error.code === 209) {
                    this.view.navigateTo('/signin');
                } else {
                    this.view.showError(error);
                }
            });
    }

    getUser() {
        return this.getCurrentUserUseCase.execute()
            .then(user => {
                this.user = user;
                this.view.setCurrentUser(user);
            });
    }

    getRoles() {
        return this.getRolesByUserUseCase.execute(this.user)
            .then(roles => {
                if (roles.length === 0) {
                    this.view.navigateTo('/denied');
                    return;
                }
                this.roles = roles;
                this.view.setRoles(roles);
            });
    }

    getSchema() {
        return this.getSchemaUseCase.execute()
            .then(_schemas => {
                const schemas = mergeSchema(localSchemas, _schemas);
                this.view.setSchemas(schemas);
                this.view.hideProgress();
            })
    }

    signOutClick() {
        const options = {
            title: 'Confirm',
            message: 'Are you sure you want to sign out?',
            positiveButton: 'SIGN OUT'
        }
        this.view.showDialog(options)
            .then(() => this.signOutUseCase.execute())
            .then(() => {
                this.view.navigateTo('/signin');
            })
            .catch(error => {
                this.view.showError(error);
            });
    }

}

export default MainPagePresenter;
