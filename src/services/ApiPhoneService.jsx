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
}

export default new ApiPhoneService();
