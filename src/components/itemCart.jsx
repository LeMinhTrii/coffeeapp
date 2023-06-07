import React from "react";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { VND } from "../assets/js/handlePrice";
const StyleItemCart = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  .thumnail {
    width: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .box {
    .name {
      font-size: 15px;
      font-weight: 500;
      font-family: "Merriweather", serif;
    }
    .price {
      margin: 5px 0;
      color: #53a16e;
      font-weight: 600;
    }
    .text {
      width: max-content;
    }
    .form-group {
      margin-top: 5px;
      display: flex;
      gap: 10px;
      align-items: center;
      button {
        border: none;
        cursor: pointer;
        svg {
          font-size: 12px;
        }
        .fs {
          font-size: 18px;
        }
      }
      .btn {
        display: flex;
        align-items: center;
      }
      .number {
        padding: 0 10px;
        font-size: 18px;
        font-weight: 500;
      }
    }
  }
  .btndel {
    border: none;
    background: transparent;
    position: absolute;
    right: 10px;
    bottom: 20px;
    cursor: pointer;
  }
`;
export default function ItemCart({
  id,
  urlThumnail,
  name,
  price,
  discount,
  quality,
  handleMulti,
  handlePlus,
  removeProduct,
}) {
  return (
    <StyleItemCart>
      <div className="thumnail">
        <img src={urlThumnail} alt="" />
      </div>
      <div className="box">
        <div className="content">
          <p className="name">{name}</p>
          <p className="price">
            {VND.format(price - (price * discount) / 100)}
          </p>
        </div>
        <div className="form-group">
          <div className="text">Số lượng</div>
          <div className="btn">
            <button>
              <FontAwesomeIcon
                icon={faMinus}
                onClick={(e) => handleMulti(id)}
              />
            </button>
            <p className="number">{quality}</p>
            <button>
              <FontAwesomeIcon icon={faPlus} onClick={(e) => handlePlus(id)} />
            </button>
          </div>
        </div>
      </div>
      <button className="btndel">
        <FontAwesomeIcon
          icon={faTrashCan}
          className="fs"
          onClick={(e) => removeProduct(id)}
        />
      </button>
    </StyleItemCart>
  );
}
