import objectToOption from "./objectToOption";


function GetOption(collection, word, indexes, find, where, callback, keys, sort, includes) {
    const query = {
        limit: 100,
        where: {...where},
        keys: [...keys, ...indexes],
        includes: includes
    };// don't mutate where
    if (sort) query.sort = sort;
    if (word && indexes.length > 0) {
        query.where['$or'] = indexes.map(index => {
            const or = {};
            or[index] = {'$regex': word, '$options': 'i'};
            return or;
        });
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
        find.execute(collection, query)
            .then((objects) => {
                let options = objects.map(obj => objectToOption(obj, indexes));
                if (!sort) {
                    // Only perform manual sort if sort parameter is not defined
                    options = options.sort((a, b) => {
                        if (a.label < b.label) {
                            return -1;
                        }
                        if (a.label > b.label) {
                            return 1;
                        }
                        return 0;
                    });
                }
                callback(options);
            });
    }, 500);
}

export default GetOption;
