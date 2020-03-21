import axios from 'axios';

const apiBaseUrl = 'http://localhost:3000/api/bons';

export const getBonList = async () => axios.get(apiBaseUrl);

export const createBon = async (params) => axios.post(apiBaseUrl, params);

export const getBon = async (id) => axios.get(`${apiBaseUrl}/${id}`);

export const updateBon = async (params) => axios.put(`${apiBaseUrl}/${params.id}`, params);

export const deleteBon = async (id) => axios.delete(`${apiBaseUrl}/${id}`);

export const sendBonEmail = async (id) => axios.get(`${apiBaseUrl}/${id}/sendEmail`);
