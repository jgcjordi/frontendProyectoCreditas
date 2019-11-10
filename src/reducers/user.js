const INITIAL_STATE = {
    showLoginBox: false,
    isLogged: false,
    rememberMe: false,
    emailTextBox: "",
    passwordTextBox: "",
    nameTextBox: "",
    user: []
}

/////REDUCER WITH HIS ACTIONS/////
const user = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'NEW_SHOW_LOGIN_BOX':
            return {
                ...state,
                showLoginBox: action.payload.showLoginBox,
            }
        case 'NEW_EMAIL_TEXT_BOX':
            return {
                ...state,
                emailTextBox: action.payload.emailTextBox,
            }
        case 'NEW_NAME_TEXT_BOX':
            return {
                ...state,
                nameTextBox: action.payload.nameTextBox,
            }
        case 'NEW_PASSWORD_TEXT_BOX':
            return {
                ...state,
                passwordTextBox: action.payload.passwordTextBox,
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
        case 'NEW_USER':
            return {
                ...state,
                user: action.payload.user,
            }

        default:
            return state;
    }
}

export default user;