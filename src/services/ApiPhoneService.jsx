import axios from 'axios';

class ApiPhoneService {

  async getAllPhones() {
    const { data } = await axios.get(
      `http://localhost:8080/phones/all`,
    );
    return data;
  }

  async getPhoneById(id) {
    const { data } = await axios.get(
        `http://localhost:8080/phone/${id}`,
    );
    return data;
  }
}

export default new ApiPhoneService();
