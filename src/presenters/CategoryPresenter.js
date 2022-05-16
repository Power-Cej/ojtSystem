class CategoryPresenter {
    constructor(view, findObjectUseCase) {
        this.view = view;
        this.findObjectUseCase = findObjectUseCase;
        this.limit = 10;
        this.current = 1;
        this.objects = [];
        this.where = {};
    }

    componentDidMount() {
        this.getData();
    }

    find() {
        const className = this.view.getClassName();
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
        this.view.showProgress();
        return this.find()
            .then(({count, objects}) => {
                if (count > 0) {
                    this.view.setCount(count);
                    this.view.setObjects(this.view.getObjects().concat(objects));
                }
                this.view.hideProgress();
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
        this.init();
    }

    loadMore() {
        console.log('loadMore');
        this.current++;
        this.getData();
    }


}

export default CategoryPresenter;
