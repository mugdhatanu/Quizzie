import axios from 'axios'
const quiz_url = import.meta.env.VITE_QUIZ_BACKEND_URL

const options = {
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWE5MTQ4OGQ3YzM2MWI2YzI3NzBhMDkiLCJpYXQiOjE3MDU4NDk1NzZ9.hODiahwsobUngQi9ldfm7APLcp-Lqz0v8B08gzRSKrw"
    }
}

export const getQuizzes = async() => {
    try {
        const res = await axios.get(quiz_url,options);
        return res.data;
    } catch(err) {
        console.log(err);
    }
}

export const addNewQuiz = async(quiz) => {
    const {quizType} = quiz;
    if(quizType === "Poll") quiz.timer = "OFF";
    try {
        const res = await axios.post(`${quiz_url}/create`,quiz,options);
        console.log(res.data);
    } catch(err) {
        console.log(err);
    }
}

export const editQuiz = async(quiz) => {
    try {
        const res = await axios.patch(`${quiz_url}/create`,quiz,options);
        console.log(res.data);
    } catch(err) {
        console.log(err);
    }
}

export const deleteQuiz = async(quizId) => {
    try {
        const res = await axios.delete(`${quiz_url}/${quizId}`,options);
        console.log(res.data);
    } catch(err) {
        console.log(err);
    }
}

export const getQuizDetails = async (quizId) => {
    try {
        const res = await axios.get(`${quiz_url}/${quizId}`,options);
        return res.data;
    } catch(err) {
        console.log(err);
    }
}