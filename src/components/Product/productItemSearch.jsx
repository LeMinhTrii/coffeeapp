import React from "react";
import { styled } from "styled-components";
import { VND } from "../../assets/js/handlePrice";
import { Link } from "react-router-dom";
import Skeleton from "../Skeleton";

const StyleSearch = styled.div`
  display: flex;
  gap: 10px;
  height: 100px;
  .thumnail {
    position: relative;
    width: 100px;
    overflow: hidden;
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
      color: #8d262d;
      font-weight: 600;
      font-family: "Roboto", sans-serif;
      margin: 10px 0 15px;
      font-size: 18px;
      display: block;
    }
    .price {
      font-family: "Roboto", sans-serif;
      color: #53a16e;
      font-weight: 600;
      .priceroot {
        text-decoration: line-through;
        color: #888;
        margin-right: 10px;
      }
    }
  }
`;
export default function ProductItemSearch({
  id,
  discount,
  urlThumnail,
  name,
  price,
}) {
  return (
    <StyleSearch>
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
      </div>
    </StyleSearch>
  );
}
export const ProductItemSearchSkeleton = () => {
  return (
    <StyleSearch>
      <div className="thumnail">
        <Skeleton width={100} height={100} marginBottom={-200} />
      </div>
      <div className="content">
        <div className="name">
          <Skeleton height={18} width={200} />
        </div>
        <div className="price" style={{ display: "flex" }}>
          <span className="priceroot">
            <Skeleton height={18} width={60} />
          </span>
          <Skeleton height={18} width={60} />
        </div>
      </div>
    </StyleSearch>
  );
};
