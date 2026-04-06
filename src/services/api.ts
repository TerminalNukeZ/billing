import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const pterodactyl = {
  createUser: (userData: any) => api.post("/pterodactyl/create-user", userData),
  createServer: (serverData: any) => api.post("/pterodactyl/create-server", serverData),
};

export const payments = {
  createInvoice: (paymentData: any) => api.post("/payments/create-invoice", paymentData),
};

export default api;
