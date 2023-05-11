import browseFile from "../../browseFile";
import csvToJson from "../../csvToJson";
import unflatten from "../../unflatten";
import jsonToObject from "../../jsonToObject";

class TablePagePresenter {
    constructor(view, findObjectUseCase, updateObjectUseCase, deleteObjectUseCase, addSchemaUseCase, updateSchemaUseCase, exportCSVUseCase, deleteSchemaUseCase, upsertUseCase) {
        this.view = view;
        this.findObjectUseCase = findObjectUseCase;
        this.updateObjectUseCase = updateObjectUseCase;
        this.deleteObjectUseCase = deleteObjectUseCase;
        this.addSchemaUseCase = addSchemaUseCase;
        this.updateSchemaUseCase = updateSchemaUseCase;
        this.exportCSVUseCase = exportCSVUseCase;
        this.deleteSchemaUseCase = deleteSchemaUseCase;
        this.upsertUseCase = upsertUseCase;
    }

    componentDidMount() {
        this.init();
        this.getObjects();
    }

    init() {
        this.limit = 10;
        this.current = 1;
        this.where = {};
        this.objects = [];
        this.view.setObjects([]);
    }

    getObjects() {
        const collection = this.view.getCollectionName();
        const skip = (this.current - 1) * this.limit;
        const query = {
            count: true,
            limit: this.limit,
            skip: skip,
            where: this.where,
            include: ['all'],
            sort: {createdAt: -1}
        };
        this.view.showProgress();
        return this.findObjectUseCase.execute(collection, query)
            .then(({count, objects}) => {
                this.objects = this.objects.concat(objects);
                this.view.setCount(count);
                this.view.setObjects(this.objects);
                this.view.hideProgress();
            })
            .catch(error => {
                this.view.hideProgress();
                this.view.showError(error);
            });
    }

    componentDidUpdate(prevProps) {
        const prevClassName = prevProps.params.name;
        const newClassName = this.view.getCollectionName();
        //if collection change
        if (prevClassName !== newClassName) {
            this.init();
            this.view.setObjects([]);
            this.getObjects();
        }
    }

    onClickItem(index) {
        const document = this.objects[index];
        const collection = this.view.getCollectionName();
        this.view.navigateToForm(collection, document.id);
    }

    onSelect(index) {
        const selectedObjects = this.view.getSelected();
        const selected = this.objects[index];
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
        this.getObjects();
    }

    loadMore() {
        this.current++;
        this.getObjects();
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
            this.view.setSelected([...this.objects]);
        } else {
            this.view.setSelected([]);
        }
    }

    importClick() {
        const schema = this.view.getSchema(this.view.getCollectionName());
        browseFile('text/csv')
            .then(files => csvToJson(files[0]))
            .then(objects => unflatten(objects))
            .then(objects => objects.map(o => jsonToObject(o, schema.fields)))
            .then(async objects => {
                for (const obj of objects) {
                    const object = await this.upsertUseCase.execute(schema.collection, obj);
                    this.objects.push(object);
                    this.view.setObjects(this.objects);
                }
            })
            .catch(error => {
                this.view.hideProgress();
                this.view.showError(error);
            });
    }

    exportClick() {
        const objects = this.view.getSelected();
        const collection = this.view.getCollectionName();
        this.exportCSVUseCase.execute(objects, collection)
            .then(() => {
                //hide progress
            });
    }

    addFieldSubmit(field) {
        const collection = this.view.getCollectionName();
        const schemas = this.view.getSchemas();
        const index = schemas.findIndex(s => s.collection === collection);
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
        const collection = this.view.getCollectionName();
        const schema = this.view.getSchema(collection);
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
                this.view.navigateTo("/collection/" + schema.collection);
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

    deleteClassSubmit(collection) {
        if (collection !== this.view.getCollectionName()) {
            this.view.closeDialog();
            this.view.showError('Please enter correct Class name');
            return;
        }
        this.deleteSchemaUseCase.execute(collection)
            .then(() => {
                this.view.closeDialog();
                const schemas = this.view.getSchemas();
                const index = schemas.findIndex(s => s.collection === collection);
                schemas.splice(index, 1);
                this.view.setSchemas(schemas);
                this.view.navigateTo('/collection/' + schemas[0].collection);
            })
            .catch(error => {
                this.view.closeDialog();
                this.view.showError(error);
            });
    }

    addClick() {
        this.view.navigateToForm(this.view.getCollectionName());
    }

    deleteSelected() {
        const selected = this.view.getSelected();
        const collection = this.view.getCollectionName();
        this.view.showDialog({title: 'Delete Data?', message: 'Are you sure you want to delete?'})
            .then(async () => {
                for (const obj of selected) {
                    await this.deleteObjectUseCase.execute(collection, obj.id);
                    const index = this.objects.indexOf(obj);
                    this.objects.splice(index, 1);
                    this.view.setObjects(this.objects);
                }
            })
            .catch(error => {
                this.view.hideProgress();
                this.view.showError(error);
            });
    }

    accessSubmit(acl) {
        const selected = this.view.getSelected();
        const collection = this.view.getCollectionName();
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
