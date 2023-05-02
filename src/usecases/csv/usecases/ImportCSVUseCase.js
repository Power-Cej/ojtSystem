import Papa from 'papaparse';
import jsonToObject from "../jsonToObject";
import UpdateObjectUseCase from "../../object/UpdateObjectUseCase";

class ImportCSVUseCase {

    fileToJson(files) {
        return new Promise(resolve => {
            for (const file of files) {
                Papa.parse(file, {
                    header: true,
                    complete: resolve
                });
            }
        });
    }

    getObjects(fields, objects) {
        return objects.map(o => jsonToObject(o, fields));
    }

    async saveObjects(collection, objects) {
        const update = new UpdateObjectUseCase();
        for (const object of objects) {
            try {
                const options = {upsert: true};
                await update.execute(collection, object,options);
            } catch (error) {
                // ignore error
            }
        }
    }

    execute(files, schema) {
        return Promise.resolve()
            .then(() => this.fileToJson(files))
            .then((result) => this.getObjects(schema.fields, result.data))
            .then(objects => this.saveObjects(schema.collection, objects));
    }
}

export default ImportCSVUseCase