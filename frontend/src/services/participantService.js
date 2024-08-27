import axios from 'axios';

const API_URL = 'http://localhost:3001/participants';

export const getAllParticipants = () => axios.get(API_URL);

export const getParticipantById = (id) => axios.get(`${API_URL}/${id}`);

export const createParticipant = (participantData) => axios.post(API_URL, participantData);

export const updateParticipant = (id, participantData) => axios.put(`${API_URL}/${id}`, participantData);

export const deleteParticipant = (id) => axios.delete(`${API_URL}/${id}`);
