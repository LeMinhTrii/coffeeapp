import { ProductServices } from "../services/productServices";

export const handleHeart = async (obj) => {
  if (!localStorage.getItem("user")) {
    localStorage.setItem("whistlisterr", "Bạn Phải Đăng Nhập");
  } else {
    try {
      const addWishList = await ProductServices.postWishList(obj);
      localStorage.setItem(
        "whistlist",
        JSON.stringify(addWishList.data.message)
      );
    } catch (error) {
      localStorage.setItem(
        "whistlisterr",
        JSON.stringify(error.response.data.message)
      );
    }
  }
};
