import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { styled } from "styled-components";
import { useGetUserById } from "../hooks/useGetUserById";
import moment from "moment/moment";
import { PATH } from "../paths";

const StyleReview = styled.div`
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 75px 1fr;
  gap: 30px;
  align-items: center;
  padding: 10px;
  /* background: #fff; */
  .thumnail {
    padding-bottom: 100%;
    border-radius: 50%;
    overflow: hidden;
    position: relative;

    img {
      position: absolute;
      /* top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
      width: 100%; */
      top: 50%;
      left: 50%;
      max-width: 100%;
      min-width: 100%;
      min-height: 100%;
      object-fit: cover;
      transform: translate(-50%, -50%);
    }
  }
  .content {
    .rating {
      svg {
        margin-right: 2px;
      }
    }
    .name {
      font-weight: 600;
      font-size: 18px;
      padding: 7px 0 10px;
      color: #53a16e;
    }
    .desc {
      color: #888;
      font-size: 17px;
      margin-bottom: 10px;
    }
    .day {
      color: red;
      font-size: 15px;
    }
  }
`;
export default function ReviewItem({ user_id, content, created_at }) {
  const { data } = useGetUserById(user_id);
  return (
    <StyleReview>
      <div className="thumnail">
        <img src={(data && data.urlAvatar) || PATH.imageUrlDefault} alt="" />
      </div>
      <div className="content">
        {/* <div className="rating">
          {Array.from(Array(5)).map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} color="#fab005" />
          ))}
        </div> */}
        <p className="name">{data && data.name}</p>
        <p className="desc">{content}</p>
        <p className="day">
          {moment(created_at).format("DD/MM/YYYY HH:mm:ss")}
        </p>
      </div>
    </StyleReview>
  );
}
