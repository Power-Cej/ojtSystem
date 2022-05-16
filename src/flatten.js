function flatArray(objects, values, prefix) {
    return objects.reduce((acc, cur) => {
        values.forEach(item => {
            const objects = flatten(item, prefix);
            objects.forEach(obj => {
                acc.push({...cur, ...obj});
            });
        });
        return acc;
    }, []);
}
function flatten(object, prefix = []) {
    return Object.entries(object)
        .reduce((acc, [key, value]) => {
            acc[0] = acc[0] || {};
            if (Array.isArray(value)) {
                return flatArray(acc, value, prefix.concat(key));
            }
            if (typeof value === 'object') {
                acc[0] = {...acc[0], ...flatten(value, prefix.concat(key))[0]}
                return acc;
            }
            acc[0][prefix.concat(key).join('_')] = value;
            return acc;
        }, []);
}

export default flatten;
