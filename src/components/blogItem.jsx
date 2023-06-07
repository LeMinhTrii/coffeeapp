import React from "react";
import { styled } from "styled-components";

const StyleBlog = styled.div`
  .thumnail {
    position: relative;
    padding-bottom: calc(236 / 357 * 100%);
    overflow: hidden;

    img {
      position: absolute;
      max-width: 100%;
      min-height: 100%;
      min-width: 100%;
      object-fit: cover;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1);
      transition: 0.4s;
    }
    &:hover {
      img {
        transform: translate(-50%, -50%) scale(1.05);
        transition: 0.4s;
      }
    }
  }
  .day {
    color: #53a16e;
    font-size: 14px;
    font-weight: 600;
    font-family: "Merriweather", serif;
    padding: 20px 0 0;
  }
  .name {
    font-size: 22px;
    font-weight: bold;
    margin: 10px 0 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .desc {
    color: #888;
    font-size: 15px;
    font-family: "Merriweather", serif;
    line-height: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
`;
export default function BlogItem({ thumnail, day, name, desc }) {
  return (
    <StyleBlog>
      <div className="thumnail">
        <img src={thumnail} alt="" />
      </div>
      <p className="day">{day}</p>
      <p className="name">{name}</p>
      <p className="desc">{desc}</p>
    </StyleBlog>
  );
}
