import MainPagePresenter from '../presenters/MainPagePresenter';

describe('MainPagePresenter', function () {
    let view;
    let presenter;
    let getSchema;
    let getUser;
    const user = {username: 'john', password: 'pass123$'};
    beforeEach(() => {
        view = {
            showProgress: jest.fn(),
            hideProgress: jest.fn(),
        };
        getSchema = {
            execute: jest.fn(() => Promise.resolve())
        };
        getUser = {
            execute: jest.fn(() => Promise.resolve(user))
        };
        presenter = new MainPagePresenter(view, getSchema, getUser);
    });
    it('componentDidMount', function () {
        presenter.componentDidMount();
        expect(view.showProgress).toHaveBeenCalled();
        // expect(view.hideProgress).toHaveBeenCalled();
    });
});
