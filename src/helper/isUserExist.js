export async function isUserNameAlreadyExist(userName) {
    try {
        return await User.findOne({ userName });
    } catch (error) {
        throw new Error("Server failed to findout user by userName");
    }
}

export async function isEmailAlreadyExist(email) {
    try {
        return await User.findOne({ email });
    } catch (error) {
        throw new Error("Server failed to findout user by email");
    }
}

