import BasePage from "./BasePage";

class BaseListPage extends BasePage {
    state = {
        objects: [],
        selected: [],
        progress: true,
        total: 0,
        count: 0
    };

    getCollectionName() {
        return this.props.params.name;
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    onClickAdd() {
        this.presenter.onClickAdd();
    }

    onClickDeleteSelected() {
        this.presenter.onClickDeleteSelected();
    }

    getSelected() {
        return this.state.selected;
    }

    setSelected(selected) {
        this.setState({selected});
    }

    setObjects(objects) {
        this.setState({objects});
    }

    getObjects() {
        return this.state.objects;
    }

    loadMore() {
        this.presenter.loadMore();
    }

    searchSubmit(where, merge) {
        this.presenter.searchSubmit(where, merge);
    }
    filterSubmit(where) {
        this.presenter.filterSubmit(where);
    }

    setCount(count) {
        this.setState({count});
    }

    setTotal(total) {
        this.setState({total});
    }

    onSelect(index) {
        this.presenter.onSelect(index);
    }

    onSelectAll(checked) {
        this.presenter.onSelectAll(checked);
    }

    onClickItem(index, field) {
        this.presenter.onClickItem(index, field);
    }
}

export default BaseListPage;