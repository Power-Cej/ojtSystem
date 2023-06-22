class BaseFormPresenter {
    constructor(view, getObjectUseCase, upsertUseCase) {
        this.view = view;
        this.getObjectUseCase = getObjectUseCase;
        this.upsertUseCase = upsertUseCase;
    }

    componentDidMount() {
        this.init();
        this.getObject();
    }

    init() {
        this.object = {};
        this.changes = {};// when data is change
    }

    async getObject() {
        const collection = this.view.getCollectionName();
        const id = this.view.getObjectId();
        if (id) {
            const params = {include: ['all']};
            try {
                this.view.showProgress();
                const object = await this.getObjectUseCase.execute(collection, id, {params});
                this.view.hideProgress();
                this.view.setObject(object);
            } catch (error) {
                this.view.hideProgress();
                this.view.showError(error);
            }
        }
    }


    onChange(field, data) {
        this.changes[field] = data;
    }

    async submit() {
        if (Object.values(this.changes).length === 0) {
            this.view.navigateBack();
            return;
        }
        try {
            const collection = this.view.getCollectionName();
            const object = this.view.getObject();
            this.view.showProgress();
            if (object.id) {
                this.changes.id = object.id;
            } else {
                this.changes.acl = this.view.getAcl();
            }
            await this.upsertUseCase.execute(collection, this.changes);
            this.view.hideProgress();
            this.view.showSuccessSnackbar("Successfully updated!");
            this.view.navigateBack();
        } catch (error) {
            this.view.hideProgress();
            this.view.showError(error);
        }
    }


    onClickBack() {
        if (Object.values(this.changes).length > 0) {
            const message = 'You have unsaved changes that will be lost if you proceed. Are you sure you want to discard these changes?';
            this.view.showConfirmDialog(message, 'Discard Changes', 'DISCARD')
                .then(() => {
                    this.view.navigateBack();
                })
                .catch(() => {

                });
            return;
        }
        this.view.navigateBack();
    }
}

export default BaseFormPresenter;
