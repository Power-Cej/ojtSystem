class ResetPresenter {

    constructor(view, findSessionUseCase, updateUserUseCase) {
        this.view = view;
        this.findSessionUseCase = findSessionUseCase;
        this.updateUserUseCase = updateUserUseCase;

    }

    componentDidMount() {
        const token = this.view.getToken();
        if (token) {
            this.getSession(token);
        } else {
            this.view.navigateTo('/');
        }
    }

    submit({password, confirmPassword}) {
        if (password !== confirmPassword) {
            this.view.showError('password must be the same');
            return;
        }
        const user = {
            password,
        }
        const token = this.view.getToken();
        const query = {where: {id: this.session.user.id}};
        this.view.showProgress();
        this.updateUserUseCase.execute('users', user, query, token)
            .then(() => {
                this.view.hideProgress();
                this.view.showSuccess('You can now use your new password to log in to your new account.', 'Password changed')
                    .then(() => this.view.navigateTo('/signin', {transition: 'slide-right'}));
            })
            .catch(error => {
                this.view.hideProgress();
                this.view.showError(error);
            });
    }

    getSession(token) {
        const query = {where: {token}};
        this.findSessionUseCase.execute('sessions', query, token)
            .then(([object]) => {
                this.session = object;
            })
            .catch(error => {
                this.view.showError(error);
            });
    }
}

export default ResetPresenter;
