export const newShowLoginBox =
    (showLoginBox) => ({
        type: 'NEW_SHOW_LOGIN_BOX',
        payload: {
            showLoginBox,
        }
    })

export const newEmailTextBox =
    (emailTextBox) => ({
        type: 'NEW_EMAIL_TEXT_BOX',
        payload: {
            emailTextBox,
        }
    })

export const newNameTextBox =
    (nameTextBox) => ({
        type: 'NEW_NAME_TEXT_BOX',
        payload: {
            nameTextBox,
        }
    })


export const newPasswordTextBox =
    (passwordTextBox) => ({
        type: 'NEW_PASSWORD_TEXT_BOX',
        payload: {
            passwordTextBox,
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