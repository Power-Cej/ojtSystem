function Education({object, onSubmit, onBack}) {
    function submit(e) {
        e.preventDefault();
        onSubmit();
    }

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <form className="p-2" onSubmit={submit}>
                    <div className="row g-3">
                        <div className="col-md-12">
                            <p className="small fw-bold mb-0 ms-1">Educational Background</p>
                            <hr className="dropdown-divider"/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">Primary</label>
                            <input type="text" className="form-control" placeholder="School name" required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">Start Year</label>
                            <input type="date" className="form-control" required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">End Year</label>
                            <input type="date" className="form-control" required/>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label small">Secondary</label>
                            <input type="text" className="form-control" placeholder="School name" required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">Start Year</label>
                            <input type="date" className="form-control" required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">End Year</label>
                            <input type="date" className="form-control" required/>
                        </div>


                        <div className="col-md-4">
                            <label className="form-label small">Tertiary</label>
                            <input type="text" className="form-control" placeholder="School name" required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">Start Year</label>
                            <input type="date" className="form-control" required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">End Year</label>
                            <input type="date" className="form-control" required/>
                        </div>
                    </div>

                    <div className="row g-3 mt-3">
                        <div className="col-md-12">
                            <p className="small fw-bold mb-0 ms-1">Employment Record</p>
                            <hr className="dropdown-divider"/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">Employer<span
                                className="fs-xs text-muted ms-1">(Optional)</span></label>
                            <input type="text" className="form-control" placeholder="Company name" />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">Duration Start<span
                                className="fs-xs text-muted ms-1">(Optional)</span></label>
                            <input type="date" className="form-control"/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">Duration End<span
                                className="fs-xs text-muted ms-1">(Optional)</span></label>
                            <input type="date" className="form-control"/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">Position<span
                                className="fs-xs text-muted ms-1">(Optional)</span></label>
                            <input type="text" className="form-control" placeholder="Job title"/>
                        </div>
                        <div className="col-md-8">
                            <label className="form-label small">Description<span
                                className="fs-xs text-muted ms-1">(Optional)</span></label>
                            <input type="text" className="form-control" placeholder="Responsibilities"/>
                        </div>
                        <div className="text-center">
                            <a className="small" href="#">Add more</a>
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

export default Education;
