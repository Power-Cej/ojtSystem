function filterFields(fields, key) {
    return Object.entries(fields)
        .reduce((acc, [field, options]) => {
            if (options[key]) acc.push(field);
            return acc;
        }, []);
}

export default filterFields;
