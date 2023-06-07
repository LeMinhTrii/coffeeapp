import { createContext, useContext, useEffect, useState } from "react";
import { CategoryServices } from "../../services/categoryServices";
import { ProductServices } from "../../services/productServices";
import { useLocation } from "react-router-dom";
import { PATH } from "../../paths";

const PaginateContext = createContext({});
export const UsePaginate = () => useContext(PaginateContext);
export const PaginateProvider = ({ children }) => {
  const [category, setCategory] = useState();
  const [sort, setSort] = useState(4);
  const [totalPage, setTotalPage] = useState();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentpage = searchParams.get("page") || 1;
  let urlCurrent = location.pathname;
  const page = Math.ceil(totalPage / 8);

  //   useEffect(() => {
  //   }, [sort, location]);
  const getCategoryPaginate = async (categoryid, start = currentpage) => {
    const Product = await check(categoryid, { page: start, perpage: 8 });
    await setCategory(Product.data);
  };
  const getCategoryById = async (id) => {
    const categoryId = await ProductServices.getProductByCategory(id);
    await setTotalPage(categoryId.data.length);
  };
  const check = async (id, req) => {
    // switch (sort) {
    //   case 1:
    //     return await CategoryServices.getProductPriceDesc(id, req);
    //   case 2:
    //     return await CategoryServices.getProductPriceAsc(id, req);
    //   case 3:
    //     return await CategoryServices.getProductIdDesc(id, req);
    //   case 4:
    //     return await CategoryServices.getProductIdAsc(id, req);
    // }
    if (sort === 1) {
      return await CategoryServices.getProductPriceDesc(id, req);
    } else if (sort === 2) {
      return await CategoryServices.getProductPriceAsc(id, req);
    } else if (sort === 3) {
      return await CategoryServices.getProductIdDesc(id, req);
    }
    return await CategoryServices.getProductIdAsc(id, req);
  };
  const handleSort = (ev) => {
    const SortBy = parseInt(ev.target.value);
    setSort(SortBy);
  };
  const checkpath = () => {
    const coffee = urlCurrent.includes(PATH.coffee);
    const preeze = urlCurrent.includes(PATH.preeze);
    const tea = urlCurrent.includes(PATH.tea);
    const different = urlCurrent.includes(PATH.different);
    if (coffee) {
      getCategoryPaginate(1);
      getCategoryById(1);
    }
    if (preeze) {
      getCategoryPaginate(2);
      getCategoryById(2);
    }
    if (tea) {
      getCategoryPaginate(3);
      getCategoryById(3);
    }
    if (different) {
      getCategoryPaginate(4);
      getCategoryById(4);
    }
  };
  return (
    <PaginateContext.Provider
      value={{
        sort,
        category,
        handleSort,
        page,
        getCategoryPaginate,
        getCategoryById,
      }}
    >
      {children}
    </PaginateContext.Provider>
  );
};
