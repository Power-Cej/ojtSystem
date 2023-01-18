import fakePromise from "./fakePromise";
import SignInPresenter from "../presenters/SignInPresenter";

describe('SignInPresenter', function () {
    let view;
    let presenter;
    let signIn;
    beforeEach(() => {
        view = {
            showProgress: jest.fn(),
            hideProgress: jest.fn(),
            showDialog: jest.fn(() => fakePromise),
            navigateTo: jest.fn(),
            getMasterKey: jest.fn(),
        }
        signIn = {
            execute: jest.fn(() => fakePromise)
        }
        presenter = new SignInPresenter(view, signIn);
    });
    it('should sign in', function () {
        const user = {email: 'john', password: 'pass123$'};
        presenter.submit(user);
        expect(view.showProgress).toHaveBeenCalled();
        expect(view.hideProgress).toHaveBeenCalled();
        expect(view.navigateTo).toHaveBeenCalled();
        expect(signIn.execute).toHaveBeenCalledWith(user);
    });
});
