const getValueFromLocal = () => {
    const str = localStorage.getItem("token");
    if(str) {
        const item = JSON.parse(str);
        const {token,expiry} = item;
        if(new Date() > new Date(expiry)) {
            localStorage.removeItem("token");
            return null
        } else {
            return token;
        }
    } else {
        return null
    }
}

export default getValueFromLocal