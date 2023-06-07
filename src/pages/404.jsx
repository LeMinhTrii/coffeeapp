import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { PATH } from "../paths";
import { scroll } from "../assets/js/scrolltop";

const StyleNotFound = styled.div`
  .bgr {
    background: #222;
    padding: 130px 0 0;
  }
  .box {
    background: url(/src/assets/image/Pattern_bgr.jpg) no-repeat center;
    background-size: cover;
    padding: 20px 0 30px;
    .headings {
      color: #992931;
    }
    .back {
      color: #992931;
      display: block;
      text-align: center;
      margin: 30px 0;
      font-weight: 600;
      transition: all 0.4s;
      &:hover {
        color: #53a16e;
        transition: all 0.4s;
      }
    }
  }
`;
export default function Page404() {
  scroll();
  return (
    <>
      <StyleNotFound>
        <div className="bgr"></div>
        <div className="box">
          <div className="headings">404 NOT FOUND</div>
          <Link to={PATH.home} className="back">
            Quay về trang chủ
          </Link>
        </div>
      </StyleNotFound>
    </>
  );
}
