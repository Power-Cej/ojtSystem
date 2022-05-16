class VerificationPresenter {
    constructor(view, emailVerifyUseCase, updateObjectUseCase, signOutUseCase) {
        this.view = view;
        this.emailVerifyUseCase = emailVerifyUseCase;
        this.updateObjectUseCase = updateObjectUseCase;
        this.signOutUseCase = signOutUseCase;
    }

    componentDidMount() {
        this.send();
    }

    send() {
        this.view.disableResend();
        this.emailVerifyUseCase.execute()
            .then(() => {

            })
            .catch(error => {
                this.view.showError(error);
            });
    }

    resend() {
        this.send();
    }

    confirm(code) {
        const update = {
            verified: true,
        }
        const query = {
            where: {code}
        }
        this.view.showProgress();
        this.updateObjectUseCase.execute('verifications', update, query)
            .then(verification => {
                this.view.hideProgress();
                const title = "Verification Success";
                const message = "Your email address has been verified.";
                this.view.showSuccess(message, title)
                    .then(() => {
                        this.view.navigateTo('/');
                    });
            })
            .catch(error => {
                this.view.hideProgress();
                if (error.code === 101) {
                    this.view.showError('invalid code');
                } else {
                    this.view.showError(error);
                }
            });
    }

    back() {
        this.signOutUseCase.execute()
            .then(() => {
                this.view.navigateTo('/signup', {transition: 'slide-left'});
            });
    }
}

export default VerificationPresenter;
