import axios from "axios";
import AuthService from "./AuthService";

const API_URL = "http://3.230.230.245:5000/api";

class DataService {
  async getClinicas(page = 1, filter = "") {
    try {
      const response = await axios.get(
        `${API_URL}/clinics?page=${page}&pageSize=10&filter=${filter}`,
        { headers: AuthService.header() }
      );
      return response.data.data;
    } catch (error) {
      return null;
    }
  }
}

export default new DataService();
