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
        const className = this.view.getClassName();
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
        const className = this.view.getClassName();
        const object = this.view.getObject();
        this.view.showProgress();
        if (object.id) {
            const change = changes(this.object, object);
            change.id = this.object.id;
            this.updateObjectUseCase.execute(className, change)
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
            this.saveObjectUseCase.execute(className, object)
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
