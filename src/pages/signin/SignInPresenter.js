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
            const masterKey = this.view.getMasterKey();
            const user = {
                ...this.change,
                masterKey
            };

            this.view.showProgress();

            const signedInUser = await this.signInUseCase.execute(user);

            this.view.navigateTo('/');
        } catch (error) {
            this.view.hideProgress();
            this.view.showError(error);
        }
    }

}

export default SignInPresenter;
