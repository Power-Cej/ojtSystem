import BaseListPage from "../../base/BaseListPage";

class HooksPresenter {
  constructor(view, restUseCase) {
    this.view = view;
    this.restUseCase = restUseCase;
    this.object = [];
  }

  componentDidMount() {
    this.getRequest();
  }

  async getRequest() {
    const method = "GET";
    const path = "/hooks";

    this.view.showProgress();
    try {
      const response = await this.restUseCase.execute(method, path);
      this.object = response;
      this.view.setObject(this.object);
      this.view.hideProgress();
    } catch (error) {
      this.view.hideProgress();
      this.view.showError(error);
    }
  }

  addClick() {
    this.view.navigateToForm();
  }

  async onSubmitAddHooks(obj) {
    const method = "POST";
    const path = "/hooks";
    const headers = {
      "Content-Type": "application/json",
    };

    this.view.showProgress();
    try {
      const response = await this.restUseCase.execute(method, path, {
        body: obj,
        headers: headers,
      });
      this.getRequest();
      this.view.hideProgress();
    } catch (error) {
      this.view.hideProgress();
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      this.view.showError(error);
    }
  }
}

export default HooksPresenter;
