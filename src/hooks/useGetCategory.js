import { useEffect, useState } from "react";
import { CategoryServices } from "../services/categoryServices";

export const useGetCategory = () => {
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      const Product = await CategoryServices.getCategory();
      await setData(Product.data);
    })();
  }, []);
  return { data };
};
