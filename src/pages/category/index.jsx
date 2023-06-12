import React, { useEffect } from "react";
import { useGetCategoryId } from "../../hooks/useGetProductByCategory";
import ProductItem from "../../components/productItem";
import { ProductItemSkeleton } from "../../components/productItem";
import { useStatus } from "../../components/Context/StatusContext";
import { useCart } from "../../components/Context/CartContext";
import { UsePaginate } from "../../components/Context/PaginateContext";
import { useLocation } from "react-router-dom";
import { ProductServices } from "../../services/productServices";
import { useWishtList } from "../../components/Context/WhistlistContext";

export default function Coffee() {
  const { category, getCategoryPaginate, getCategoryById, sort } =
    UsePaginate();
  const location = useLocation();
  useEffect(() => {
    getCategoryPaginate(1);
    getCategoryById(1);
  }, [location, sort]);
  const { status } = useStatus();
  const { handleCart } = useCart();
  const { handleHeart, contextHolder } = useWishtList();

  return (
    <>
      {contextHolder}
      {status
        ? category
          ? category.map((e) => (
              <ProductItem
                key={e.id}
                {...e}
                handleCart={handleCart}
                handleHeart={handleHeart}
              />
            ))
          : Array.from(Array(8)).map((_, i) => <ProductItemSkeleton key={i} />)
        : category
        ? category.map((e) => (
            <ProductItem
              key={e.id}
              {...e}
              column
              handleCart={handleCart}
              handleHeart={handleHeart}
            />
          ))
        : Array.from(Array(8)).map((_, i) => (
            <ProductItemSkeleton key={i} column />
          ))}
    </>
  );
}
