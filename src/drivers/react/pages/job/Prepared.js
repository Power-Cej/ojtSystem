function Prepared({object, onSubmit, onBack}) {
    function submit(e) {
        e.preventDefault();
        onSubmit();
    }
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <form className="p-2">
                    <div className="row g-3">
                        <div className="col-md-12">
                            <p className="small fw-bold mb-0 ms-1">Prepared Information</p>
                            <hr className="dropdown-divider"/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">Prepared Position</label>
                            <input type="text" className="form-control" placeholder="Job title" required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">Min. Salary</label>
                            <input type="number" className="form-control" placeholder="Expected salary"
                                   required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">Max. Salary</label>
                            <input type="number" className="form-control" placeholder="Expected salary"
                                   required/>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label small text-nowrap">Location<span
                                className="fs-xs text-muted ms-1">(Optional)</span></label>
                            <input type="text" className="form-control" placeholder="City want to work"/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small">Job Type</label>
                            <div className="row">
                                <div className="col">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio"
                                               name="flexRadioDefault"/>
                                        <label className="form-check-label small text-nowrap">Full time</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio"
                                               name="flexRadioDefault" id="flexRadioFemale"/>
                                        <label className="form-check-label small text-nowrap"
                                               htmlFor="flexRadioFemale">Part time</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio"
                                               name="flexRadioDefault" id="flexRadioFemale"/>
                                        <label className="form-check-label small"
                                               htmlFor="flexRadioFemale">Contract</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio"
                                               name="flexRadioDefault" id="flexRadioFemale"/>
                                        <label className="form-check-label small"
                                               htmlFor="flexRadioFemale">Freelance</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-2 text-end">
                        <button
                            type="button"
                            onClick={onBack}
                            className="btn btn-light">BACK
                        </button>
                        <button type="submit"
                                className="btn btn-dark ms-3">NEXT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Prepared;
