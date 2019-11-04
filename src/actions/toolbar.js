export const newIsBackButton =
    (isBackButton) => ({
        type: 'NEW_IS_BACK_BUTTON',
        payload: {
            isBackButton,
        }
    })

export const newIsSearchTextBox =
    (isSearchTextBox) => ({
        type: 'NEW_IS_SEARCH_TEXT_BOX',
        payload: {
            isSearchTextBox,
        }
    })

export const newPhoneSearchText =
    (phoneSearchText) => ({
        type: 'NEW_PHONE_SEARCH_TEXT',
        payload: {
            phoneSearchText,
        }
    })