import BaseListPresenter from "../../base/BaseListPresenter";

class DashboardPresenter extends BaseListPresenter {
    constructor(view, findObjectUseCase, deleteObjectUseCase, upsertUseCase) {
        super(view, findObjectUseCase, deleteObjectUseCase);
        this.upsertUseCase = upsertUseCase;
    }

    componentDidMount() {
        this.init();
        this.sort = {createdAt: 1}
        this.getObjects();
    }

    async onSubmitAddWidget(obj) {
        try {
            this.view.submitting();
            const object = await this.upsertUseCase.execute('dashboard', obj);
            this.objects.push(object);
            this.view.setObjects(this.objects);
            this.view.submissionSuccess();
        } catch (error) {
            this.view.showError(error);
        }
    }
}

export default DashboardPresenter;