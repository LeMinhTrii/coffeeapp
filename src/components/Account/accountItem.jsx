import { Button } from "antd";
import React from "react";
import { styled } from "styled-components";
import Skeleton from "../Skeleton";
const StyleThumnail = styled.div`
  position: relative;
  padding-bottom: 130px;
  margin-bottom: -50px;
  img,
  .skt {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 100%;
    min-height: 100%;
    max-width: 100%;
    object-fit: cover;
  }
`;
export default function AccountItem({
  id,
  name,
  password,
  phone_number,
  email,
  type,
  urlAvatar,
}) {
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{phone_number}</td>
        <td>{email}</td>
        <td>
          <p style={{ width: "350px", wordBreak: "break-word" }}>{password}</p>
        </td>
        <td>{type}</td>
        <td style={{ width: "300px", overflow: "hidden" }}>
          <StyleThumnail>
            <img src={urlAvatar} alt="" />
          </StyleThumnail>
        </td>
      </tr>
    </>
  );
}
export const SkeletonAccountItem = () => {
  return (
    <>
      <tr>
        <td>
          <Skeleton height={20} marginTop={-60} />
        </td>
        <td>
          <Skeleton height={20} marginTop={-60} />
        </td>
        <td>
          <Skeleton height={20} marginTop={-60} />
        </td>
        <td width={300}>
          <Skeleton height={20} marginTop={-60} />
        </td>
        <td>
          <Skeleton height={60} width={350} marginLeft={3} marginTop={-80} />
        </td>
        <td>
          <Skeleton height={20} marginTop={-60} />
        </td>
        <td>
          <Skeleton width={100} height={100} />
        </td>
      </tr>
    </>
  );
};
