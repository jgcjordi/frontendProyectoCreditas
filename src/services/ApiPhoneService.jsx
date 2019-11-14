import axios from 'axios';

class ApiPhoneService {

  async getAllPhones() {
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/phone/all`,
    );
    return data;
  }

  async getPhoneById(id) {
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/phone/${id}`,
    );
    return data;
  }

  async getPhonesFilteredByKeywords(keywords) {
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/phone/phones?search=${keywords}`,
    );
    return data;
  }
  
  async tryLogIn(email, password) {
    let status = false
    let userData
    await axios.post(
      `http://localhost:8080/api/v1/user/login`,{
        email: `${email}`,
        password: `${password}`
      }
    ).then(response => {
      if (response.status === 200){
        status = true
        userData = response.data
      }
    });
    if(status){return userData}
    else{return false}
  }

  async purchasePhone(idUser, idPhone, idVersion, idColor, token) {
    let status = false
    let userData
    const options = {
      headers: {'Authorization': `${token}`}
    };
    await axios.post(
      `http://localhost:8080/api/v1/user/logged/purchase`,{
        id_user: `${idUser}`,
        idLastPhonePurchased: `${idPhone}`,
        idLastPhonePurchasedVersion: `${idVersion}`,
        idLastPhonePurchasedColor: `${idColor}`
      },options
    ).then(response => {
      if (response.status === 200){
        status = true
        userData = response.data
      }
    }).catch(error => {
      //console.log(error)
    });
    if(status){return userData}
    else{return false}
  }

}

export default new ApiPhoneService();
