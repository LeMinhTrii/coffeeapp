import axios from "axios";

export const OrderServices = {
  getAllOder: async () => {
    return await axios.get(`${import.meta.env.VITE_API}/order`);
  },
  getOrderById: async (id) => {
    return await axios.get(`${import.meta.env.VITE_API}/orderbyid/${id}`);
  },
  getAllOderByUserId: async (id) => {
    return await axios.get(`${import.meta.env.VITE_API}/order/${id}`);
  },
  postOrder: async (req) => {
    return await axios.post(`${import.meta.env.VITE_API}/order`, req);
  },
  updateOrder: async (id, req) => {
    return await axios.put(`${import.meta.env.VITE_API}/order/${id}`, req);
  },
  deleteOrder: async (id) => {
    return await axios.delete(`${import.meta.env.VITE_API}/order/${id}`);
  },
};
