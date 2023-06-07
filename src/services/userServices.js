import axios from "axios";

export const UserServices = {
  getUser: async () => {
    return await axios.get(`${import.meta.env.VITE_API}/user`);
  },
  getUserById: async (id) => {
    return await axios.get(`${import.meta.env.VITE_API}/user/${id}`);
  },
  login: async (req) => {
    return await axios.post(`${import.meta.env.VITE_API}/login`, req);
  },
  register: async (req) => {
    return await axios.post(`${import.meta.env.VITE_API}/register`, req);
  },
  // updateAvatarById: async (id, req) => {
  //   return await axios.put(`${import.meta.env.VITE_API}/avatar/${id}`, req);
  // },

  updateAvatarById: async (id, req) => {
    return await axios.put(`${import.meta.env.VITE_API}/avatar/${id}`, req, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updatePass: async (id, req) => {
    return await axios.put(`${import.meta.env.VITE_API}/changepass/${id}`, req);
  },
  updateUser: async (id, req) => {
    return await axios.put(`${import.meta.env.VITE_API}/user/${id}`, req);
  },
  getCoverImageByUserId: async (id) => {
    return await axios.get(`${import.meta.env.VITE_API}/coverimage/${id}`);
  },
  updateCoverImage: async (id, req) => {
    return await axios.put(
      `${import.meta.env.VITE_API}/coverimage/${id}`,
      req,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
};
