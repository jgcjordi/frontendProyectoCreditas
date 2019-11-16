
class BrowserStorageService {

    saveUserOnBrowserStorage(dataUser, rememberMe) {
        if (rememberMe) {
            localStorage.setItem('User', JSON.stringify(dataUser));
        } else {
            sessionStorage.setItem('User', JSON.stringify(dataUser));
        }
    }

    saveTokenOnBrowserStorage(token, rememberMe) {
        if (rememberMe) {
            localStorage.setItem('Token', token);
        } else {
            sessionStorage.setItem('Token', token);
        }
    }

    deleteDataLogin(rememberMe) {
        if (rememberMe) {
            localStorage.removeItem('User');
            localStorage.removeItem('Token');
        } else {
            sessionStorage.removeItem('User');
            sessionStorage.removeItem('Token');
        }
    }

    getToken(rememberMe) {
        if (rememberMe) {
            return localStorage.getItem('Token')
        } else {
            return sessionStorage.getItem('Token')
        }
    }

    getUser(rememberMe) {
        if (rememberMe) {
            return  JSON.parse(localStorage.getItem('User'))
        } else {
            return JSON.parse(sessionStorage.getItem('User'))
        }
    }

    ifExistTokenOnLocalStorage() {
        return localStorage.getItem('Token') === null ? false : true
    }
}

export default new BrowserStorageService();
