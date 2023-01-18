import click from './click';
import resolvingPromise from './resolvingPromise';

function browseFile(accept) {
    const promise = resolvingPromise();
    const input = document.createElement('input');
    input.type = "file";
    input.accept = accept;
    input.onchange = function (e) {
        const files = e.target.files;
        promise.resolve(files);
    }
    setTimeout(function () {
        click(input);
    }, 0);
    return promise;
}

export default browseFile;
