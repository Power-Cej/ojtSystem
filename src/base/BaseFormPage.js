import BasePage from "./BasePage";

class BaseFormPage extends BasePage {
    componentDidMount() {
        this.presenter.componentDidMount();
    }

    getCollectionName() {
        return this.props.params.name;
    }

    getObjectId() {
        return this.props.params.id;
    }

    formSubmit(e) {
        e.preventDefault();
        this.presenter.submit();
    }

    getObject() {
        return this.state.object;
    }

    backCLick() {
        this.presenter.backClick();
    }


    setObject(object) {
        this.setState({object});
    }

    onChange(field, data) {
        console.log(field,data);
        this.presenter.onChange(field, data);
    }


}

export default BaseFormPage;
