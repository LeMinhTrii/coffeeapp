import React, { useEffect, useState } from "react";
import { PATH } from "../paths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { VND } from "../assets/js/handlePrice";
import Skeleton from "./Skeleton";
import axios from "axios";
import { ProductServices } from "../services/productServices";
import { useAuth } from "./Context/AuthContext";

const StyleProduct = styled.div`
  &.active {
    display: inline-block;
    padding: 0 10px;
    .content {
      /* width: 270px; */
      box-sizing: border-box;
      padding: 10px 15px;
      background: #fff;
      .name {
        font-size: 18px;
      }
      .price {
        font-size: 15px;
        padding: 8px 0;
      }
      .rating {
        font-size: 15px;
      }
      .review {
        font-size: 15px;
      }
      .btn {
        padding-bottom: 20px;
      }
    }
  }
  display: grid;
  grid-template-columns: 250px 1fr;
  align-items: center;
  background: #fff;
  gap: 20px;
  .thumnail {
    position: relative;
    overflow: hidden;
    padding-bottom: 100%;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 100%;
      min-height: 100%;
      min-width: 100%;
      object-fit: cover;
    }
  }
  .content {
    .name {
      max-width: 210px;
      color: #000;
      font-size: 20px;
      font-weight: 600;
      transition: all 0.4s;
      display: -webkit-box;
      -webkit-line-clamp: 1; /* Số dòng tối đa */
      -webkit-box-orient: vertical;
      overflow: hidden;
      &:hover {
        transition: all 0.4s;
        color: #992931;
      }
    }
    .price {
      font-size: 18px;
      padding: 10px 0 15px;
      color: #53a16e;
      font-weight: 600;
      .priceroot {
        text-decoration: line-through;
        color: #888;
        margin-right: 10px;
        font-weight: 100;
      }
    }
    .rating {
      font-size: 18px;
    }
    .review {
      font-size: 18px;
      color: #992931;
      margin-left: 10px;
      font-weight: 500;
    }
    .btn {
      margin-top: 15px;
      button {
        background: transparent;
        border: 1px solid #bbbbbb;
        outline: none;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
      }
      .addcart {
        margin-right: 15px;
        font-weight: 600;
        transition: 0.4s;

        &:hover {
          color: #fff;
          background: #53a16e;
          transition: 0.4s;
        }
      }
      .whistlist {
        background: #e4e4e4;
        svg {
          transition: 0.4s;
          color: #fff;
        }
        &:hover {
          svg {
            transition: 0.4s;
            color: #ff0000;
          }
        }
      }
    }
  }
`;
export default function ProductItem({
  id,
  name,
  price,
  discount,
  urlThumnail,
  column,
  handleHeart,
  handleCart,
}) {
  const { data } = useAuth();
  const addWishList = {
    user_id: data && data.id,
    product_id: id,
  };
  return (
    <StyleProduct className={column && "active"}>
      <div className="thumnail">
        <img src={urlThumnail} alt="" />
      </div>
      <div className="content">
        <Link to={`/detail/${id}`} className="name">
          {name}
        </Link>
        <p className="price">
          <span className="priceroot">{VND.format(price)}</span>
          {VND.format(price - (price * discount) / 100)}
        </p>
        <span className="rating">
          <FontAwesomeIcon icon={faStar} color="#ffb503" />
          <FontAwesomeIcon icon={faStar} color="#ffb503" />
          <FontAwesomeIcon icon={faStar} color="#ffb503" />
          <FontAwesomeIcon icon={faStar} color="#ffb503" />
          <FontAwesomeIcon icon={faStar} color="#bcbcbc" />
        </span>
        <span className="review">{`(${4} đánh giá)`}</span>
        <div className="btn">
          <button className="addcart" onClick={(e) => handleCart(id)}>
            Thêm vào giỏ hàng
          </button>
          <button
            className="whistlist"
            onClick={(e) => handleHeart(addWishList)}
          >
            <FontAwesomeIcon icon={faHeart} color="red" />
          </button>
        </div>
      </div>
    </StyleProduct>
  );
}
export const ProductItemSkeleton = ({ column }) => {
  return (
    <StyleProduct className={column && "active"}>
      <div className="thumnail" style={{ margin: "10px 0 0" }}>
        <Skeleton height={249} marginBottom={-240} />
      </div>
      <div className="content" style={{ padding: "10px 0" }}>
        <Skeleton height={18} width={245} />
        <div className="price" style={{ display: "flex" }}>
          <span className="priceroot">
            <Skeleton height={15} width={115} />
          </span>
          <Skeleton height={15} width={118} />
        </div>
        <div className="flex" style={{ display: "flex" }}>
          <span className="rating">
            <FontAwesomeIcon icon={faStar} color="#bcbcbc" />
            <FontAwesomeIcon icon={faStar} color="#bcbcbc" />
            <FontAwesomeIcon icon={faStar} color="#bcbcbc" />
            <FontAwesomeIcon icon={faStar} color="#bcbcbc" />
            <FontAwesomeIcon icon={faStar} color="#bcbcbc" />
          </span>
          <span className="review">
            <Skeleton height={18} width={150} />
          </span>
        </div>
        <div className="btn" style={{ display: "flex", gap: "15px" }}>
          <Skeleton height={36} width={190} />
          <Skeleton height={36} width={40} />
        </div>
      </div>
    </StyleProduct>
  );
};
