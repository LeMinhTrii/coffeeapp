import React, { useEffect } from "react";
import ProductItem, { ProductItemSkeleton } from "../../components/productItem";
import { useCart } from "../../components/Context/CartContext";
import { UsePaginate } from "../../components/Context/PaginateContext";
import { useLocation } from "react-router-dom";
import { useWishtList } from "../../components/Context/WhistlistContext";

export default function Tea() {
  const { category, getCategoryPaginate, getCategoryById, sort } =
    UsePaginate();
  const location = useLocation();
  useEffect(() => {
    getCategoryPaginate(3);
    getCategoryById(3);
  }, [location, sort]);
  const { handleCart } = useCart();
  const { handleHeart, contextHolder } = useWishtList();

  return (
    <>
      {contextHolder}
      {category
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
