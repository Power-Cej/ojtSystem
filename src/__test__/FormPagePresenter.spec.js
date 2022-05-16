import FormPagePresenter from '../presenters/FormPagePresenter';
import fakePromise from "./fakePromise";

describe('FormPagePresenter', function () {
    let view;
    let presenter;
    let save;
    let find;
    let update;
    const id = 'abc';
    beforeEach(() => {
        view = {
            showProgress: jest.fn(),
            hideProgress: jest.fn(),
            showDialog: jest.fn(() => fakePromise),
            navigateTo: jest.fn(),
            getMasterKey: jest.fn(),
            getClassName: jest.fn(),
            setObject: jest.fn(),
            getObject: jest.fn(),
            showSuccessSnackbar: jest.fn(),
            navigateBack: jest.fn(),
            getObjectId: jest.fn(() => id),
        }
        save = {
            execute: jest.fn(() => fakePromise)
        }
        find = {
            execute: jest.fn(() => {
                return {
                    then: function (callback) {
                        callback([id]);
                        return {
                            catch: function () {

                            }
                        }
                    }
                }
            })
        }
        update = {
            execute: jest.fn(() => fakePromise)
        }
        presenter = new FormPagePresenter(view, save, find, update);
    });
    it('should init', function () {
        presenter.init();
        expect(view.showProgress).toHaveBeenCalled();
        expect(view.hideProgress).toHaveBeenCalled();
        expect(view.getClassName).toHaveBeenCalled();
        expect(view.getObjectId).toHaveBeenCalled();
        expect(view.setObject).toHaveBeenCalled();
    });
    it('should submit', function () {
        presenter.submit();
        expect(view.showProgress).toHaveBeenCalled();
        expect(view.hideProgress).toHaveBeenCalled();
        expect(view.getClassName).toHaveBeenCalled();
        expect(view.showSuccessSnackbar).toHaveBeenCalled();
        expect(view.navigateBack).toHaveBeenCalled();
        expect(save.execute).toHaveBeenCalled();
    });
});
