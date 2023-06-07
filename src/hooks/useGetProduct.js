import { useEffect, useState } from "react";
import { ProductServices } from "../services/productServices";

export const useGetProduct = () => {
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      const Product = await ProductServices.getProduct();
      await setData(Product.data.product);
    })();
  }, []);
  return { data };
};
