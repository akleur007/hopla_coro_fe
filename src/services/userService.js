import axios from 'axios';

const apiBaseUrl = 'http://localhost:3000/api/users';

export const getUserList = async () => axios.get(apiBaseUrl);

export const createUser = async (params) => axios.post(apiBaseUrl, params);

export const getUser = async (id) => axios.get(`${apiBaseUrl}/${id}`);

export const authUser = async (params) => axios.post(`${apiBaseUrl}/authenticate`, params);

export const updateUser = async (params) => axios.put(`${apiBaseUrl}/${params.id}`, params);

export const deleteUser = async (id) => axios.delete(`${apiBaseUrl}/${id}`);

export const sendUserEmail = async (id) => axios.get(`${apiBaseUrl}/${id}/sendmail`);
