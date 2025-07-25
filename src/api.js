import axios from 'axios';
export const API_URL = `${import.meta.env.DEV ? 'http://localhost:5000' : "https://api.knut.wtf"}`;

const api = axios.create({
    baseURL: API_URL
})

// api.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//     return config;
// })

// api.interceptors.response.use((config) => {
//     return config;
// }, async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status == 401 && error.config && !error.config._isRetry) {
//         originalRequest._isRetry = true;
//         try {
//             const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
//             localStorage.setItem('token', response.data.accessToken);
//             return api.request(originalRequest);
//         } catch (e) {
//             console.log('НЕ АВТОРИЗОВАН')
//         }
//     }
//     throw error;
// })

export default api;
