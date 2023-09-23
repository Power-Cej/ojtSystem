class BaseListPresenter {
    constructor(view, findObjectUseCase, countObjectUseCase, deleteObjectUseCase) {
        this.view = view;
        this.findObjectUseCase = findObjectUseCase;
        this.countObjectUseCase = countObjectUseCase;
        this.deleteObjectUseCase = deleteObjectUseCase;
    }

    componentDidMount() {
        this.init();
        return this.getObjects();
    }

    init() {
        this.limit = 10;
        this.where = {};
        this.search = {};
        this.filter = {};
        this.include = ['all'];
        this.sort = {createdAt: -1};
        this.reset();
    }

    reset() {
        this.objects = [];
        this.view.setObjects([]);
        this.view.setSelected([]);
        this.count = 0;
        this.current = 1;
    }

    async getObjects() {
        console.log('this.current', this.current);
        const collection = this.view.getCollectionName();
        const skip = (this.current - 1) * this.limit;
        const query = {
            limit: this.limit,
            skip: skip,
            where: {...this.where, ...this.search, ...this.filter},
            include: this.include,
            sort: this.sort // it has bug it duplicate if no createdAt in the data
        };
        this.view.showProgress();
        this.findObjectUseCase.abort();
        try {
            // cache count
            if (this.count === 0) {
                const {count} = await this.countObjectUseCase.execute(collection, {where: query.where});
                this.count = count;
            }
            const objects = await this.findObjectUseCase.execute(collection, query);
            this.objects = this.objects.concat(objects);
            this.view.setTotal(this.objects.length);
            this.view.setCount(this.count);
            this.view.setObjects(this.objects);
            this.view.hideProgress();
        } catch (error) {
            this.view.hideProgress();
            this.view.showError(error);
        }
    }

    onSelect(index) {
        const selectedObjects = this.view.getSelected();
        const selected = this.objects[index];
        const i = selectedObjects.indexOf(selected);
        if (i > -1) {
            selectedObjects.splice(i, 1);
        } else {
            selectedObjects.push(selected);
        }
        this.view.setSelected(selectedObjects);
    }

    searchSubmit(search) {
        this.reset();
        this.search = search;
        this.getObjects();
    }

    filterSubmit(where) {
        this.reset();
        this.filter = where;
        this.getObjects();
    }

    loadMore() {
        this.current++;
        this.getObjects();
    }

    onSelectAll(checked) {
        if (checked) {
            this.view.setSelected([...this.objects]);
        } else {
            this.view.setSelected([]);
        }
    }

    onClickItem(index) {
        const object = this.objects[index];
        const collection = this.view.getCollectionName();
        this.view.navigateTo("/collection/" + collection + "/form/" + object.id);
    }

    onClickAdd() {
        const collection = this.view.getCollectionName();
        this.view.navigateTo("/collection/" + collection + "/form");
    }

    async onClickDeleteSelected() {
        const selected = this.view.getSelected();
        const collection = this.view.getCollectionName();
        try {
            await this.view.showDialog({title: 'Delete Data?', message: 'Are you sure you want to delete?'});
            for (const obj of selected) {
                await this.deleteObjectUseCase.execute(collection, obj.id);
                const index = this.objects.indexOf(obj);
                this.objects.splice(index, 1);
                this.view.setObjects(this.objects);
            }
            this.view.setSelected([]);
        } catch (error) {
            this.view.hideProgress();
            this.view.showError(error);
        }
    }
}

export default BaseListPresenter;