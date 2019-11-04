export const newPhonesJSON =
    (phonesJSON) => ({
        type: 'NEW_PHONES_JSON',
        payload: {
            phonesJSON,
        }
    })