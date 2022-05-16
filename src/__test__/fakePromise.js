export default {
    then: function (callback) {
        callback();
        return {
            catch: function () {

            }
        }
    }
}
