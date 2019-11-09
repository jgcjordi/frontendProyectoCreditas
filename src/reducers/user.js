const INITIAL_STATE = {
    showLoginBox: false,
    isLogged: false,
    rememberMe: false,
    email: "",
    password: "",
    name: ""
}

/////REDUCER WITH HIS ACTIONS/////
const user = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'NEW_SHOW_LOGIN_BOX':
            return {
                ...state,
                showLoginBox: action.payload.showLoginBox,
            }
        case 'NEW_EMAIL':
            return {
                ...state,
                email: action.payload.email,
            }
        case 'NEW_NAME':
            return {
                ...state,
                name: action.payload.name,
            }
        case 'NEW_PASSWORD':
            return {
                ...state,
                password: action.payload.password,
            }
        case 'NEW_REMEMBER_ME':
            return {
                ...state,
                rememberMe: action.payload.rememberMe,
            }
        case 'NEW_IS_LOGGED':
            return {
                ...state,
                isLogged: action.payload.isLogged,
            }

        default:
            return state;
    }
}

export default user;