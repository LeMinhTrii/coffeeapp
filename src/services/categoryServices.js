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
  deleCategoryById: async (id) => {
    return await axios.delete(`${import.meta.env.VITE_API}/category/${id}`);
  },
  postCategory: async (req) => {
    return await axios.post(`${import.meta.env.VITE_API}/category`, req, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  putCategory: async (id, req) => {
    return await axios.put(`${import.meta.env.VITE_API}/category/${id}`, req, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
