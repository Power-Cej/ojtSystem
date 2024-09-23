import BasePage from "./BasePage";

class BaseFormPage extends BasePage {
    state = {
        object: {},
        advanced: false
    };
    componentDidMount() {
        this.presenter.componentDidMount();
    }

    getCollectionName() {
        return this.props.params.name;
    }

    getObjectId() {
        return this.props.params && this.props.params.id;
    }

    onSubmitForm(e) {
        e.preventDefault();
        this.presenter.submit();
    }

    onClickBack() {
        this.presenter.onClickBack();
    }

    setObject(object) {
        this.setState({object});
    }

    onChange(value, field) {
        this.presenter.onChange(value, field);
    }
}

export default BaseFormPage;
