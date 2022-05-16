/**
 * resolve when one of the promise reject if all promise is reject
 * @param promises
 * @returns {Promise<unknown>}
 */
function promiseAny(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((p) => p.then(resolve));
        promises.reduce((a, b) => a.catch(() => b)).catch(() => reject(Error('All failed')));
    });
}

export default promiseAny;
