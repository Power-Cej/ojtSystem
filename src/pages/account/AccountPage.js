import React from 'react';
import BasePage from "../../base/BasePage";
import NavBar from "../../components/NavBar";
import generateProfile from "../../generateProfile";
import ImageCropper from "../../components/ImageCropper";
import dialog from "../../components/Modal/dialog";
import AccountPresenter from "./AccountPresenter";
import browseFile from "../../browseFile";
import canvasToBlob from "../../canvasToBlob";
import {saveFileUseCase} from "../../domain/file/usecases";
import {findObjectUseCase, saveObjectUseCase, updateObjectUseCase} from "../../domain/object";
import InputBio from "./InputBio";
import InputInfo from "./InputInfo";
import social from "./social.json";
import contact from "./contact.json";
import basic from "./basic.json";
import password from "./password.json";
import InputForm from "./InputForm";
import PasswordForm from "./PasswordForm";
import getProfile from "../../getProfile";

class AccountPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {user: undefined, profile: undefined, information: {}};
        this.imageCropper = React.createRef();
        this.presenter = new AccountPresenter(this,
            findObjectUseCase(),
            saveFileUseCase(),
            saveObjectUseCase(),
            updateObjectUseCase(),
            updateObjectUseCase());

    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    formSubmit(e) {
        e.preventDefault();
    }

    changeProfileClick() {
        browseFile('image/*')
            .then(files => {
                if (files.length > 0) {
                    const file = files[0];
                    this.presenter.changeProfileClick(file);
                }
            });
    }

    setProfile(profile) {
        this.setState({profile});
    }

    showImageCropper(file) {
        dialog.fire({
            html: (
                <ImageCropper
                    ref={this.imageCropper}
                    className="w-100"
                    src={file}
                    width={500}
                    height={500}
                    border={50}
                    borderRadius={250}
                />
            ),
            positiveButton: 'SAVE',
            onPositiveClick: () => {
                const cropper = this.imageCropper.current;
                const canvas = cropper.getCrop();
                const dataUrl = canvas.toDataURL();
                this.setState({profile: dataUrl});
                canvasToBlob(canvas, file.name)
                    .then(blob => this.presenter.onCrop(blob));
            },
        });
    }

    saveUserClick() {
        this.presenter.saveUserClick();
    }

    savePasswordClick() {
        this.presenter.savePasswordClick();
    }

    saveInformationClick() {
        this.presenter.saveInformationClick();
    }

    setUser(user) {
        this.setState({user});
    }

    getUser() {
        return this.state.user;
    }

    getInformation() {
        return this.state.information;
    }

    setInformation(information) {
        this.setState({information});
    }

    render() {
        const user = this.state.user;
        if (!user) return null;
        const name = user.name || user.username;
        const profile = getProfile(user);
        return (
            <>
                <NavBar className="shadow-sm"/>
                <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="bg-white p-3 shadow-sm">
                                <div className="position-relative">
                                    <button
                                        onClick={this.changeProfileClick.bind(this)}
                                        className="btn btn-light bg-white btn-sm text-muted rounded-circle position-absolute shadow-sm"
                                        style={{left: '50%', transform: 'translate(100%, 200%)'}}>
                                        <i className="bi bi-camera"></i>
                                    </button>
                                </div>
                                <div className="text-center">
                                    <img
                                        alt="profile"
                                        className="img-fluid rounded-circle img-thumbnail m-2"
                                        src={profile} width="100" height="100"/>
                                    <p className="m-0 fs-sm fw-bold">{name}</p>
                                </div>
                                <hr/>
                            </div>
                            <div className="mt-3 mt-md-0">
                                <div className="bg-white p-3 shadow-sm">
                                    <span className="text-muted fs-sm">User Information</span>
                                    <ul className="list-group list-group-flush">
                                        <InputInfo
                                            icon="bi bi-card-checklist"
                                            field="name"
                                            object={user}
                                            label={"Full Name: "}
                                            placeholder="fist-name last-name"
                                            onSave={this.saveUserClick.bind(this)}
                                        />
                                        <InputInfo
                                            icon="bi bi-envelope"
                                            field="email"
                                            object={user}
                                            label={"Email: "}
                                            onSave={this.saveUserClick.bind(this)}
                                        />
                                        <PasswordForm
                                            fields={password}
                                            object={user}
                                            onSave={this.savePasswordClick.bind(this)}
                                        />
                                        <InputInfo
                                            type="Date"
                                            icon="bi bi-link-45deg"
                                            field="createdAt"
                                            object={user}
                                            label="Joined: "
                                            edit={false}
                                            onSave={this.saveUserClick.bind(this)}
                                        />

                                        <InputInfo
                                            icon="bi bi-link-45deg"
                                            field="id"
                                            object={user}
                                            label="ID: "
                                            edit={false}
                                            onSave={this.saveUserClick.bind(this)}
                                        />
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default AccountPage;
