import React from 'react';
import BasePage from "../../base/BasePage";
import NavBar from "../../components/NavBar";
import {
    findObjectUseCase,
    updateObjectUseCase
} from "../../domain/object/usecases";
import getSchemaByClass from "../../getSchemaByClass";
import createElement from "../../createElement";
import PostViewPresenter from "../../presenters/PostViewPresenter";
import dateFormat from "../../dateFormat";
import getProfile from "../../getProfile";
import Comments from "./Comments";
import Progress from "../../components/Progress";

class PostViewPage extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new PostViewPresenter(this,
            findObjectUseCase(),
            updateObjectUseCase(),
        );
        this.state = {
            post: {},
            comments: [],
            commentsCount: 0,
            comment: {objects: [], count: 0}
        };
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    getClassName() {
        return "posts";
    }

    getPostId() {
        return this.props.match.params.id;
    }

    formSubmit(e) {
        e.preventDefault();
        this.presenter.formSubmit();
    }

    getPost() {
        return this.state.post;
    }

    getSchema() {
        const schemas = this.props.schemas;
        return getSchemaByClass(schemas, this.getClassName());
    }

    backCLick() {
        this.presenter.backClick();
    }

    setPost(post) {
        this.setState({post});
    }

    commentSubmit(content) {
        this.presenter.commentSubmit(content);
    }

    setComments(comments) {
        this.setState({comments});
    }

    setCommentsCount(commentsCount) {
        this.setState({commentsCount});
    }

    getComments() {
        return this.state.comments;
    }

    editClick() {
        this.presenter.editClick();
    }

    deletePostClick() {
        const options = {
            title: 'Are you sure?',
            message: 'Do you really want to delete these records? this process cannot be undone.',
            positiveButton: 'DELETE'
        }
        this.showDialog(options)
            .then(() => this.presenter.deletePostClick());
    }

    renderPost(post, user) {
        const content = [...post.content];
        const title = content.shift();
        return (
            <div className="bg-white p-3 shadow-sm">
                <div>
                    <div className="dropdown">
                        <button className="btn pe-0 float-end"
                                data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul className="dropdown-menu">
                            {
                                post.author.id === user.id && (
                                    <li>
                                        <button className="dropdown-item btn btn-link rounded-0 fs-sm"
                                                onClick={this.editClick.bind(this)}>
                                            <i className="bi bi-pen me-2"></i>Edit
                                        </button>
                                    </li>
                                )
                            }
                            <li>
                                <button className="dropdown-item btn btn-link rounded-0 fs-sm">
                                    <i className="bi bi-exclamation-circle me-2"></i>Report post
                                </button>
                            </li>
                            {
                                post.author.id === user.id && (
                                    <li>
                                        <button className="dropdown-item btn btn-link rounded-0 fs-sm"
                                                onClick={this.deletePostClick.bind(this)}>
                                            <i className="bi bi-trash2 me-2"></i>Delete post
                                        </button>
                                    </li>
                                )
                            }

                        </ul>
                    </div>
                    <h4>{title.children[0]}</h4>
                </div>
                <div className="d-flex my-3">
                    <div className="flex-shrink-0">
                        <img
                            alt="author profile"
                            className="img-fluid rounded-circle"
                            width="40"
                            src={getProfile(post.author)}/>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <div>
                            <h6 className="m-0">{post.author.name}</h6>
                            <span className="fs-xs text-muted">{dateFormat(post.createdAt)}</span>
                        </div>
                    </div>
                </div>
                {
                    content.map(createElement)
                }
                <Comments
                    post={post}/>
            </div>
        );
    }

    render() {
        const post = this.state.post;
        const user = this.getCurrentUser();
        return (
            <>
                <NavBar className="shadow-sm"/>
                <div className="container-fluid w-100 mt-3">
                    {
                        !post.id && <Progress className="fs-sm">Loading ...</Progress>
                    }
                    {
                        post.id && this.renderPost(post, user)
                    }
                </div>
            </>
        )
    }

}

export default PostViewPage;
