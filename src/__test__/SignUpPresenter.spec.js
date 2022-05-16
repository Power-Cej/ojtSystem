import SignUpPresenter from '../presenters/SignUpPresenter';
import fakePromise from './fakePromise';

describe('SignUpPresenter', function () {
    let view;
    let presenter;
    let signup;
    beforeEach(() => {
        view = {
            showProgress: jest.fn(),
            hideProgress: jest.fn(),
            showDialog: jest.fn(() => fakePromise),
            navigateTo: jest.fn(),
        }
        signup = {
            execute: jest.fn(() => fakePromise)
        }
        presenter = new SignUpPresenter(view, signup);
    });
    it('should signup', function () {
        const user = {
            email: 'john',
            password: 'pass123$',
            confirmPassword: 'pass123$',
        }
        presenter.submit(user);
        const transform = {username: user.email, email: user.email, password: user.password};
        expect(view.showProgress).toHaveBeenCalled();
        expect(view.hideProgress).toHaveBeenCalled();
        expect(signup.execute).toHaveBeenCalledWith(transform);
    });
});
