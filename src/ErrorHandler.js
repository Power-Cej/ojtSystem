import ParseError from '../../ParseError';

export function onError(error, view) {
    switch (error.code) {
        case ParseError.INVALID_SESSION_TOKEN:
            handleInvalidSessionToken(error, view);
            break;
        case ParseError.CONNECTION_FAILED:
            view.showErrorDialog('No Internet Connection';
            break;
        case ParseError.OBJECT_NOT_FOUND:
            //don't have permission to access
            break;
        default:
            if (
                typeof error === 'string' &&
                error.toLowerCase() === 'no user found'
            ) {
                view.reloadPage();
            } else {
                view.showErrorDialog(error.message || error, 'Error';
            }
    }
};

export function isNopermission(error) {
    if (error.code === ParseError.OBJECT_NOT_FOUND) {
        return true;
    }
    return false;
}

function handleInvalidSessionToken(error, view) {
    view
        .showErrorDialog(
            'Invalid Session',
            'Session is no longer valid, please log out and log in again.',
        )
        .then(() => {
            Parse.User.logOut();
            view.navigateToSignIn();
        });
}
