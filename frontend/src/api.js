import axios from 'axios';

// Configuración de la conexión a tu backend Django
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',  // URL de tu backend
});

export default api;
