import axios from 'axios'
const users_url = import.meta.env.VITE_USER_BACKEND_URL || 'http://localhost:3000/users';
import toast from 'react-hot-toast'


export const toastSuccess = (msg) => {
    toast.success(`User successfully ${msg}`, {
        duration: 2000,
        position: 'top-right',
        iconTheme: {
            primary: 'rgb(16, 211, 16)',
            secondary: '#fff',
        },
    style: {
        padding: "1rem"
    }});
}

export const toastError = (msg) => {
    toast.error(`${msg}`, {
        duration: 2000,
        position: 'top-right',
        iconTheme: {
            primary: 'rgb(248, 63, 63)',
            secondary: '#fff',
        },
    style: {
        padding: "1rem"
    }})
}

export const login = async (user) => {
    try {
        const res = await axios.post(`${users_url}/login`,user);
        return res.data;
    } catch(err) {
        throw err;
    }
}

export const signUp = async (user) => {
    const userObj = {name: user.name,email: user.email,password: user.password};
    try {
        const res = await axios.post(`${users_url}/register`,userObj);
        console.log(res.data);
        return res.data;
    } catch(err) {
        throw err;
    }
}