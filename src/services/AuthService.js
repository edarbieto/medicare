import axios from "axios";

const API_URL = "http://3.230.230.245:5000/api/auth";

class AuthService {
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      return null;
    }
  }
  logout() {
    localStorage.removeItem("user");
  }
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  isTokenValid() {
    return parseInt(Date.now() / 1000) + 60 < this.getUser()?.user.exp;
  }
  header() {
    const user = this.getUser();
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    } else {
      return {};
    }
  }
}

export default new AuthService();
