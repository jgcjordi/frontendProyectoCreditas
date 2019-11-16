
class SaveOnBrowserStorageService {

    SaveUserOnBrowserStorage(dataUser) {
        sessionStorage.setItem('User', JSON.stringify(dataUser));
    }

    SaveTokenOnBrowserStorage(token) {
        sessionStorage.setItem('Token', token);
    }

    DeleteDataLogin(){
        localStorage.removeItem('User');
        localStorage.removeItem('Token');
    }
}

export default new SaveOnBrowserStorageService();
