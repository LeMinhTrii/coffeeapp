import { useEffect, useState } from "react";
import { ProductServices } from "../services/productServices";

export const useGetCategoryId = (id) => {
  const [category, setCategory] = useState();
  useEffect(() => {
    (async () => {
      const Product = await ProductServices.getProductByCategory(id);
      await setCategory(Product.data);
    })();
  }, []);
  return { category };
};
