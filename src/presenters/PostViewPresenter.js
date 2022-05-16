import changes from '../changes';

class PostViewPresenter {
    constructor(view, findPostUseCase, deletePostUseCase) {
        this.view = view;
        this.findPostUseCase = findPostUseCase;
        this.deletePostUseCase = deletePostUseCase;
        this.object = {};
    }

    componentDidMount() {
        this.getPost();
    }

    getPost() {
        const className = this.view.getClassName();
        const id = this.view.getPostId();
        const query = {include: ['all'], where: {id}};
        if (id) {
            this.view.showProgress();
            this.findPostUseCase
                .execute(className, query)
                .then(([object]) => {
                    this.view.hideProgress();
                    object && this.view.setPost(object);
                })
                .catch(error => {
                    this.view.hideProgress();
                    this.view.showError(error);
                });
        }
    }

    formSubmit() {
        const className = this.view.getClassName();
        const object = this.view.getObject();
        const newObject = changes(this.object, object);
        newObject.id = this.object.id;
        this.view.showProgress();
        Promise.resolve()
            .then(() => {
                if (object.id) {
                    return this.updateObjectUseCase.execute(className, newObject);
                }
                return this.saveObjectUseCase.execute(className, newObject);
            })
            .then(() => {
                this.view.hideProgress();
                this.view.showSuccessSnackbar("Successfully saved!");
                this.view.navigateBack();
            })
            .catch(error => {
                this.view.hideProgress();
                this.view.showError(error);
            });
    }

    backClick() {
        //check if object is unsave
        this.view.navigateBack();
    }


    editClick() {
        const id = this.view.getPostId();
        this.view.navigateTo('/posts/form', {id});
    }

    deletePostClick() {
        const id = this.view.getPostId();
        const object = {id};
        object.acl = {read: []};
        this.deletePostUseCase.execute('posts', object)
            .then(() => {
                this.view.showSuccessSnackbar('post successfully deleted');
                this.view.navigateBack();
            })
            .catch(error => {
                this.view.showError(error);
            });
    }
}

export default PostViewPresenter;
