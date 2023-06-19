import BaseFormPresenter from "../../base/BaseFormPresenter";

class CollectionFormPresenter extends BaseFormPresenter {
    constructor(view, getObjectUseCase, upsertUseCase) {
        super(view, getObjectUseCase, upsertUseCase);
    }
}

export default CollectionFormPresenter;
