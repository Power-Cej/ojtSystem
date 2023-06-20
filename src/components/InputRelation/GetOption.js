import objectToOption from "./objectToOption";

function GetOption(collection, indexes, word, callback, find, where) {
    this.query = {count: true, limit: 100, where: where};
    if (word && indexes.length > 0) {
        this.query.where['$or'] = indexes.map(index => {
            const or = {};
            or[index] = {'$regex': word, '$options': 'i'};
            return or;
        });
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
        find.execute(collection, this.query)
            .then(({objects}) => {
                // sort the result
                callback(objects.map(obj => objectToOption(obj, indexes))
                    .sort((a, b) => {
                        if (a.label < b.label) {
                            return -1;
                        }
                        if (a.label > b.label) {
                            return 1;
                        }
                        return 0;
                    }));
            });
    }, 300);
}

export default GetOption;
