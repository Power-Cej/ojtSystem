import React from 'react';
import resolvingPromise from "../resolvingPromise";
import Context from "../AppContext";
import getSchemaByClass from "../getSchemaByClass";
import dialog from "../components/Modal/dialog";
import ProgressDialog from "./ProgressDialog";
import ConfirmDialog from "./ConfirmDialog";

/**
 * responsible for global function use for all components
 */

class BasePage extends React.Component {

    showProgress() {
        this.setState({progress: true});
    }

    hideProgress() {
        this.setState({progress: false});
    }

    showProgressDialog() {
        const promise = resolvingPromise();
        dialog.fire({
                html: (
                    <ProgressDialog/>
                ),
                footer: false,
            }
        );
        return promise;
    }

    hideProgressDialog() {
        dialog.close();
    }

    showError(error, title) {
        if (error instanceof Object) {
            return this.showError(error.message, title);
        }
        if (typeof error === 'string') {
            const options = {
                title: title || "Error",
                message: error,
                icon: 'bi bi-x-circle',
                type: 'danger',
                positiveButton: 'OKAY',
                negativeButton: false,
            };
            return this.showDialog(options)
        }
    }

    showSuccess(message, title) {
        const options = {
            title: title || "Success",
            message: message,
            icon: 'bi bi-check-circle',
            type: 'success',
            positiveButton: 'OKAY',
            negativeButton: false,
        };
        return this.showDialog(options);
    }

    showDialog({title, message, icon, type, ...options}) {
        const promise = resolvingPromise();
        dialog.fire({
                html: (
                    <ConfirmDialog
                        icon={icon}
                        title={title}
                        message={message}
                        type={type}/>
                ),
                onPositiveClick: () => {
                    promise.resolve();
                },
                onNegativeClick: () => {
                    promise.reject();
                },
                ...options
            }
        );
        return promise;
    }

    showSuccessSnackbar(message) {
        // return showSuccessDialog(message, true);
    }

    getSchemas() {
        return this.context.schemas;
    }

    getSchema(className) {
        const schemas = this.getSchemas();
        return getSchemaByClass(schemas, className);
    }

    setSchemas(schemas) {
        this.context.setGlobalState({schemas});
    }

    getCurrentUser() {
        return this.context.user;
    }

    setCurrentUser(user) {
        this.context.setGlobalState({user});
    }

    getSubscription() {
        return this.context.subscription;
    }

    setSubscription(subscription) {
        this.context.setGlobalState({subscription});
    }

    setStatePromise(object) {
        const promise = resolvingPromise();
        this.setState(object, promise.resolve);
        return promise
    }

    navigateTo(url, argument) {
        const params = new URLSearchParams(argument).toString();
        const navigate = this.props.navigate;
        if (navigate) {
            navigate(url);
        } else {
            document.location.href = url;
        }
    }

    navigateBack() {
        this.navigateTo(-1);
    }

    navigateToClass(className) {
        this.navigateTo('/class/' + className);
    }

    getParams() {
        return this.props.location.state;
    }

    reload() {
        window.location.reload();
    }
}

BasePage.contextType = Context;
export default BasePage;
