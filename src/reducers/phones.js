const INITIAL_STATE = {
    phonesJSON: []
}

/////REDUCER WITH HIS ACTIONS/////
const phones = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'NEW_PHONES_JSON':
            return {
                ...state,
                phonesJSON: action.payload.phonesJSON,
            }

        default:
            return state;
    }
}

export default phones;