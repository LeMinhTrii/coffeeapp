import React, { useEffect, useState } from "react";
import { StyleBox } from "./buyhistory";
import { PATH } from "../../paths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { ProductServices } from "../../services/productServices";
import { useAuth } from "../../components/Context/AuthContext";
import ProductItemWishList from "../../components/Product/productItemWishList";
import { message } from "antd";

export default function Whistlist() {
  const [product, setProduct] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  const { data } = useAuth();
  useEffect(() => {
    getWishList();
  }, []);
  const getWishList = async () => {
    const wishlist = await ProductServices.getWishList(data && data.id);
    await setProduct(wishlist.data);
  };
  const handleDeleteWishList = async (id) => {
    // console.log(id);
    try {
      const removeWishList = await ProductServices.removeWishList(id);
      message.success(removeWishList.data.message);
      getWishList();
    } catch (error) {
      messageApi.error(error.response.data.message);
    }
  };
  return (
    <StyleBox>
      {contextHolder}
      {product && (
        <div className="wishlistprd">
          {product.map((e) => (
            <ProductItemWishList
              key={e.id}
              {...e}
              remove={handleDeleteWishList}
            />
          ))}
        </div>
      )}
      {product && product.length === 0 && (
        <div className="box">
          <FontAwesomeIcon icon={faHeart} className="cart" />
          <p className="desc">Bạn chưa có sản phẩm yêu thích</p>
          <Link to={PATH.home} className="linkbuy">
            Thêm Sản Phẩm Yêu Thích
          </Link>
        </div>
      )}
    </StyleBox>
  );
}
