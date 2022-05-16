import BasePage from "../../base/BasePage";
import NavBar from "../../components/NavBar";
import Animate from "../../components/Animate";
import jobAnimation from "../../lotties/support.json";
import {Link} from "react-router-dom";
import SearchView from "../../components/SearchView";
import getProfile from "../../getProfile";
import dateFormat from "../../dateFormat";
import botAnimation from "../../lotties/bot-butler.json";
import emailAnimation from "../../lotties/email.json";
import searchAnimation from "../../lotties/search.json";

class HelpPage extends BasePage {

    render() {
        return (
            <div className="bg-warning">
                <section className="bg-white pt-2">
                    <nav className="navbar navbar-expand-lg navbar-light bg-white position-absolute">
                        <div className="container-fluid">
                            <Link to="/" type="button" className="btn btn-sm btn-primary fs-5">
                                <i className="bi bi-arrow-left"></i>
                            </Link>
                        </div>
                    </nav>
                    <div className="text-center pt-4">
                        <p>Need help?</p>
                        <strong>24/7</strong>
                        <h1><strong>Help Center</strong></h1>
                    </div>

                    <Animate
                        width="50%"
                        animationData={jobAnimation}/>
                </section>
                <section className="container p-4">
                    <div className="text-center">
                        <h2 className="mt-3 fw-bold">Tell us how we can help</h2>
                        <p>Our crew of superheroes are standing by for service & support!</p>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="bg-white shadow-sm rounded m-1">
                                <div className="d-flex">
                                    <div className="col-3 p-2">
                                        <div className="box bg-warning rounded">
                                            <div className="position-absolute top-0">
                                                <Animate
                                                    loop={false}
                                                    autoplay={false}
                                                    animationData={botAnimation}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-9 d-flex align-items-center">
                                        <a href="https://m.me/cliqode" target="_blank">
                                            <h6 className="m-0">Chat</h6>
                                            <p className="m-0">Start a conversation now!</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="bg-white shadow-sm rounded m-1">
                                <div className="d-flex">
                                    <div className="col-3 p-2">
                                        <div className="box bg-warning rounded">
                                            <div className="position-absolute top-0">
                                                <Animate
                                                    loop={false}
                                                    autoplay={false}
                                                    animationData={searchAnimation}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-9 d-flex align-items-center">
                                        <div>
                                            <h6 className="m-0">Faq</h6>
                                            <p className="m-0">frequently asked question</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="bg-white shadow-sm rounded m-1">
                                <div className="d-flex">
                                    <div className="col-3 p-2">
                                        <div className="box bg-warning rounded">
                                            <div className="position-absolute top-0">
                                                <Animate
                                                    loop={false}
                                                    autoplay={false}
                                                    animationData={emailAnimation}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-9 d-flex align-items-center">
                                        <a href="mailto:support@cliqode.com">
                                            <h6 className="m-0">Email</h6>
                                            <p className="m-0">Get in touch with us</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default HelpPage;
