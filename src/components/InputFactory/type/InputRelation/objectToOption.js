function objectToOption(object, indexes) {
    return {
        label: indexes.map((index) => object[index]).join(' '),
        value: object.id,
        id: object.id
    };
}

export default objectToOption;
