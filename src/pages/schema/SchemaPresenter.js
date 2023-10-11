import saveAs from "../../saveAs";

class SchemaPresenter {
    constructor(view, addSchemaUseCase) {
        this.view = view;
        this.addSchemaUseCase = addSchemaUseCase;
    }

    export() {
        this.view.showProgress();
        const schemas = this.view.getSchemas();
        const blob = new Blob([JSON.stringify(schemas, null, 2)], {type: 'application/json'});
        const date = new Date();
        const day = date.toISOString().slice(0, 10);
        const time = date.toLocaleTimeString('en-GB').replaceAll(':', '');
        saveAs(blob, `${day}-${time}.json`);
        this.view.hideProgress();
    }

    import(file) {
        this.view.showProgress();
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target.result);
                this.saveSchema(json);
            } catch (error) {
                console.error("Error parsing the JSON file:", error);
                alert("An error occurred while reading the JSON file.");
            }
        };
        reader.readAsText(file);
    }
    async saveSchema(schemas) {
        const size = 20;
        let i = 0;
        while (i < schemas.length) {
            const batch = schemas.slice(i, i + size);
            // Process each batch
            await Promise.all(batch.map(async (schema, index) => {
                try {
                    await this.saveSchema.execute(schema);
                    // Update the total count in the view
                    // this.view.setTotal(i + index + 1);
                } catch (error) {
                    // Log and ignore errors
                    console.log(schema);
                    console.log(error);
                }
            }));
            // Move to the next batch
            i += size;
        }
    }
}

export default SchemaPresenter;
