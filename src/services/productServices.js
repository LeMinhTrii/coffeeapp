import axios from "axios";

export const ProductServices = {
  getProduct: async () => {
    return await axios.get(`${import.meta.env.VITE_API}/product`);
  },
  getDetail: async (id) => {
    return await axios.get(`${import.meta.env.VITE_API}/product/${id}`);
  },
  getProductByCategory: async (category_id) => {
    return await axios.get(
      `${import.meta.env.VITE_API}/productcategory/${category_id}`
    );
  },
  postProduct: async (req) => {
    return await axios.post(`${import.meta.env.VITE_API}/product`, req, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  putProduct: async (id, req) => {
    return await axios.put(`${import.meta.env.VITE_API}/product/${id}`, req, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteProduct: async (id) => {
    return await axios.delete(`${import.meta.env.VITE_API}/product/${id}`);
  },
  postSearch: async (keyword) => {
    return await axios.post(`${import.meta.env.VITE_API}/search`, { keyword });
  },
  getComment: async (id) => {
    return await axios.get(`${import.meta.env.VITE_API}/comment/${id}`);
  },
  postComment: async (req) => {
    return await axios.post(`${import.meta.env.VITE_API}/comment`, req);
  },
  getWishList: async (id) => {
    return await axios.get(`${import.meta.env.VITE_API}/wishlist/${id}`);
  },
  removeWishList: async (id) => {
    return await axios.delete(`${import.meta.env.VITE_API}/wishlist/${id}`);
  },
  postWishList: async (req) => {
    return await axios.post(`${import.meta.env.VITE_API}/wishlist`, req);
  },
};
