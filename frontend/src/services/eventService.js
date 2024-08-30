import axios from 'axios';

const API_URL = 'http://localhost:5000/events';

export const getAllEvents = () => axios.get(API_URL);

export const getEventById = (id) => axios.get(`${API_URL}/${id}`);

export const createEvent = (eventData) => axios.post(API_URL, eventData);

export const updateEvent = (id, eventData) => axios.put(`${API_URL}/${id}`, eventData);

export const deleteEvent = (id) => axios.delete(`${API_URL}/${id}`);
