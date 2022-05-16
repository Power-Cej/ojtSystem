import React from 'react';
import BasePage from "../../base/BasePage";
import {Link} from "react-router-dom";
import CategoryPresenter from "../../presenters/CategoryPresenter";
import {findObjectUseCase} from "../../domain/object/usecases";
import InfiniteScroll from "react-infinite-scroller";
import Progress from "../../components/Progress";
import NavBar from "../../components/NavBar";
import Card from "../../components/Card";

class CategoryPage extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new CategoryPresenter(this, findObjectUseCase());
        this.state = {
            objects: [],
            selected: [],
            progress: true,
            count: 0,
        };
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    getClassName() {
        return 'categories';
    }

    setObjects(objects) {
        return this.setState({objects});
    }

    getObjects() {
        return this.state.objects;
    }

    setCount(count) {
        return this.setState({count});
    }

    loadMore() {
        this.presenter.loadMore();
    }

    render() {
        const {objects, progress, count} = this.state;
        return (
            <>
                <NavBar className="shadow-sm mb-3"/>
                <div className="container">
                    <h2 className="mb-3"><strong>Tutorials</strong></h2>
                    <InfiniteScroll
                        initialLoad={false}
                        hasMore={count !== objects.length}
                        loadMore={this.loadMore.bind(this)}>
                        {
                            objects.map(category => {
                                const {id, name, icon = "/logo.svg"} = category;
                                return (
                                    <Link
                                        to={'/posts?categories=' + id}
                                        className="link-dark">
                                        <Card className="mb-3" key={id}>
                                            <div className="row m-0 align-items-center">
                                                <div className="col-3 p-0 col-md-1">
                                                    <img className="img-fluid" alt="logo"
                                                         src={icon}/>
                                                </div>
                                                <div className="col-9">
                                                    <h4 className="fw-bold text-nowrap text-truncate">{name}</h4>
                                                    <div><span className="me-3 text-muted text-nowrap"><i
                                                        className="bi bi-chat-dots"></i><span
                                                        className="fs-sm ms-2">40 posts</span></span><span
                                                        className="me-3 text-muted text-nowrap"><i
                                                        className="bi bi-eye"></i><span
                                                        className="fs-sm ms-2">36 views</span></span></div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                )
                                return (
                                    <Link
                                        to={'/posts?categories=' + id}
                                        className="card border-0 shadow-sm mb-3 link-dark"
                                        key={id}>

                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 align-content-center">
                                                    <img className="img-fluid" alt='logo' width="100" height="100"
                                                         src={icon}/>
                                                </div>

                                                <div className="flex-grow-1 ms-3">
                                                    <div className="d-flex flex-column h-100 justify-content-between">
                                                        <div>
                                                            <h4 className="fw-bold">{name}</h4>
                                                        </div>
                                                        <div>
                                                            <span className="me-3 text-muted">
                                                                <i className="bi bi-eye"></i>
                                                                <span className="fs-sm ms-1">0</span>
                                                            </span>
                                                            <span className="me-3 text-muted">
                                                                <i className="bi bi-heart"></i>
                                                                <span className="fs-sm ms-1">0</span>
                                                            </span>
                                                            <span className="me-3 text-muted">
                                                                <i className="bi bi-chat-dots"></i>
                                                                <span className="fs-sm ms-1">0</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                        {
                            progress && <Progress className="fs-sm">Loading ...</Progress>
                        }
                    </InfiniteScroll>
                </div>
            </>

        );
    }
}

export default CategoryPage;
