const qna = (question,user_answer) => {
    const {answer,options} = question;
    question.totalAttempts++;
    if(user_answer === answer) {
        question.correctAttempts++;
    } else {
        question.incorrectAttempts++;
    }
    const option = options.find(option => option.value === user_answer);
    option.timesSelected++;
}

const poll = (question, answer) => {
    const {options} = question;
    for(const option of options) {
        if(option.value === answer) {
            option.timesSelected++;
        }
    }
    question.totalAttempts++;
}

module.exports = {qna,poll}