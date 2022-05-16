import React from 'react';
import BasePage from "../../base/BasePage";
import NavBar from "../../components/NavBar";
import PostFormPresenter from "../../presenters/PostFormPresenter";
import commands from "./commands.json";
import {findObjectUseCase, saveObjectUseCase, updateObjectUseCase} from "../../domain/object/usecases";
import {withContext} from "../../AppContext";
import nodeToJson from "../../nodeToJson";
import ContentEditor from "../../components/ContentEditor";
import browseFile from "../../browseFile";
import {saveImageUseCase} from "../../domain/file/usecases";
import createElement from "../../createElement";


class PostFormPage extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new PostFormPresenter(this,
            saveObjectUseCase(),
            findObjectUseCase(),
            updateObjectUseCase(),
            saveImageUseCase());
        this.state = {object: {}};
    }


    componentDidMount() {
        this.presenter.componentDidMount();
    }

    getClassName() {
        return "posts";
    }

    getObjectId() {
        const state = this.props.location.state;
        return state && state.id ? state.id : undefined;
    }


    getObject() {
        return this.state.object;
    }


    backCLick() {
        this.presenter.backClick();
    }

    setObject(object) {
        this.setState({object});
    }

    executeCommand(command, value) {
        this.editor.execute(command, value);
    }

    insertImageClick() {
        browseFile('image/*')
            .then(files => {
                if (files.length > 0) {
                    const file = files[0];
                    this.presenter.insertImageClick(file);
                }
            });
    }

    getContent() {
        return nodeToJson(this.editor.getElement());
    }

    publishClick() {
        this.presenter.publishClick();
    }

    onReady(editor) {
        this.editor = editor;
    }

    render() {
        const object = this.state.object;
        return (
            <>
                <NavBar
                    className="shadow-sm"
                    onToggle={() => this.navigateBack()}
                    titleClick={() => this.navigateBack()}
                    icon="bi bi-chevron-left fs-5"
                    title={object.content ? "Edit Post" : "Create Post"}>
                    <button
                        className="btn btn-primary fs-sm me-2"
                        onClick={this.publishClick.bind(this)}>
                        {
                            object.content ? 'SAVE' : 'PUBLISH'
                        }
                    </button>
                </NavBar>
                <div className="container bg-white h-100">
                    <ContentEditor
                        onReady={this.onReady.bind(this)}
                        className="mt-3 overflow-auto mx-lg-2"
                        style={{height: 'calc(100vh - 7.72em)'}}>
                        {
                            !object.content &&
                            <h2 className="fw-bold" data-placeholder="Title here" aria-hidden="true"></h2>
                        }
                        {
                            !object.content && <p data-placeholder="Start typing..."></p>
                        }
                        {
                            object.content && object.content.map(createElement)
                        }
                    </ContentEditor>
                </div>
                <div className="mt-auto bg-light">
                    {
                        commands.map(item => {
                            const {icon, command, value} = item;
                            return (
                                <button
                                    key={command}
                                    className="btn btn-link btn-sm fs-4 text-dark"
                                    onClick={this.executeCommand.bind(this, command, value)}>
                                    <i className={icon}></i>
                                </button>
                            )
                        })
                    }
                    <button className="btn btn-link btn-sm fs-4 text-dark"
                            onClick={this.insertImageClick.bind(this)}>
                        <i className='bi bi-image'></i>
                    </button>
                </div>
            </>
        )
    }
}

export default withContext(PostFormPage);
