import axios from 'axios';

class ApiPhoneService {

  constructor() {
    this.BASE_URL_PHONE = 'http://localhost:8080/api/v1/phone';
    this.BASE_URL_USER = 'http://localhost:8080/api/v1/user';
  }

  async getAllPhones() {//I'm not using this method
    const { data } = await axios.get(
      `${this.BASE_URL_PHONE}/all`,
    );
    return data;
  }

  async getAllPhonesPaged(page) {
    const { data } = await axios.get(
      `${this.BASE_URL_PHONE}/allPaginated/${page}`,
    );
    return data;
  }

  async getPhoneById(id) {
    const { data } = await axios.get(
      `${this.BASE_URL_PHONE}/${id}`,
    );
    return data;
  }

  async getPhonesFilteredByKeywords(keywords) {
    const { data } = await axios.get(
      `${this.BASE_URL_PHONE}/phones?search=${keywords}`,
    );
    return data;
  }

  async tryLogIn(email, password) {
    let status
    let userData
    await axios.post(
      `${this.BASE_URL_USER}/login`, {
      email: `${email}`,
      password: `${password}`
    }
    ).then(response => {
      if (response.status === 200) {
        status = true
        userData = response.data
      }
    }).catch(response => {status = false});
    if (status) { return userData }
    else { return false }
  }

  async tryNewRegistry(email, password, name) {
    let status
    let userData
    await axios.post(
      `${this.BASE_URL_USER}/singIn`, {
      email: `${email}`,
      password: `${password}`,
      name: `${name}`
    }
    ).then(response => {
      if (response.status === 200) {
        status = true
        userData = response.data
      }
    }).catch(response => {status = false});
    if (status) { return userData }
    else { return false }
  }

  async purchasePhone(idUser, idPhone, idVersion, idColor, token) {
    let status = false
    let userData
    const options = {
      headers: { 'Authorization': `${token}` }
    };
    await axios.post(
      `${this.BASE_URL_USER}/logged/purchase`, {
      id_user: `${idUser}`,
      idLastPhonePurchased: `${idPhone}`,
      idLastPhonePurchasedVersion: `${idVersion}`,
      idLastPhonePurchasedColor: `${idColor}`
    }, options
    ).then(response => {
      if (response.status === 200) {
        status = true
        userData = response.data
      }
    }).catch(error => {
      //console.log(error)
    });
    if (status) { return userData }
    else { return false }
  }

  async isValidToken(token) {
    let status = false
    const options = {
      headers: { 'Authorization': `${token}` }
    };
    await axios.get(
      `${this.BASE_URL_USER}/logged/validToken`, options
    ).then(response => {
      if (response.status === 200) {
        status = true
      }
    }).catch(error => {
      //console.log(error)
    });
    return status
  }

}

export default new ApiPhoneService();

