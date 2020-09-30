import axios from "axios";
import AuthService from "./AuthService";

const API_URL = "http://3.230.230.245:5000/api";

class DataService {
  async getClinicas(page = 1, pageSize = 10, filter = "") {
    try {
      const response = await axios.get(
        `${API_URL}/clinics?page=${page}&pageSize=${pageSize}&filter=${filter}&status=ACTIVE`,
        { headers: AuthService.header() }
      );
      return response.data.data;
    } catch (error) {
      return null;
    }
  }

  async getDepartamentos() {
    try {
      const response = await axios.get(`${API_URL}/addresses/departments`, {
        headers: AuthService.header(),
      });
      return response.data.data;
    } catch (error) {
      return null;
    }
  }

  async getProvincias(idDepartamento) {
    try {
      const response = await axios.get(
        `${API_URL}/addresses/provinces?departmentID=${
          idDepartamento ? idDepartamento : -1
        }`,
        {
          headers: AuthService.header(),
        }
      );
      return response.data.data;
    } catch (error) {
      return null;
    }
  }

  async getDistritos(idProvincia) {
    try {
      const response = await axios.get(
        `${API_URL}/addresses/districts?provinceID=${
          idProvincia ? idProvincia : -1
        }`,
        {
          headers: AuthService.header(),
        }
      );
      return response.data.data;
    } catch (error) {
      return null;
    }
  }

  async postClinica(clinica) {
    try {
      const response = await axios.post(`${API_URL}/clinics`, clinica, {
        headers: AuthService.header(),
      });
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async updateClinica(clinica) {
    try {
      const response = await axios.put(
        `${API_URL}/clinics/${clinica.id}`,
        clinica,
        {
          headers: AuthService.header(),
        }
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async deleteClinica(idClinica) {
    try {
      const response = await axios.delete(`${API_URL}/clinics/${idClinica}`, {
        headers: AuthService.header(),
      });
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async getAdministradores(page = 1, pageSize = 10, filter = "") {
    try {
      const response = await axios.get(
        `${API_URL}/users?page=${page}&pageSize=${pageSize}&filter=${filter}&status=ACTIVE&roleID=2`,
        { headers: AuthService.header() }
      );
      return response.data.data;
    } catch (error) {
      return null;
    }
  }

  async postAdministrador(administrador) {
    try {
      const response = await axios.post(
        `${API_URL}/users/adminclinic`,
        administrador,
        {
          headers: AuthService.header(),
        }
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async deleteAdministrador(idAdministrador) {
    try {
      const response = await axios.delete(
        `${API_URL}/users/${idAdministrador}`,
        {
          headers: AuthService.header(),
        }
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async updateAdministrador(administrador) {
    try {
      const response = await axios.put(
        `${API_URL}/users/${administrador.id}`,
        administrador,
        {
          headers: AuthService.header(),
        }
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async getPacientes(page = 1, pageSize = 10, filter = "") {
    try {
      const response = await axios.get(
        `${API_URL}/users?page=${page}&pageSize=${pageSize}&filter=${filter}&status=ACTIVE&roleID=4`,
        { headers: AuthService.header() }
      );
      return response.data.data;
    } catch (error) {
      return null;
    }
  }

  async postPaciente(paciente) {
    try {
      const response = await axios.post(
        `${API_URL}/users/patient`,
        paciente,
        {
          headers: AuthService.header(),
        }
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }
}

export default new DataService();
