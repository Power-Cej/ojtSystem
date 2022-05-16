class ForgotPresenter {

    constructor(view, resetPasswordUseCase) {
        this.view = view;
        this.resetPasswordUseCase = resetPasswordUseCase;
    }

    componentDidMount() {

    }

    submit(user) {
        this.view.showProgress();
        this.resetPasswordUseCase.execute(user)
            .then(() => {
                this.view.hideProgress();
                return this.view.showSuccess('An email message has been sent containing a link to reset password.');
            })
            .then(() => this.view.navigateTo('/signin',{transition: 'slide-right'}))
            .catch(error => {
                this.view.hideProgress();
                this.view.showError(error);
            });
    }
}

export default ForgotPresenter;
