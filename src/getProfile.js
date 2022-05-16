import generateProfile from "./generateProfile";

function getProfile(user) {
    return user.profile || generateProfile(user.name);
}

export default getProfile;
