import React, { useEffect } from "react";
import ProductItem, { ProductItemSkeleton } from "../../components/productItem";
import { useCart } from "../../components/Context/CartContext";
import { useLocation } from "react-router-dom";
import { UsePaginate } from "../../components/Context/PaginateContext";
import { useWishtList } from "../../components/Context/WhistlistContext";

export default function Preeze() {
  const { category, getCategoryPaginate, getCategoryById, sort } =
    UsePaginate();
  const location = useLocation();
  useEffect(() => {
    getCategoryPaginate(2);
    getCategoryById(2);
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
