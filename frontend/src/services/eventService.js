import axios from 'axios';

const API_URL = 'http://localhost:5000/events';

// Funções básicas para eventos
export const getAllEvents = () => axios.get(API_URL);
export const getEventById = (id) => axios.get(`${API_URL}/${id}`);
export const createEvent = (eventData) => axios.post(API_URL, eventData);
export const updateEvent = (id, eventData) => axios.put(`${API_URL}/${id}`, eventData);
export const deleteEvent = (id) => axios.delete(`${API_URL}/${id}`);

// // Funções para manipulação de produtos
// export const addProduct = (eventId, productData) => 
//     axios.post(`${API_URL}/${eventId}/products`, productData);

// export const updateProduct = (eventId, productId, productData) => 
//     axios.put(`${API_URL}/${eventId}/products/${productId}`, productData);

// // Funções para manipulação de participantes
// export const updateParticipantsInEvent = (eventId, participantsData) => 
//     axios.put(`${API_URL}/${eventId}/participants`, participantsData);

// // Atualizar consumo de um participante em um evento
// export const updateConsumption = (eventId, consumptionData) => 
//     axios.put(`${API_URL}/${eventId}/consumptions`, consumptionData);

// // Atualizar a conta e a participação dos participantes
// export const updateBillAndParticipants = (billData) => 
//     axios.put(`${API_URL}/calculate-bill`, billData);

// // Rota para buscar produtos e participantes
// export const getEventData = (eventId) => 
//     axios.get(`${API_URL}/${eventId}/data`);

// // Rota para salvar os consumos dos participantes
// export const saveConsumptions = (eventId, consumptionsData) => 
//     axios.post(`${API_URL}/${eventId}/fechamento`, consumptionsData);
