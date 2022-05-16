import React from 'react';
import BasePage from "../../base/BasePage";
import {Link} from "react-router-dom";
import NavBar from "../../components/NavBar";
import PostsPresenter from "../../presenters/PostsPresenter";
import {findObjectUseCase} from "../../domain/object/usecases";
import InfiniteScroll from "react-infinite-scroller";
import Progress from "../../components/Progress";
import dateFormat from "../../dateFormat";
import getProfile from "../../getProfile";
import Placeholder from "../../components/Placeholder";

class PostsPage extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new PostsPresenter(this, findObjectUseCase());
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

    setObjects(objects) {
        this.setState({objects});
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

    getQuery() {
        const search = new URLSearchParams(this.props.location.search);
        const query = {};
        search.forEach((value, key) => {
            query[key] = value;
        })
        return query;
    }

    addClick() {
        this.presenter.addClick();
    }

    questionClick() {
        this.presenter.questionClick();
    }

    tutorialClick() {
        this.presenter.tutorialClick();
    }

    render() {
        const {objects, count, progress} = this.state;
        return (
            <>
                <NavBar className="mb-3">
                    <button
                        className="btn btn-link text-dark">
                        <i className="bi bi-search"></i>
                    </button>
                    <button
                        className="btn btn-link text-dark">
                        <i className="bi bi-bell"></i>
                    </button>
                </NavBar>

                <div className="container">
                    <h2 className="mb-3"><strong>Posts</strong></h2>
                    <InfiniteScroll
                        initialLoad={false}
                        hasMore={count !== objects.length}
                        loadMore={this.loadMore.bind(this)}>
                        {
                            objects.map(post => {
                                const {id, author, content, createdAt} = post;
                                const title = content[0].children[0];
                                if (typeof title !== 'string') return null;
                                return (
                                    <Link
                                        key={id}
                                        className="card border-0 shadow-sm mb-3 text-dark"
                                        to={`/posts/${id}`}>
                                        <div className="p-3 px-lg-5 py-lg-4">
                                            <div className="row m-0 align-items-center gx-4 gx-md-5">
                                                <div className="col-2 p-0 col-md-1">
                                                    <img className="img-fluid rounded-circle"
                                                         src={getProfile(author)}
                                                         alt="author profile"/>
                                                </div>
                                                <div className="col-10">
                                                    <h6 className="fw-bold text-nowrap text-truncate">{title}</h6>
                                                    <small className="me-3 text-muted text-nowrap">{author.name}</small>
                                                    <div className="d-flex">
                                                        <label className="me-3 text-muted text-nowrap">
                                                            <i className="bi bi-chat-dots"></i>
                                                            <span className="fs-sm ms-1">40 replies</span>
                                                        </label>
                                                        <label className="me-3 text-muted text-nowrap">
                                                            <i className="bi bi-eye"></i>
                                                            <span className="fs-sm ms-1">36 views</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                )
                                return (
                                    <Link
                                        key={id}
                                        className="card border-0 shadow-sm mb-3 text-dark"
                                        to={`/posts/${id}`}>
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        alt="sdsd"
                                                        className="img-fluid rounded-circle border-1 shadow-sm"
                                                        width="70"
                                                        height="70"
                                                        src={getProfile(author)}/>
                                                </div>

                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-3">{title}</h6>
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

                                                    <div
                                                        className="d-flex flex-column flex-lg-row justify-content-between">
                                                        <div className="mb-2 mb-lg-0">

                                                        </div>

                                                        <div className="text-muted fs-xs mt-auto">
                                                            <i className="bi bi-calendar"></i>
                                                            <span className="ms-1">{dateFormat(createdAt)}</span>
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
                {
                    (!progress && objects.length === 0) && <Placeholder/>
                }
                <div className="position-fixed bottom-0 end-0">
                    <button onClick={this.addClick.bind(this)} className="btn btn-primary rounded-circle m-4 shadow">
                        <i className="bi bi-plus fs-4"></i>
                    </button>
                </div>
            </>
        );
    }
}

export default PostsPage;
