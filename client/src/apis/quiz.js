import axios from 'axios'
import getValueFromLocal from '../utils/localStorage/getValueFromLocal';
const quiz_url = import.meta.env.VITE_QUIZ_BACKEND_URL || 'http://localhost:3000/quizzes'



export const getQuizzes = async() => {
    const options = {
        headers: {
            Authorization: "Bearer " + getValueFromLocal()
        }
    }

    try {
        const res = await axios.get(quiz_url,options);
        return res.data;
    } catch(err) {
        console.log(err);
    }
}

export const addNewQuiz = async(quiz) => {
    const options = {
        headers: {
            Authorization: "Bearer " + getValueFromLocal()
        }
    }

    const {quizType} = quiz;
    if(quizType === "Poll") quiz.timer = "OFF";
    try {
        const res = await axios.post(`${quiz_url}/create`,quiz,options);
        return res.data;
    } catch(err) {
        console.log(err);
    }
}

export const updateQuiz = async(quiz_id,questions) => {
    const options = {
        headers: {
            Authorization: "Bearer " + getValueFromLocal()
        }
    }
    try {
        const res = await axios.patch(`${quiz_url}/edit`,{quiz_id,updatedData:questions},options);
        console.log(res.data);
    } catch(err) {
        console.log(err);
    }
}

export const deleteQuiz = async(quizId) => {
    const options = {
        headers: {
            Authorization: "Bearer " + getValueFromLocal()
        }
    }
    try {
        const res = await axios.delete(`${quiz_url}/${quizId}`,options);
        console.log(res.data);
    } catch(err) {
        console.log(err);
    }
}

export const getQuizDetails = async (quizId) => {
    const options = {
        headers: {
            Authorization: "Bearer " + getValueFromLocal()
        }
    }
    try {
        const res = await axios.get(`${quiz_url}/${quizId}`,options);
        return res.data;
    } catch(err) {
        console.log(err);
    }
}

export const updateImpressions = async(quizId) => {
    const options = {
        headers: {
            Authorization: "Bearer " + getValueFromLocal()
        }
    }
    try {
        const res = await axios.patch(`${quiz_url}/${quizId}/impressions`,{},options);
        return res.data;
    } catch(err) {
        console.log(err);
    }
}

export const getDetails = async() => {
    const options = {
        headers: {
            Authorization: "Bearer " + getValueFromLocal()
        }
    }
    try {
        const res = await axios.get(`${quiz_url}/details`,options);
        return res.data;
    } catch(err) {
        throw Error(err);
    }
}

export const selectAnswers = async(quizId,data) => {
    try{
        const res = await axios.patch(`${quiz_url}/answer/${quizId}`,{questionAnalysis: data});
        console.log(res.data);
    } catch(err) {
        console.log(err);
    }
}

