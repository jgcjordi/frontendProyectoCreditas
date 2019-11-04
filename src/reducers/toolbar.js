const INITIAL_STATE = {
    isBackButton: true,
    isSearchTextBox: true,
    phoneSearchText: ""
}

/////REDUCER WITH HIS ACTIONS/////
const toolbar = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'NEW_IS_BACK_BUTTON':
            return {
                ...state,
                isBackButton: action.payload.isBackButton,
            }

        case 'NEW_IS_SEARCH_TEXT_BOX':
            return {
                ...state,
                isSearchTextBox: action.payload.isSearchTextBox,
            }

        case 'NEW_PHONE_SEARCH_TEXT':
            return {
                ...state,
                phoneSearchText: action.payload.phoneSearchText,
            }

        default:
            return state;
    }
}

export default toolbar;