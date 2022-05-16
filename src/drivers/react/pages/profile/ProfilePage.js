import BasePage from "../../base/BasePage";
import NavBar from "../../components/NavBar";

class ProfilePage extends BasePage {

    render() {
        const progressHeight = {
            height: "12px"
        }
        return (
            <div className="bg-white">
                <NavBar className="shadow-sm"/>

                <div className="container-fluid p-4">
                    <div className="row shadow">
                        <div className="col-md-3 bg-secondary p-0">
                            <section className="text-center bg-opacity-20 text-white py-4">
                                <img className="img-fluid rounded-circle img-thumbnail p-0 m-2"
                                     src="https://avatars3.githubusercontent.com/u/8755357" width="150"/>
                            </section>
                            <div className="p-3 text-white">
                                <h5 className="">CONTACT</h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <i className="bi bi-envelope"></i>
                                        <span className="fs-sm text-nowrap ms-2">alan.doe@website.com</span>
                                    </li>
                                    <li>
                                        <i className="bi bi-telephone"></i>
                                        <span className="fs-sm text-nowrap ms-2">0123 456 789</span>
                                    </li>
                                    <li>
                                        <i className="bi bi-globe"></i>
                                        <span className="fs-sm text-nowrap ms-2">portfoliosite.com</span>
                                    </li>
                                    <li>
                                        <i className="bi bi-linkedin"></i>
                                        <span className="fs-sm text-nowrap ms-2">linkedin.com/in/alandoe</span>
                                    </li>

                                    <li>
                                        <i className="bi bi-github"></i>
                                        <span className="fs-sm text-nowrap ms-2">github.com/username</span>
                                    </li>
                                    <li>
                                        <i className="bi bi-twitter"></i>
                                        <span className="fs-sm text-nowrap ms-2">@twittername</span>
                                    </li>

                                </ul>
                            </div>
                            <div className="p-3 text-white">
                                <h5 className="">EDUCATION</h5>
                                <ul className="list-unstyled text-white">
                                    <li>
                                        <h6>MSc in Computer Science</h6>
                                        <span>University of London</span>
                                        <label>2016 - 2018</label>
                                    </li>
                                    <li>
                                        <h6>BSc in Applied Mathematics</h6>
                                        <span>Bristol University</span>
                                        <label>2012 - 2016</label>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-3 text-white">
                                <h5 className="">LANGUAGES</h5>
                                <ul className="list-unstyled text-white">
                                    <li>
                                        <p>English (Native)</p>
                                    </li>
                                    <li>
                                        <p>French (Professional)</p>
                                    </li>
                                    <li>
                                        <p>Spanish (Professional)</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-3 text-white">
                                <h5 className="">INTERESTS</h5>
                                <ul className="list-unstyled text-white">
                                    <li>
                                        <p>Climbing</p>
                                    </li>
                                    <li>
                                        <p>Snowboarding</p>
                                    </li>
                                    <li>
                                        <p>Cooking</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-9 bg-white p-5">
                            <section>
                                <h1><strong>Alan Doe</strong></h1>
                                <p>Full Stack Developer</p>
                            </section>
                            <section>
                                <h4 className="text-primary">
                                    ABOUT
                                </h4>
                                <div>
                                    <p>Summarise your career here lorem ipsum dolor sit amet, consectetuer adipiscing
                                        elit. You can <a
                                            href="https://themes.3rdwavemedia.com/bootstrap-templates/resume/orbit-free-resume-cv-bootstrap-theme-for-developers/"
                                            target="_blank">download this free resume/CV template here</a>. Aenean
                                        commodo ligula eget
                                        dolor
                                        aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                                        nascetur ridiculus
                                        mus.
                                        Donec quam felis, ultricies nec, pellentesque eu.</p>
                                </div>
                            </section>
                            <section>
                                <h4 className="text-primary">
                                    EXPERIENCE
                                </h4>
                                <ul>
                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <h5>Lead Developer</h5>
                                            <span>2019 - Present</span>
                                        </div>
                                        <span className="text-muted">Startup Hubs, San Francisco</span>
                                        <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing
                                            elit. Aenean
                                            commodo
                                            ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
                                            parturient
                                            montes,
                                            nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                                            pretium quis, sem.
                                            Nulla consequat massa quis enim. Donec pede justo.</p>
                                    </li>
                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <h5>Senior Software Engineer</h5>
                                            <span>2018 - 2019</span>
                                        </div>
                                        <span className="text-muted">Google, London</span>
                                        <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing
                                            elit. Aenean
                                            commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et
                                            magnis dis
                                            parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
                                            pellentesque eu,
                                            pretium quis, sem.</p>
                                    </li>

                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <h5>UI Developer</h5>
                                            <span>2016 - 2018</span>
                                        </div>
                                        <span className="text-muted">Amazon, London</span>
                                        <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing
                                            elit. Aenean
                                            commodo
                                            ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
                                            parturient
                                            montes,
                                            nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                                            pretium quis,
                                            sem.</p>
                                    </li>

                                </ul>
                            </section>
                            <section>
                                <h4 className="text-primary">
                                    EDUCATION
                                </h4>
                                <ul>
                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <h5>MASTERS OF ARTS</h5>
                                            <span>2012 - 2014</span>
                                        </div>
                                        <span className="text-muted">University, US 59</span>
                                        <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing
                                            elit. Aenean
                                            commodo
                                            ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
                                            parturient
                                            montes,
                                            nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                                            pretium quis, sem.
                                            Nulla consequat massa quis enim. Donec pede justo.</p>
                                    </li>
                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <h5>Senior Software Engineer</h5>
                                            <span>2018 - 2019</span>
                                        </div>
                                        <span className="text-muted">Google, London</span>
                                        <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing
                                            elit. Aenean
                                            commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et
                                            magnis dis
                                            parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
                                            pellentesque eu,
                                            pretium quis, sem.</p>
                                    </li>

                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <h5>UI Developer</h5>
                                            <span>2016 - 2018</span>
                                        </div>
                                        <span className="text-muted">Amazon, London</span>
                                        <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing
                                            elit. Aenean
                                            commodo
                                            ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
                                            parturient
                                            montes,
                                            nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                                            pretium quis,
                                            sem.</p>
                                    </li>

                                </ul>
                            </section>
                            <section>
                                <h4 className="text-primary">
                                    SKILLS
                                </h4>
                                <ul className="list-unstyled">
                                    <li>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <strong>Python &amp; Django</strong>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="progress" style={progressHeight}>
                                                    <div className="progress-bar" role="progressbar"
                                                         style={{width: "100%"}}
                                                         aria-valuenow="100"
                                                         aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <strong>Python &amp; Django</strong>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="progress" style={progressHeight}>
                                                    <div className="progress-bar" role="progressbar"
                                                         style={{width: "50%"}}
                                                         aria-valuenow="100"
                                                         aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default ProfilePage;
