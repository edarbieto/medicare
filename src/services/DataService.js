import axios from "axios";
import AuthService from "./AuthService";

const API_URL = "http://3.230.230.245:5000/api";

class DataService {
  async getClinicas({ page = 1, pageSize = 10, filter = "" } = {}) {
    const response = await axios.get(
      `${API_URL}/clinics?page=${page}&pageSize=${pageSize}&filter=${filter}&status=ACTIVE`,
      { headers: AuthService.header() }
    );
    return response.data;
  }

  async getDepartamentos() {
    const response = await axios.get(`${API_URL}/addresses/departments`, {
      headers: AuthService.header(),
    });
    return response.data.data;
  }

  async getProvincias(idDepartamento) {
    const response = await axios.get(
      `${API_URL}/addresses/provinces?departmentID=${
        idDepartamento ? idDepartamento : -1
      }`,
      {
        headers: AuthService.header(),
      }
    );
    return response.data.data;
  }

  async getDistritos(idProvincia) {
    const response = await axios.get(
      `${API_URL}/addresses/districts?provinceID=${
        idProvincia ? idProvincia : -1
      }`,
      {
        headers: AuthService.header(),
      }
    );
    return response.data.data;
  }

  async postClinica(clinica) {
    const response = await axios.post(`${API_URL}/clinics`, clinica, {
      headers: AuthService.header(),
    });
    return response.data;
  }

  async updateClinica(clinica) {
    const response = await axios.put(
      `${API_URL}/clinics/${clinica.id}`,
      clinica,
      {
        headers: AuthService.header(),
      }
    );
    return response.data;
  }

  async deleteClinica(idClinica) {
    const response = await axios.delete(`${API_URL}/clinics/${idClinica}`, {
      headers: AuthService.header(),
    });
    return response.data;
  }

  async getAdministradores({ page = 1, pageSize = 10, filter = "" } = {}) {
    const response = await axios.get(
      `${API_URL}/users?page=${page}&pageSize=${pageSize}&filter=${filter}&status=ACTIVE&roleID=2`,
      { headers: AuthService.header() }
    );
    return response.data;
  }

  async postAdministrador(administrador) {
    const response = await axios.post(
      `${API_URL}/users/adminclinic`,
      administrador,
      {
        headers: AuthService.header(),
      }
    );
    return response.data;
  }

  async deleteAdministrador(idAdministrador) {
    const response = await axios.delete(`${API_URL}/users/${idAdministrador}`, {
      headers: AuthService.header(),
    });
    return response.data;
  }

  async updateAdministrador(administrador) {
    const response = await axios.put(
      `${API_URL}/users/${administrador.id}`,
      administrador,
      {
        headers: AuthService.header(),
      }
    );
    return response.data;
  }

  async getPacientes({ page = 1, pageSize = 10, filter = "" } = {}) {
    const response = await axios.get(
      `${API_URL}/users?page=${page}&pageSize=${pageSize}&filter=${filter}&status=ACTIVE&roleID=4`,
      { headers: AuthService.header() }
    );
    return response.data;
  }

  async postPaciente(paciente) {
    const response = await axios.post(`${API_URL}/users/patient`, paciente, {
      headers: AuthService.header(),
    });
    return response.data;
  }

  async updatePaciente(paciente) {
    const response = await axios.put(
      `${API_URL}/users/${paciente.id}`,
      paciente,
      {
        headers: AuthService.header(),
      }
    );
    return response.data;
  }

  async deletePaciente(idPaciente) {
    const response = await axios.delete(`${API_URL}/users/${idPaciente}`, {
      headers: AuthService.header(),
    });
    return response.data;
  }

  async getTiposSangre() {
    const response = await axios.get(`http://3.230.230.245:5001/BloodType/`, {
      headers: AuthService.header(),
    });
    return response.data;
  }
}

export default new DataService();
