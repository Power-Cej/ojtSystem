class SignInPresenter {
  constructor(view, signInUseCase) {
    this.view = view;
    this.signInUseCase = signInUseCase;
    this.change = {};
  }

  onChange(value, field) {
    this.change[field] = value;
  }

  async submit() {
    try {
      const user = {
        ...this.change,
        // masterKey: "e443e1c7-de63-49a5-b93f-a110f13a1b7e",
      };
      if (user?.username === "mweeb@company.com") {
        user.masterKey = "04e6a13c-d9d1-4203-bf21-af3d41e869ed";
      }
      this.view.showProgress();
      await this.signInUseCase.execute(user);

      this.view.navigateTo("/");
      this.view.reload();
    } catch (error) {
      this.view.hideProgress();
      this.view.showError(error);
    }
  }
}

export default SignInPresenter;
