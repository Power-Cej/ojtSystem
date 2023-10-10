import BaseFormPresenter from "../../base/BaseFormPresenter";

class CollectionFormPresenter extends BaseFormPresenter {

    onChangeObject(object) {
        this.change = object;
        this.object = object;
    }
}

export default CollectionFormPresenter;
