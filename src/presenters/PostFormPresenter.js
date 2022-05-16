import changes from '../changes';

class FormPagePresenter {
    constructor(view, saveObjectUseCase, findObjectUseCase, updateObjectUseCase, saveImageUseCase) {
        this.view = view;
        this.saveObjectUseCase = saveObjectUseCase;
        this.findObjectUseCase = findObjectUseCase;
        this.updateObjectUseCase = updateObjectUseCase;
        this.saveImageUseCase = saveImageUseCase;
        this.object = {};
    }

    componentDidMount() {
        this.initObject();
    }

    initObject() {
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
        } else {
            const object = {};
            const user = this.view.getCurrentUser();
            const params = this.view.getParams();
            object.author = user;
            object.category = {id: params.category};
            object.type = params.type;
            this.view.setObject(Object.assign({}, object));
        }
    }

    publishClick() {
        const className = 'posts';
        const content = this.view.getContent();
        const title = content[0].children[0];
        const text = content[1].children[0];
        // check title
        if (typeof title !== 'string') {
            this.view.showError('Title is required');
            return;
        }
        if (!text) {
            this.view.showError('Content is required');
            return;
        }
        // set value
        const object = this.view.getObject();
        object.content = content;
        this.view.showProgress();
        if (object.id) {
            const change = changes(this.object, object);
            change.id = object.id;
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

    insertImageClick(file) {
        this.saveImageUseCase.execute(file)
            .then(result => {
                const url = result.url;
                console.log(result);
                this.view.executeCommand('insertImage', url);
            })
            .catch(error => {
                this.view.showError(error);
            });
    }

    backClick() {
        //check if object is unsave
        this.view.navigateBack();
    }

}

export default FormPagePresenter;
