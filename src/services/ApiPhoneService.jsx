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
    await axios.get(
      `http://localhost:8080/api/v1/user/${email}/${password}`,
    ).then(response => {
      if (response.status === 200){
        status = true
        userData = response.data
      }
    });
    if(status){return userData}
    else{return false}
  }

}

export default new ApiPhoneService();
