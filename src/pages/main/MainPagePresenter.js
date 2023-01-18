import localSchemas from "../../schemas.json";
import mergeSchema from "../../mergeSchema";

/**
 * responsible for get the current user and current roles and schemas
 */
class MainPagePresenter {
    constructor(view, getCurrentUserUseCase, signOutUseCase, getSchemaUseCase) {
        this.view = view;
        this.getCurrentUserUseCase = getCurrentUserUseCase;
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
                if (!user.roles) {
                    this.view.navigateTo('/denied');
                    return;
                }
                this.view.setRoles(user.roles);
                this.view.setCurrentUser(user);
            });
    }


    getSchema() {
        return this.getSchemaUseCase.execute()
            .then(_schemas => {
                const schemas = mergeSchema(localSchemas, _schemas);
                this.view.setSchemas(schemas);
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
