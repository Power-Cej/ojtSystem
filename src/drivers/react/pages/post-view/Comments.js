import React from 'react';
import generateProfile from "../../generateProfile";
import dateFormat from "../../dateFormat";
import createElement from "../../createElement";
import {findObjectUseCase, saveObjectUseCase, deleteObjectUseCase} from "../../domain/object/usecases";
import CommentForm from "./CommentForm";
import Context from "../../AppContext";
import InfiniteScroll from "react-infinite-scroller";
import Progress from "../../components/Progress";

const find = findObjectUseCase();
const save = saveObjectUseCase();
const remove = deleteObjectUseCase();
const className = 'comments';

const limit = 10;
let current = 1;

function Comments({post}) {
    const {user} = React.useContext(Context);
    const [comments, setComments] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [error, setError] = React.useState('');
    const [progress, setProgress] = React.useState(false);
    const [progressSubmit, setProgressSubmit] = React.useState(false);

    function getData() {
        const where = {post: {id: post.id}}
        const skip = (current - 1) * limit;
        const query = {
            limit,
            skip,
            where,
            include: ['all'],
            count: true,
            sort: {createdAt: -1},
        };
        setProgress(true);
        find.execute(className, query)
            .then(({objects, count}) => {
                setCount(count);
                setComments((prev) => [...prev, ...objects]);
                setProgress(false);
            })
            .catch(error => {
                setProgress(false);
            });
    }

    React.useEffect(() => {
        getData();
    },[]);

    function commentSubmit(content) {
        const comment = {
            content,
            post,
            author: user,
            acl: {read: ['*'], write: [user.id, post.author.id]}
        };
        setProgressSubmit(true);
        save.execute("comments", comment)
            .then((object) => {
                setCount(count + 1);
                comments.splice(0, 0, object);
                setComments(comments);
                setProgressSubmit(false);
            })
            .catch(error => {
                setProgressSubmit(false);
            });
    }

    function deleteClick(i) {
        const comment = comments[i];
        remove.execute(className, comment.id)
            .then(() => {
                comments.splice(i, 1);
                setCount(count - 1);
                setComments([...comments]);
            })
            .catch(error => {
                setError('Unable to delete this comment.');
            });
    }

    function loadMore() {
        current++;
        getData();
    }

    return (
        <React.Fragment>
            <h6 className="mt-3 fs-sm">{count} Comments</h6>
            <div>
                <CommentForm
                    progress={progressSubmit}
                    onSubmit={commentSubmit}
                    placeholder="Write your comment here"/>
            </div>
            <hr className="dropdown-divider bg-light"/>
            <InfiniteScroll
                initialLoad={false}
                hasMore={count !== comments.length && !progress}
                loadMore={loadMore}>
                {
                    comments.map((comment, index) => {
                        const {id, content, author, createdAt} = comment;
                        const profile = author.profile || generateProfile(author.name);
                        return (
                            <React.Fragment key={id}>
                                <div className="d-flex my-3">
                                    <div className="flex-shrink-0">
                                        <img
                                            alt="profile"
                                            className="img-fluid rounded-circle"
                                            width="40"
                                            src={profile}/>
                                    </div>
                                    <div className="flex-grow-1 ms-2">
                                        <div>
                                            <h6 className="m-0">{author.name}
                                                {/*<span className="badge bg-light text-muted fw-light fs-xs rounded">Best answer</span>*/}
                                                <div className="dropdown">
                                                    <button className="btn pe-0 float-end"
                                                            data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="bi bi-three-dots-vertical"></i>
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <button
                                                                className="dropdown-item btn btn-link rounded-0 fs-sm"
                                                                onClick={deleteClick.bind(this, index)}>
                                                                <i className="bi bi-trash2 me-2"></i>Delete
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </h6>
                                            <span className="fs-xs text-muted">{dateFormat(createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    content && content.map(createElement)
                                }
                                {
                                    error && <span className="fs-xs text-danger">{error}</span>
                                }

                            </React.Fragment>
                        )
                    })
                }
                {
                    progress && <Progress className="fs-sm">Loading ...</Progress>
                }
            </InfiniteScroll>
        </React.Fragment>
    )

}

export default Comments;
