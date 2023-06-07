import axios from "axios";

export const CategoryServices = {
  getCategory: async () => {
    return await axios.get(`${import.meta.env.VITE_API}/category`);
  },
  getProductPriceDesc: async (id, req) => {
    return await axios.post(`${import.meta.env.VITE_API}/pricedesc/${id}`, req);
  },
  getProductPriceAsc: async (id, req) => {
    return await axios.post(`${import.meta.env.VITE_API}/priceasc/${id}`, req);
  },
  getProductIdDesc: async (id, req) => {
    return await axios.post(`${import.meta.env.VITE_API}/iddesc/${id}`, req);
  },
  getProductIdAsc: async (id, req) => {
    return await axios.post(`${import.meta.env.VITE_API}/idasc/${id}`, req);
  },
};
