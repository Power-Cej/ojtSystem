import BasePage from "../../base/BasePage";
import NavBar from "../../components/NavBar";
import Animate from "../../components/Animate";
import jobAnimation from "../../lotties/job-interview.json";
import {Link} from "react-router-dom";
import SearchView from "../../components/SearchView";
import getProfile from "../../getProfile";
import dateFormat from "../../dateFormat";

class FaqPage extends BasePage {

    render() {
        return (
            <>
                <NavBar className="shadow-sm"/>
                <section className="container">
                    <div className="text-center py-5">
                        <h2 className="mt-3 fw-bold">Hello, how can we help you?</h2>
                        <div className="text-center mx-auto mt-4 col-md-7">
                            <SearchView placeHolder="Start typing your search..."/>
                        </div>
                    </div>
                    <div className="text-center">
                        <p>or choose a category to quickly find the help you need</p>
                    </div>
                    <div className="row">
                        <div className="col-6 col-md-3 mt-3">
                            <div className="text-center bg-white rounded shadow-sm py-3">
                                <i className="bi bi-flag h1"></i>
                                <p className="m-0">Getting Started</p>
                            </div>
                        </div>
                        <div className="col-6 col-md-3 mt-3">
                            <div className="text-center bg-white rounded shadow-sm py-3">
                                <i className="bi bi-flag h1"></i>
                                <p className="m-0">Pricing & Plan</p>
                            </div>
                        </div>
                        <div className="col-6 col-md-3 mt-3">
                            <div className="text-center bg-white rounded shadow-sm py-3">
                                <i className="bi bi-flag h1"></i>
                                <p className="m-0">Sales Question</p>
                            </div>
                        </div>
                        <div className="col-6 col-md-3 mt-3">
                            <div className="text-center bg-white rounded shadow-sm py-3">
                                <i className="bi bi-flag h1"></i>
                                <p className="m-0">Usage Guides</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="card-body bg-white">
                            <div className="d-flex">
                                <div className="flex-shrink-0 bg-warning">
                                    <i className="bi bi-chat"></i>
                                </div>

                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-3">Chat</h6>
                                    <p>Start a conversation now!</p>
                                </div>
                            </div>
                        </div>

                        <div className="card-body bg-white">
                            <div className="d-flex">
                                <div className="flex-shrink-0 bg-warning">
                                    <i className="bi bi-chat"></i>
                                </div>

                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-3">Faq</h6>
                                    <p>Find intelligent answers instantly</p>
                                </div>
                            </div>
                        </div>

                        <div className="card-body bg-white">
                            <div className="d-flex">
                                <div className="flex-shrink-0 bg-warning">
                                    <i className="bi bi-chat"></i>
                                </div>

                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-3">Email</h6>
                                    <p>Get solution beamed to your inbox</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </>
        )
    }
}

export default FaqPage;
