import { createContext, useContext, useEffect, useState } from "react";
import { ProductServices } from "../../services/productServices";
import { message } from "antd";

const CartContext = createContext();
export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const carts = localStorage.getItem("cart");
    if (carts) return JSON.parse(carts);
    return [];
  });
  const handleCart = async (id) => {
    let quality = 1;
    const Product = await ProductServices.getDetail(id);
    const ProductNew = {
      ...Product.data,
      quality,
    };
    localStorage.setItem(
      "addcart",
      `${Product.data.name} Đã Được Thêm Vào Giỏ Hàng`
    );
    const findProduct = cart && cart.find((e) => e.id === id);
    if (findProduct) {
      findProduct.quality += 1;
      await setCart([...cart]);
    } else {
      await setCart([...cart, ProductNew]);
    }
  };
  const handleMulti = (id) => {
    const mulProduct = cart && cart.find((e) => e.id === id);
    if (mulProduct) {
      if (mulProduct.quality <= 1) {
        const delProduct = cart.filter((e) => e.id !== id);
        setCart([...delProduct]);
      } else {
        mulProduct.quality -= 1;
        setCart([...cart]);
      }
    }
  };
  const handlePlus = (id) => {
    const mulProduct = cart && cart.find((e) => e.id === id);
    if (mulProduct) {
      mulProduct.quality += 1;
      setCart([...cart]);
    }
  };
  const removeProduct = (id) => {
    const delProduct = cart.filter((e) => e.id !== id);
    setCart([...delProduct]);
  };
  const removeCart = () => {
    setCart([]);
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <CartContext.Provider
      value={{
        cart,
        handleCart,
        handleMulti,
        handlePlus,
        removeProduct,
        removeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
