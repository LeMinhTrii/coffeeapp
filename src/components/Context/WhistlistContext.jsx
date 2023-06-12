import { message } from "antd";
import { createContext, useContext, useState } from "react";
import { ProductServices } from "../../services/productServices";

const WishtListContext = createContext();
export const WishtListProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleHeart = async (obj) => {
    if (!localStorage.getItem("user")) {
      messageApi.error("Bạn Phải Đăng Nhập");
    } else {
      try {
        const addWishList = await ProductServices.postWishList(obj);
        messageApi.success(addWishList.data.message);
      } catch (error) {
        messageApi.error(error.response.data.message);
      }
    }
  };
  return (
    <WishtListContext.Provider value={{ handleHeart, contextHolder }}>
      {children}
    </WishtListContext.Provider>
  );
};
export const useWishtList = () => useContext(WishtListContext);
