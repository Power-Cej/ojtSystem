class PostsPresenter {
    constructor(view, findObjectUseCase) {
        this.view = view;
        this.findObjectUseCase = findObjectUseCase;
        this.limit = 10;
        this.current = 1;
        this.objects = [];
        this.where = {};
        this.type = "TUTORIAL";
    }

    componentDidMount() {
        this.getData();
    }

    find() {
        const className = 'posts';
        const skip = (this.current - 1) * this.limit;
        const query = {
            count: true,
            limit: this.limit,
            skip,
            where: this.where,
            include: ['all'],
            sort: {createdAt: -1}
        };
        return this.findObjectUseCase.execute(className, query);
    }

    getData() {
        const query = this.view.getQuery();
        this.where['category'] = {id: query.categories};
        this.where['type'] = this.type;
        this.view.showProgress();
        return this.find()
            .then(({count, objects}) => {
                this.view.hideProgress();
                if (count > 0) {
                    this.view.setCount(count);
                    this.view.setObjects(this.view.getObjects().concat(objects));
                }
            })
            .catch(error => {
                this.view.hideProgress();
                this.view.showError(error);
            });
    }


    onItemClick(index) {
        const objects = this.view.getObjects();
        const object = objects[index];
        const className = this.view.getClassName();
        this.view.navigateToForm(className, object.id);
    }

    searchSubmit(where) {
        this.where = where;
    }

    loadMore() {
        this.current++;
        this.getData();
    }

    addClick() {
        const query = this.view.getQuery();
        const params = {category: query.categories, type: this.type}
        this.view.navigateTo('/posts/form', params);
    }

    questionClick() {
        this.init();
        this.type = 'QUESTION';
        this.getData();
    }

    tutorialClick() {
        this.init();
        this.type = 'TUTORIAL';
        this.getData();
    }

    init() {
        this.current = 1;
        this.view.setObjects([]);
    }

}

export default PostsPresenter;
