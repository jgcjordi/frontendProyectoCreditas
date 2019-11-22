export const newShowLoginBox =
    (showLoginBox) => ({
        type: 'NEW_SHOW_LOGIN_BOX',
        payload: {
            showLoginBox,
        }
    })

export const newRememberMe =
    (rememberMe) => ({
        type: 'NEW_REMEMBER_ME',
        payload: {
            rememberMe,
        }
    })

export const newIsLogged =
    (isLogged) => ({
        type: 'NEW_IS_LOGGED',
        payload: {
            isLogged,
        }
    })

export const newUser =
    (user) => ({
        type: 'NEW_USER',
        payload: {
            user,
        }
    })

export const newLastPurchaseRedirect =
    (lastPurchaseRedirect) => ({
        type: 'NEW_LAST_PURCHASE_REDIRECT',
        payload: {
            lastPurchaseRedirect,
        }
    })

export const newIsNewPurchase =
    (isNewPurchase) => ({
        type: 'NEW_IS_NEW_PURCHASE',
        payload: {
            isNewPurchase,
        }
    })