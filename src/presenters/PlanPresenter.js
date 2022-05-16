class PlanPresenter {
    constructor(view, findDiscounts, findPlans) {
        this.view = view;
        this.findDiscounts = findDiscounts;
        this.findPlans = findPlans;
    }

    componentDidMount() {
        this.getDiscounts();
        this.getPlans();
    }

    getDiscounts() {
        this.findDiscounts.execute('discounts')
            .then(objects => {
                this.view.setDiscounts(objects);
                this.view.setDiscount(objects[0]);
            });
    }

    getPlans() {
        this.findPlans.execute('plans')
            .then(objects => {
                this.view.setPlans(objects);
            });
    }

    selectDiscount(discount) {
        this.view.setDiscount(discount);
    }

    selectPlan(plan) {

    }
}

export default PlanPresenter;
