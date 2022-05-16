import GetCurrentUserUseCase from './GetCurrentUserUseCase';
import SignUpUseCase from './SignUpUseCase';
import SignInUseCase from './SignInUseCase';
import SignOutUseCase from './SignOutUseCase';
import repository from '../../data/user';
import UpdateUserUseCase from "./UpdateUserUseCase";
import ResetPasswordUseCase from "./ResetPasswordUseCase";
import getRestController from '../../controllers/rest';
const restController = getRestController();

export function getCurrentUserUseCase() {
    return new GetCurrentUserUseCase(restController);
}

export function signUpUseCase() {
    return new SignUpUseCase(repository);
}

export function signInUseCase() {
    return new SignInUseCase(repository);
}

export function signOutUseCase() {
    return new SignOutUseCase(repository);
}

export function updateUserUseCase() {
    return new UpdateUserUseCase(repository);
}

export function resetPasswordUseCase() {
    return new ResetPasswordUseCase(repository);
}

