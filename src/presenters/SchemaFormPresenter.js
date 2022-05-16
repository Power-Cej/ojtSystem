class SchemaFormPresenter {
    constructor(view, createSchemaUseCase) {
        this.view = view;
        this.createSchemaUseCase = createSchemaUseCase;
    }

    onSubmit(schema) {
        this.view.showProgress();
        this.createSchemaUseCase.execute(schema)
            .then((result) => {
                this.view.hideProgress();
            })
            .catch(error => {
                this.view.showError(error.message);
                this.view.hideProgress();
            })
    }
}

export default SchemaFormPresenter;
