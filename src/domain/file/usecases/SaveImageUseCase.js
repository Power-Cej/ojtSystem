import imageResize from "../../../imageResize";
import blobToDataUrl from "../../../blobToDataUrl";
import urlToImage from "../../../urlToImage";
import canvasToBlob from "../../../canvasToBlob";

class SaveImageUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    execute(file, maxWidth = 800, maxHeight = 800) {
        return Promise.resolve()
            .then(() => blobToDataUrl(file))
            .then(url => urlToImage(url))
            .then(image => imageResize(image, maxWidth, maxHeight))
            .then(canvas => canvasToBlob(canvas, file.name, file.type))
            .then((file) => this.repository.saveFile(file));
    }
}

export default SaveImageUseCase;
