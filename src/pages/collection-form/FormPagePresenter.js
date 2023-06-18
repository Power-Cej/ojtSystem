import changes from "../../changes";

class FormPagePresenter {
    constructor(view, saveObjectUseCase, findObjectUseCase, updateObjectUseCase) {
        this.view = view;
        this.saveObjectUseCase = saveObjectUseCase;
        this.findObjectUseCase = findObjectUseCase;
        this.updateObjectUseCase = updateObjectUseCase;
        this.object = {};
    }

    componentDidMount() {
        this.init();
    }

    init() {
        const collection = this.view.getCollectionName();
        const id = this.view.getObjectId();
        if (id) {
            const query = {where: {id}, include: ['all']};
            this.view.showProgress();
            this.findObjectUseCase
                .execute(collection, query)
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
        const collection = this.view.getCollectionName();
        const object = this.view.getObject();
        this.view.showProgress();
        if (object.id) {
            const change = changes(this.object, object);
            change.id = this.object.id;
            this.updateObjectUseCase.execute(collection, change)
                .then(() => {
                    this.view.hideProgress();
                    this.view.showSuccessSnackbar("Successfully updated!");
                    this.view.navigateBack();
                })
                .catch(error => {
                    this.view.hideProgress();
                    this.view.showError(error);
                });
        } else {
            const roles = this.view.getCurrentRoles();
            const aclRoles = roles.map(r => `role:${r.name}`);
            const user = this.view.getCurrentUser();
            const acl = {
                read: ['*', user.id, ...aclRoles],
                write: [user.id, ...aclRoles],
            }
            object.acl = acl;
            this.saveObjectUseCase.execute(collection, object)
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
    }

    backClick() {
        // @todo check if object is un-save show discard
        this.view.navigateBack();
    }
}

export default FormPagePresenter;
