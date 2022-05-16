import {findObjectUseCase} from "../../../../domain/object/usecases";
import objectToOption from "./objectToOption";
const find = findObjectUseCase();
function GetOption(targetClass, indexes, key, callback) {
    this.query = {count: true, limit: 20, where: {}};
    if (key && indexes.length > 0) {
        this.query.where['$or'] = indexes.map(i => {
            const or = {};
            or[i] = {'$regex': key};
            return or;
        });
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
        find.execute(targetClass, this.query)
            .then(({objects}) => {
                callback(objects.map(obj => objectToOption(obj, indexes)));
            });
    }, 300);
}

export default GetOption;
