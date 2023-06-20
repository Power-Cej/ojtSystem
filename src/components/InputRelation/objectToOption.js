function objectToOption(object, indexes) {
    // if no index the id is will be used
    return {
        label: indexes.map((index) => object[index] || object.id).join(' '),
        value: object.id,
        object: object
    };
}

export default objectToOption;
