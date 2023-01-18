function getSchemaByClass(schemas, name) {
    if (schemas) {
        return schemas.find(s => s.name === name);
    }
}

export default getSchemaByClass;
