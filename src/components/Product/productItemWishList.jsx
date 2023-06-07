import React from "react";
import { Link } from "react-router-dom";
import { VND } from "../../assets/js/handlePrice";
import { styled } from "styled-components";

const ItemWishList = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 20px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  align-items: center;

  .thumnail {
    height: 100px;
    overflow: hidden;
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      object-fit: cover;
      max-width: 100%;
      min-width: 100%;
      min-height: 100%;
    }
  }
  .content {
    .name {
      display: inline-block;
      color: #000;
      font-weight: 600;
    }
    .price {
      margin: 8px 0;
      font-size: 16px;
      font-weight: 600;
      color: red;
      .priceroot {
        text-decoration: line-through;
        color: #888;
        margin-right: 5px;
      }
    }
    .removewishlist {
      border: none;
      border-radius: 5px;
      color: #fff;
      background: #53a16e;
      padding: 2px 15px;
      cursor: pointer;
    }
  }
`;
export default function ProductItemWishList({
  urlThumnail,
  id,
  name,
  price,
  discount,
  product_id,
  remove,
}) {
  return (
    <ItemWishList>
      <div className="thumnail">
        <img src={urlThumnail} alt="" />
      </div>
      <div className="content">
        <Link to={`/detail/${id}`} className="name">
          {name}
        </Link>
        <p className="price">
          {discount === 0 ? (
            <span>{VND.format(price)}</span>
          ) : (
            <>
              <span className="priceroot">{VND.format(price)}</span>
              {VND.format(price - (price * discount) / 100)}
            </>
          )}
        </p>
        <button className="removewishlist" onClick={(e) => remove(product_id)}>
          Bỏ Yêu Thích
        </button>
      </div>
    </ItemWishList>
  );
}
