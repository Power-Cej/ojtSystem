function Personal({object, onSubmit}) {
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
                            <p className="small fw-bold mb-0 ms-1">Personal Information</p>
                            <hr className="dropdown-divider"/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">First Name</label>
                            <input type="text" className="form-control" placeholder="e.g. Juan"
                                   required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">Last Name</label>
                            <input type="text" className="form-control" placeholder="e.g. Dela"
                                   required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">Middle Name</label>
                            <input type="text" className="form-control"
                                   placeholder="e.g. Cruz"
                                   required/>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label small">Alias<span
                                className="fs-xs text-muted ms-1">(Optional)</span></label>
                            <input type="text" className="form-control" placeholder="e.g. John"/>
                        </div>
                        <div className="col-md-8">
                            <label className="form-label small">Biography</label>
                            <input type="text"
                                   maxLength="100"
                                   className="form-control"
                                   placeholder="Describe who you are"
                                   required/>
                        </div>

                    </div>
                    <div className="row g-3 mt-3 ">
                        <div className="col-md-12">
                            <p className="small fw-bold mb-0 ms-1">Contact Information</p>
                            <hr className="dropdown-divider"/>
                        </div>
                        <div className="col-md-5">
                            <label className="form-label small">
                                Phone Number
                            </label>
                            <input type="text" className="form-control"
                                   placeholder="e.g. 09*********"
                                   required/>
                        </div>
                        <div className="col-md-5">
                            <label className="form-label small">
                                Email Address
                            </label>
                            <input type="email" className="form-control"
                                   placeholder="e.g. username@domain.com"
                                   required/>
                        </div>
                        <div className="col-md-5">
                            <label className="form-label small">
                                Address
                            </label>
                            <input type="location" className="form-control"
                                   placeholder="Street Barangay City"
                                   required/>
                        </div>
                        <div className="col-md-5">
                            <label className="form-label small">Website<span
                                className="fs-xs text-muted ms-1">(Optional)</span></label>
                            <input type="location" className="form-control"
                                   placeholder="https://domain.com"/>
                        </div>
                    </div>

                    <div className="row g-3 mt-3">
                        <div className="col-md-12">
                            <p className="small fw-bold mb-0 ms-1">Basic Information</p>
                            <hr className="dropdown-divider"/>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label small">Birth Date</label>
                            <input type="Date" className="form-control"
                            required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">
                                Birth Place
                            </label>
                            <input type="text" className="form-control"
                                   placeholder="City" required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">Religion<span
                                className="fs-xs text-muted ms-1">(Optional)</span></label>
                            <input type="text" className="form-control"
                                   placeholder="e.g. Christian"/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small">Gender</label>
                            <div className="row">
                                <div className="col">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio"
                                               name="flexRadioDefault"/>
                                        <label className="form-check-label small">Male</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio"
                                               name="flexRadioDefault" id="flexRadioFemale"/>
                                        <label className="form-check-label small"
                                               htmlFor="flexRadioFemale">Female</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small">Civil Status</label>
                            <div className="row">
                                <div className="col">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio"
                                               name="flexRadioDefault"/>
                                        <label className="form-check-label small">Single</label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio"
                                               name="flexRadioDefault" id="flexRadioFemale"/>
                                        <label className="form-check-label small"
                                               htmlFor="flexRadioFemale">Married</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio"
                                               name="flexRadioDefault" id="flexRadioFemale"/>
                                        <label className="form-check-label small"
                                               htmlFor="flexRadioFemale">Widowed</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio"
                                               name="flexRadioDefault" id="flexRadioFemale"/>
                                        <label className="form-check-label small"
                                               htmlFor="flexRadioFemale">Separated</label>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="mt-2 text-end">
                        <button type="submit"
                                className="btn btn-dark ms-3">NEXT
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Personal;
