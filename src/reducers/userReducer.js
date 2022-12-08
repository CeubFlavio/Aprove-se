const INITIAL_STATE = {
    plan: '',
    token: '',
    favoriteQuestions: [],
    wrongQuestions: [],
    correctQuestions: [],
    hours: 0,
    minutes: 0,
    seconds: 0,
    questionsSolved: 0,
    exceptionCategory: [],
};

export default (state = INITIAL_STATE, {type, payload}) =>{
    switch(type){
        case "SET_TOKEN":
            state.token = payload.token;
            break;
        case "SET_PLAN":
            state.plan = payload.plan;
            break;
        case "SET_HOURS":
            state.hours = payload.hours;
            break;
        case "SET_MINUTES":
            state.minutes = payload.minutes;
            break;
        case "SET_SECONDS":
            state.seconds = payload.seconds;
            break;
        case "COUNT_QUESTION_SOLVED":
            state.questionsSolved++;
            break;
        case "SET_WRONG_QUESTION":
            state.wrongQuestions.push(payload.questionData);
            break;
        case "SET_CORRECT_QUESTION":
            state.correctQuestions.push(payload.questionData);
            break;
        case "SET_CATEGORY_EXCEPTION":
            state.exceptionCategory.push(payload.categoryId);
            break;
        case "REMOVE_CATEGORY_EXCEPTION":
            let categoryDeleteId = state.exceptionCategory.findIndex(categoryId => categoryId == payload.categoryId);
            state.exceptionCategory.splice(categoryDeleteId, 1);
            break;
        case "CLEAR_QUESTIONS":
            state.correctQuestions = [];
            state.wrongQuestions = [];
            state.questionsSolved = 0;
            break;
        case "SET_FAVORITE_QUESTION":
            state.favoriteQuestions.push(payload.questionData);
            break;
        case "REMOVE_FAVORITE_QUESTION":
            console.log("REMOVER");
            state.favoriteQuestions.splice(payload.id, 1);
            break;
        case "CLEAR_USER":
            state = INITIAL_STATE;
            break;
    }

    return {...state};
}