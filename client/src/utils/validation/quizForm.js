export const checkQuizNamAndType = (quiz) => {
    const {name,quizType} = quiz;
    if(!name || !quizType) {
        return false
    }
    return true;
}


export const checkDetails = (quiz) => {
    const {optionsType,questions,quizType,timer} = quiz;
    if(!optionsType) {
        return false;
    }
    if(quizType !== "Poll" && !timer) {
        return false;
    }
    for(const question of questions) {
        if(!question.questionName) {
            return false
        }
        if(quizType !== "Poll") {
            const {answer} = question
            if(optionsType === "Text-Image") {
                if(!answer.text || !answer.url) {
                    return false;
                }
            } else {
                if(!answer.text) {
                    return false;
                }
            }
        }
        const {options} = question;
        if(optionsType === "Text-Image") {
            for(const option of options) {
                if(!option.value.text || !option.value.url) {
                    return false;
                }
            }
        } else {
            for(const option of options) {
                if(!option.value.text) {
                    return false;
                }
            }
        }
    }
    return true;
}

export const checkIdentical = (quiz) => {
    const {optionsType,questions} = quiz;
    
    for(const question of questions) {
        const {options} = question;
        if(optionsType === "Text-Image") {
            console.log('here');
            let duplicates = options.some((obj, index) => {
                return options.findIndex(t => (t.value.text === obj.value.text && t.value.url === obj.value.url)) !== index;
            });
            if(duplicates) {
                return false;
            }
        } else {
            let duplicates = options.some((obj, index) => {
                return options.findIndex(t => (t.value.text === obj.value.text)) !== index;
            });
            if(duplicates) {
                return false;
            }
        }
    }
    return true;
}