const setValueInLocal = (key,token,expiry) => {
    const item = {token,expiry};
    localStorage.setItem(key,JSON.stringify(item));
}

export default setValueInLocal