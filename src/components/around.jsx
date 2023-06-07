import React, { Children } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { PATH } from "../paths";
const StyleAround = styled.div`
  padding-top: 80px;
  overflow: hidden;
  text-align: center;
  .thumnail {
    width: 230px;
    height: 230px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      max-width: 100%;
      min-width: 100%;
      min-height: 100%;
      object-fit: cover;
      transform: translate(-50%, -50%);
    }
  }
  .name {
    display: inline-block;
    font-size: 20px;
    font-weight: 600;
    margin: 20px 0 20px -40px;
    color: #000;
  }
`;
export default function CategoryAround({ filepath, name_category, link }) {
  return (
    <StyleAround>
      <div className="thumnail">
        <img src={filepath} alt="" />
      </div>
      <Link to={link} className="name">
        {name_category}
      </Link>
    </StyleAround>
  );
}
