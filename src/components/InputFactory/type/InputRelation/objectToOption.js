function objectToOption(object, indexes) {
    return {
        label: indexes.map((index) => object[index]).join(' '),
        value: object.id,
        object,
    };
}

export default objectToOption;
