import axios from 'axios'
const users_url = import.meta.env.USER || 'http://localhost:3000/users';


export const login = async (user) => {
    try {
        const res = await axios.post(`${users_url}/login`,user);
        return res.data;
    } catch(err) {
        console.log(err);
    }
}

export const register = async (user) => {
    try {
        const res = await axios.post(`${users_url}/register`,user);
        return res.data;
    } catch(err) {
        console.log(err);
    }
}