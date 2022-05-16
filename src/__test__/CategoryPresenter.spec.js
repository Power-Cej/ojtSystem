import CategoryPresenter from '../presenters/CategoryPresenter';


describe('CategoryPresenter', function () {
    let view;
    let find;
    let presenter;
    const id = 'abc';
    beforeEach(() => {
        view = {
            setCount: jest.fn()
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
        presenter = new CategoryPresenter(view, find);
    });
    it('should init', function () {

    });
});
