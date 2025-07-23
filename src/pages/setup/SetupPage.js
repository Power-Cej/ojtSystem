import SetupPresenter from "./SetupPresenter";
import {
    deleteObjectUseCase,
    findObjectUseCase,
    updateObjectUseCase,
    upsertUseCase
} from "../../usecases/object";
import {Progress} from "nq-component";
import BaseListPage from "../../base/BaseListPage";

class SetupPage extends BaseListPage {
    constructor(props) {
        super(props);
        this.presenter = new SetupPresenter(this, findObjectUseCase(), upsertUseCase(), updateObjectUseCase(), deleteObjectUseCase());
    }

    componentDidMount() {

    }

    onClickUpdateRoles() {
        this.presenter.onClickUpdateRoles();
    }

    getCollectionName() {
        return 'roles';
    }

    render() {
        return (<div>
            {
                this.state.loading && <Progress/>
            }
            <p>Count:{this.state.count}</p>
            <p>Total:{this.state.total}</p>
            <button onClick={this.onClickUpdateRoles.bind(this)}>update roles</button>
        </div>);
    }
}

export default SetupPage;