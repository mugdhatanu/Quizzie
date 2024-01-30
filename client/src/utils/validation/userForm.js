export const loginCheck = (user) => {
    const {email,password} = user;
    if(!email || !password) {
        return false;
    }
    return true
}

export const registerCheck = (user) => {
    const {name,email,password,confirmPass} = user;
    if(!name || !email || !password || !confirmPass) {
        return false;
    }
    if(password !== confirmPass) {
        return false;
    }
    return true;
}