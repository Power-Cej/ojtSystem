class TablePagePresenter {
    constructor(view, findObjectUseCase, updateObjectUseCase, deleteObjectUseCase, addSchemaUseCase, updateSchemaUseCase, exportCSVUseCase, deleteSchemaUseCase) {
        this.view = view;
        this.findObjectUseCase = findObjectUseCase;
        this.updateObjectUseCase = updateObjectUseCase;
        this.deleteObjectUseCase = deleteObjectUseCase;
        this.addSchemaUseCase = addSchemaUseCase;
        this.updateSchemaUseCase = updateSchemaUseCase;
        this.exportCSVUseCase = exportCSVUseCase;
        this.deleteSchemaUseCase = deleteSchemaUseCase;
    }

    componentDidMount() {
        this.init();
        this.getData();
    }

    init() {
        this.limit = 10;
        this.current = 1;
        this.where = {};
        this.documents = [];
        this.progress = true;
        this.view.setObjects([]);
    }

    getData() {
        const className = this.view.getClassName();
        const skip = (this.current - 1) * this.limit;
        const query = {
            count: true,
            limit: this.limit,
            skip: skip,
            where: this.where,
            include: ['all'],
            sort: {createdAt: -1}
        };
        this.setProgress(true);
        return this.findObjectUseCase.execute(className, query)
            .then(({count, objects}) => {
                this.documents = this.documents.concat(objects);
                this.view.setMore(count > this.documents.length);
                this.view.setObjects(this.documents);
                this.setProgress(false);
            })
            .catch(error => {
                this.setProgress(false);
                this.view.showError(error);
            });
    }

    setProgress(progress) {
        this.progress = progress;
        if (progress) {
            this.view.showProgress();
        } else {
            this.view.hideProgress();
        }
    }

    componentDidUpdate(prevProps) {
        const prevClassName = prevProps.params.name;
        const newClassName = this.view.getClassName();
        //if className change
        if (prevClassName !== newClassName) {
            this.init();
            this.view.setObjects([]);
            this.getData();
        }
    }

    onItemClick(index) {
        const document = this.documents[index];
        const className = this.view.getClassName();
        this.view.navigateToForm(className, document.id);
    }

    onSelect(index) {
        const selectedObjects = this.view.getSelected();
        const selected = this.documents[index];
        const i = selectedObjects.indexOf(selected);
        if (i > -1) {
            selectedObjects.splice(i, 1);
        } else {
            selectedObjects.push(selected);
        }
        this.view.setSelected(selectedObjects);
    }

    searchSubmit(where) {
        this.init();
        this.where = where;
        this.getData();
    }

    loadMore() {
        if (!this.progress) {
            this.current++;
            this.getData();
        }
    }

    updateSchema(schema) {
        this.updateSchemaUseCase.execute(schema)
            .then(() => {

            })
            .catch(error => {
                this.view.showError(error.message);
            })
    }

    onSelectAll(checked) {
        if (checked) {
            this.view.setSelected([...this.documents]);
        } else {
            this.view.setSelected([]);
        }
    }

    exportClick() {
        const objects = this.view.getSelected();
        const className = this.view.getClassName();
        this.exportCSVUseCase.execute(objects, className)
            .then(() => {
                //hide progress
            });
    }

    addFieldSubmit(field) {
        const className = this.view.getClassName();
        const schemas = this.view.getSchemas();
        const index = schemas.findIndex(s => s.name === className);
        const {name, ...options} = field;
        schemas[index]['fields'][name] = options;
        this.updateSchemaUseCase.execute(schemas[index])
            .then(() => {
                this.view.setSchemas(schemas);
                this.view.closeDialog();
            })
            .catch(error => {
                this.view.showError(error);
            });
    }

    deleteFieldSubmit(field) {
        const className = this.view.getClassName();
        const schema = this.view.getSchema(className);
        delete schema['fields'][field];
        this.updateSchemaUseCase.execute(schema)
            .then(() => {
                this.view.forceUpdate();
                this.view.closeDialog();
            })
            .catch(error => {
                this.view.showError(error);
            });
    }

    addClassSubmit(schema) {
        this.view.closeDialog();
        this.addSchemaUseCase.execute(schema)
            .then(schema => {
                const schemas = this.view.getSchemas();
                schemas.push(schema);
                this.view.setSchemas(schemas);
                this.view.navigateTo("/class/" + schema.name);
            })
            .catch(error => {
                this.view.showError(error);
            });
    }

    editClassSubmit(schema) {
        this.view.closeDialog();
        this.updateSchemaUseCase.execute(schema)
            .then(schema => {
                const schemas = this.view.getSchemas();
                this.view.setSchemas(schemas);
            })
            .catch(error => {
                this.view.showError(error);
            });
    }

    deleteClassSubmit(className) {
        if (className !== this.view.getClassName()) {
            this.view.closeDialog();
            this.view.showError('Please enter correct Class name');
            return;
        }
        this.deleteSchemaUseCase.execute(className)
            .then(() => {
                this.view.closeDialog();
                const schemas = this.view.getSchemas();
                const index = schemas.findIndex(s => s.className === className);
                schemas.splice(index, 1);
                this.view.setSchemas(schemas);
                this.view.navigateToClass(schemas[0].className);
            })
            .catch(error => {
                this.view.closeDialog();
                this.view.showError(error);
            });
    }

    addClick() {
        this.view.navigateToForm(this.view.getClassName());
    }

    deleteSelected() {
        const selected = this.view.getSelected();
        const collection = this.view.getClassName();
        const promises = selected.map(o => this.deleteObjectUseCase.execute(collection, o.id));
        Promise.all(promises)
            .then(() => {
                this.documents = this.documents.filter(o => !selected.includes(o));
                this.view.setObjects(this.documents);
            })
            .catch((error) => {
                this.view.hideProgress();
                this.view.showError(error);
            });
    }

    accessSubmit(acl) {
        const selected = this.view.getSelected();
        const collection = this.view.getClassName();
        const promises = selected.map(o => {
            o.acl = acl;
            return this.updateObjectUseCase.execute(collection, o)
        });
        Promise.all(promises)
            .then(() => {
                this.view.closeDialog();
            })
            .catch(error => {
                this.view.closeDialog();
                this.view.showError(error);
            });
    }
}

export default TablePagePresenter;
