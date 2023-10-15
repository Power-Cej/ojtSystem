import browseFile from "../../browseFile";
import csvToJson from "../../csvToJson";
import unflatten from "../../unflatten";
import jsonToObject from "../../jsonToObject";
import BaseListPresenter from "../../base/BaseListPresenter";
import saveAs from "../../saveAs";

class CollectionListPresenter extends BaseListPresenter {
    constructor(view, findObjectUseCase, countObjectUseCase, deleteObjectUseCase, upsertUseCase, exportCSVUseCase, addSchemaUseCase, updateSchemaUseCase, deleteSchemaUseCase) {
        super(view, findObjectUseCase, countObjectUseCase, deleteObjectUseCase);
        this.upsertUseCase = upsertUseCase;
        this.exportCSVUseCase = exportCSVUseCase;
        this.addSchemaUseCase = addSchemaUseCase;
        this.updateSchemaUseCase = updateSchemaUseCase;
        this.deleteSchemaUseCase = deleteSchemaUseCase;
    }


    componentDidUpdate(prevProps) {
        const prevClassName = prevProps.params.name;
        const newClassName = this.view.getCollectionName();
        //if collection change
        if (prevClassName !== newClassName) {
            this.init();
            this.getObjects();
        }
    }

    onClickImport(file) {
        this.view.showProgress();
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target.result);
                this.saveObjects(json);
            } catch (error) {
                console.error("Error parsing the JSON file:", error);
                alert("An error occurred while reading the JSON file.");
            }
        };
        reader.readAsText(file);
    }
    async saveObjects(objects){
        const collection = this.view.getCollectionName();
        this.view.setCount(objects.length);
        const size = 20;
        let i = 0;
        while (i < objects.length) {
            const batch = objects.slice(i, i + size);
            // Process each batch
            await Promise.all(batch.map(async (object, index) => {
                try {
                    await this.upsertUseCase.execute(collection,object);
                    // Update the total count in the view
                    this.view.setTotal(i + index + 1);
                } catch (error) {
                    // Log and ignore errors
                    console.log(object);
                    console.log(error);
                }
            }));
            // Move to the next batch
            i += size;
        }
        // Hide the progress indicator
        this.view.hideProgress();
        this.init();
        await this.getObjects();
    }
    async onClickExport() {
        this.view.showProgress();
        const collection = this.view.getCollectionName();
        let objects = this.view.getSelected();
        if (objects.length === 0) {
            try {
                const query = {
                    where: {...this.where, ...this.search, ...this.filter},
                    include: this.include
                };
                await this.view.showConfirmDialog('Export all data take longer!', 'Export all data?', 'EXPORT');
                objects = await this.findObjectUseCase.execute(collection, query);
            } catch (e) {
                return;
            }
        }
        const blob = new Blob([JSON.stringify(objects, null, 2)], {type: 'application/json'});
        const date = new Date();
        const day = date.toISOString().slice(0, 10);
        const time = date.toLocaleTimeString('en-GB').replaceAll(':', '');
        saveAs(blob, `${collection}-${day}-${time}.json`);
        this.view.hideProgress();
    }


    onSubmitDeleteField(field) {
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

    onSubmitAddCollection(schema) {
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

    onSubmitEditCollection(schema) {
        this.view.closeDialog();
        this.updateSchemaUseCase.execute(schema)
            .then(schema => {
                const schemas = this.view.getSchemas();
                const index = schemas.findIndex((s) => s.collection === schema.collection);
                schemas[index] = schema;
                this.view.setSchemas(schemas);
            })
            .catch(error => {
                this.view.showError(error);
            });
    }

    onSubmitDeleteCollection(collection) {
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

    onSubmitAccess(acl) {
        const selected = this.view.getSelected();
        const collection = this.view.getCollectionName();
        const promises = selected.map(o => {
            const change = {id: o.id, acl};
            o.acl = acl;// mutate the object
            return this.upsertUseCase.execute(collection, change);
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

export default CollectionListPresenter;
