const PAPA from 'papaparse';


function flatten(object, prefix = [], current = {}, result = []) {
    if (Array.isArray(object)) {
        object.forEach(item => {
            result.push({...flatten(item, prefix, current)})
        })
        console.log(result);
    } else if (typeof object === 'object') {
        Object.keys(object).forEach(key => {
            flatten(object[key], prefix.concat(key), current, result)
        })
    } else {
        current[prefix.join('_')] = object;
    }
    return current
}

function flatObject(object, prefix = []) {
    return Object.entries(object)
        .reduce((acc, [key, value]) => {
            acc[0] = acc[0] || {};
            if (Array.isArray(value)) {
                value.map((item, index) => {
                    acc[index] = {...acc[0], ...flatObject(item, prefix.concat(key))[0]}
                });
                return acc;
            }
            if (typeof value === 'object') {
                acc[0] = {...acc[0], ...flatObject(value, prefix.concat(key))[0]}
                return acc;
            }
            acc[0][prefix.concat(key).join('_')] = value;
            return acc;
        }, []);
}

function jsonToCsv(object) {
    return flatObject(object);
}

export default jsonToCsv;
