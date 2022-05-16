class SignInPresenter {
    constructor(view, signInUseCase) {
        this.view = view;
        this.signInUseCase = signInUseCase;
    }

    submit({email, password}) {
        const masterKey = this.view.getMasterKey();
        const user = {
            email,
            password,
            masterKey
        }
        this.view.showProgress();
        Promise.resolve()
            .then(() => this.signInUseCase.execute(user))
            .then((user) => {
                if(user.emailVerified){
                    this.view.navigateTo('/');
                }else{
                    this.view.navigateTo('/verify', {transition:'slide-left',...user});
                }
            })
            .catch(error => {
                this.view.hideProgress();
                this.view.showError(error);
            });
    }
}

export default SignInPresenter;
