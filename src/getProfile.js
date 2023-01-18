import generateProfile from "./generateProfile";

function getProfile(user) {
    return user.profile || generateProfile(user.username);
}

export default getProfile;
