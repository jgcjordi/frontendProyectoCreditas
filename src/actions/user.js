export const newShowLoginBox =
    (showLoginBox) => ({
        type: 'NEW_SHOW_LOGIN_BOX',
        payload: {
            showLoginBox,
        }
    })

export const newEmail =
    (email) => ({
        type: 'NEW_EMAIL',
        payload: {
            email,
        }
    })

export const newName =
    (name) => ({
        type: 'NEW_NAME',
        payload: {
            name,
        }
    })


export const newPassword =
    (password) => ({
        type: 'NEW_PASSWORD',
        payload: {
            password,
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