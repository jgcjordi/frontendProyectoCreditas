export const newPhonesJSON =
    (phonesJSON) => ({
        type: 'NEW_PHONES_JSON',
        payload: {
            phonesJSON,
        }
    })

export const newIsBarPagesVisible =
    (isBarPagesVisible) => ({
        type: 'NEW_IS_BAR_PAGES_VISIBLE',
        payload: {
            isBarPagesVisible,
        }
    })

export const newActivePage =
    (activePage) => ({
        type: 'NEW_ACTIVE_PAGE',
        payload: {
            activePage,
        }
    })