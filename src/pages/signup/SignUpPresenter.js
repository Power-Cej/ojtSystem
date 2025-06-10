import { upsertUseCase } from "../../usecases/object";

class SignUpPresenter {
  constructor(view, signUpUseCase, updateObjectUseCase) {
    this.view = view;
    this.signUpUseCase = signUpUseCase;
    this.updateObjectUseCase = updateObjectUseCase;
    this.change = {};
  }

  onChange(value, field) {
    this.change[field] = value;
  }

  submit() {
    const { email, password, confirmPassword, ...others } = this.change;

    if (password !== confirmPassword) {
      this.view.showError("password must be the same");
      return;
    }
    const user = {
      username: email,
      email,
      password,
      ...others,
    };
    // console.log("user: ", user);
    // return;
    this.view.showProgress();
    console.log("user: ", user);
    Promise.resolve()
      .then(() => upsertUseCase().execute("users", user))
      .then(() => {
        this.view.hideProgress();
        this.view
          .showSuccess(
            "Congratulations, your account has been successfully created."
          )
          .then(() => {
            this.view.navigateTo("/");
          });
      })
      .catch((error) => {
        this.view.hideProgress();
        this.view.showError(error);
      });
  }
}

export default SignUpPresenter;
