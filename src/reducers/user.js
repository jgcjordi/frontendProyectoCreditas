const INITIAL_STATE = {
    showLoginBox: false,
    isLogged: false,
    rememberMe: false,
    user: [],
    lastPurchaseRedirect: false,
    isNewPurchase: false,
}

/////REDUCER WITH HIS ACTIONS/////
const user = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'NEW_SHOW_LOGIN_BOX':
            return {
                ...state,
                showLoginBox: action.payload.showLoginBox,
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
        case 'NEW_LAST_PURCHASE_REDIRECT':
            return {
                ...state,
                lastPurchaseRedirect: action.payload.lastPurchaseRedirect,
            }
        case 'NEW_IS_NEW_PURCHASE':
            return {
                ...state,
                isNewPurchase: action.payload.isNewPurchase,
            }

        default:
            return state;
    }
}

export default user;