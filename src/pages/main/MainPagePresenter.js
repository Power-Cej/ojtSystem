import localSchemas from "../../schemas.json";
import mergeSchema from "../../mergeSchema";

/**
 * responsible for get the current user and current roles and schemas
 */
class MainPagePresenter {
    constructor(view, getCurrentUserUseCase, findSubscription, signOutUseCase, getSchemaUseCase) {
        this.view = view;
        this.getCurrentUserUseCase = getCurrentUserUseCase;
        this.findSubscription = findSubscription;
        this.signOutUseCase = signOutUseCase;
        this.getSchemaUseCase = getSchemaUseCase;
    }

    componentDidMount() {
        this.getUser();
    }

    getUser() {
        this.view.showProgress();
        this.getCurrentUserUseCase.execute()
            .then(user => {
                this.view.hideProgress();
                this.view.setCurrentUser(user);
                this.getSchema();
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


    getSchema() {
        this.getSchemaUseCase.execute()
            .then(_schemas => {
                const schemas = mergeSchema(localSchemas, _schemas);
                this.view.setSchemas(schemas);
                this.view.hideProgress();
            })
            .catch(error => {
                this.view.showError(error.message);
                this.view.hideProgress();
            });
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
