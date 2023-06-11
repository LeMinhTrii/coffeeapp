import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { PATH } from "../../paths";

export const StyleBox = styled.div`
  height: 358px;
  position: relative;
  overflow: auto;
  .wishlistprd {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin: 0 20px 10px 20px;
  }
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    .cart {
      font-size: 100px;
      color: #fff;
    }
    .desc {
      color: #fff;
      padding: 20px 0;
    }
    .linkbuy {
      padding: 10px 40px;
      color: #fff;
      font-weight: 600;
      border-radius: 20px;
      background: #0d47a1;
      position: relative;
      overflow: hidden;
      &::after {
        position: absolute;
        content: "";
        height: 100%;
        width: 50px;
        opacity: 0;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 1) 50%,
          rgba(255, 255, 255, 0) 100%
        );
        mix-blend-mode: overlay;
        left: 0;
        top: 0;
      }
      &:hover {
        &::after {
          animation: line 1.5s linear forwards;
        }
      }
    }
  }
  @keyframes line {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    25% {
      transform: translateX(100px);
    }
    50% {
      transform: translateX(150px);
    }
    75% {
      opacity: 0.2;
      transform: translateX(200px);
    }
    100% {
      opacity: 0;
      transform: translateX(250px);
    }
  }
`;
export default function BuyHistory() {
  return (
    <StyleBox>
      <div className="box">
        <FontAwesomeIcon icon={faCartPlus} className="cart" />
        <p className="desc">Bạn chưa có lịch sử mua hàng</p>
        <Link to={PATH.home} className="linkbuy">
          Tiếp Tục Mua Hàng
        </Link>
      </div>
    </StyleBox>
  );
}
