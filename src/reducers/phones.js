const INITIAL_STATE = {
    phonesJSON: [],
    isBarPagesVisible: true,
    activePage: 1
}

/////REDUCER WITH HIS ACTIONS/////
const phones = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'NEW_PHONES_JSON':
            return {
                ...state,
                phonesJSON: action.payload.phonesJSON,
            }
        case 'NEW_IS_BAR_PAGES_VISIBLE':
            return {
                ...state,
                isBarPagesVisible: action.payload.isBarPagesVisible,
            }
        case 'NEW_ACTIVE_PAGE':
            return {
                ...state,
                activePage: action.payload.activePage,
            }

        default:
            return state;
    }
}

export default phones;