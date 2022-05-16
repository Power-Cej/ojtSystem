import BasePage from "../../base/BasePage";
import Animate from "../../components/Animate";
import blobAnimation from "../../lotties/blob.json";

class AboutPage extends BasePage {

    render() {
        return (
            <div className="bg-white p-4">
                <section className="container">
                    <div className="row">
                        <div className="col-md-6 text-center">
                            <h1 className="mt-5"><strong>About Us</strong></h1>
                            <p className="text-start mt-4">
                                Hello ako nga pala si John ang founder ng CLIQODE itong platform na ito ay ginawa ko
                                para sa
                                community
                                nating mga pilipino programmers, para mas marami pa tayong matutunan sa programming at
                                para
                                matulongan
                                din ang mga nag uumpisa palang matuto ng programming. Dito sa CLIQODE marami kang
                                makikilalang ibang mga programmer din na magagaling at hindi madamot mag share ng
                                kanilang mga nalalaman at
                                mga naging experience sa industry.
                            </p>

                        </div>
                        <div className="col-md-6">
                            <img className="img-fluid" src="assets/images/john.png"/>
                        </div>
                        <div className="col-md-12">
                            <div style={{transform: "translateX(-55%)"}}>
                                <Animate
                                    width="200px"
                                    animationData={blobAnimation}/>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container mb-3">
                    <div className="text-center">
                        <h1><strong>Our Story</strong></h1>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <img className="img-fluid" src="assets/images/friends.png"/>
                        </div>
                        <div className="col-md-6">
                            <p className="mt-5">
                                Noong 2012 pag ka graduate namin ng mga kaibigan ko ng highschool gumawa kami ng
                                Facebook Group na ProgrammersDevelopers, noong time na iyon gusto lang namin mag
                                tulungan sa mga kukunin
                                naming course na may
                                kinalaman sa computer, dahil kaunti lang kami noon, pag nag po-post ako sa group namin
                                ay walang sumasagot kaya
                                naisipan kong mag invite sa mga iba pang mga group, school, at forums na may kinalaman
                                sa Computer Programming
                                at hindi ko akalain na dadami ang sasali hanggang sa nagkaroon na rin ng mga meetup at
                                mas naging active ang
                                community.
                            </p>
                        </div>
                        <div className="col-md-12 position-relative" style={{zIndex: 1}}>
                            <p>
                                Nabuo ko ang name na CLIQODE from the word clique na ang ibig sabihin ay grupo na may
                                parehas na interes at ang
                                isang word ay code,
                                pinag sama ko at nabuo ko ang CLIQODE na para saakin ang ibig sabihin ay group of
                                coders.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="container mb-3">
                    <div className="row">
                        <div className="col-md-12 position-relative">
                            <div className="position-absolute start-100" style={{transform: "translate(-50%,-50%)"}}>
                                <Animate
                                    width="200px"
                                    animationData={blobAnimation}/>
                            </div>
                        </div>
                        <div className="col-md-6 position-relative">
                            <h1 className="mt-5"><strong>We're on a Mission</strong></h1>
                            <p className="bg-white mt-4">
                                Ang layunin ng platform na ito ay mas matuto pa tayong gumawa ng mga quality na Software
                                na mapapakinabangan ng
                                maraming tao, pwedeng sa trabaho, sa negosyo o sa mga personal project natin.
                                naniniwala ako na tayong mga programmer ay may malaking ambag sa pag unlad ng
                                teknolohiya ng ating bansang Pilipinas.
                            </p>
                        </div>
                        <div className="col-md-6 position-relative ">
                            <img className="img-fluid" src="assets/images/people.svg"/>
                        </div>
                    </div>
                </section>
                <section className="text-center">
                    <h1><strong>Join to our community</strong></h1>
                    <img className="img-fluid mt-4 border-bottom border-warning border-2 rounded"
                         src="assets/images/community.jpg"/>
                </section>
            </div>

        )
    }
}

export default AboutPage;
