import BaseFormPresenter from "../../base/BaseFormPresenter";

class CollectionFormPresenter extends BaseFormPresenter {
  onChangeObject(object) {
    this.change = object;
    this.object = object;
  }

  async save() {
    const collection = this.view.getCollectionName();
    if (collection === "users") {
      this.change.updateBio = "update";
    }
    if (this.object.id) {
      this.change.id = this.object.id;
    }
    try {
      await this.upsertUseCase.execute(collection, this.change);
      this.change = {};
    } catch (error) {
      throw error; // rethrow the error to be caught by the caller
    }
  }
}

export default CollectionFormPresenter;
