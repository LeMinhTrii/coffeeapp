import { Button } from "antd";
import React from "react";
import Skeleton from "../Skeleton";
import { styled } from "styled-components";

export default function CategoryItem({ id, name_category, filepath }) {
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name_category}</td>
        <td
          style={{
            position: "relative",
            paddingBottom: 120,
            background: "#fff",
          }}
        >
          <img
            src={filepath}
            alt=""
            width={120}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
        </td>
        <td>
          <Button type="primary" danger style={{ margin: "0 10px" }}>
            Xóa
          </Button>
          <Button
            type="primary"
            style={{ margin: "10px 0 0", background: "#ff9800" }}
          >
            Sửa
          </Button>
        </td>
      </tr>
    </>
  );
}
const StyleRelative = styled.div`
  position: relative;
  top: -85px;
`;
export const SkeletonCategoryItem = () => {
  return (
    <>
      <tr>
        <td>
          <Skeleton height={20} marginTop={-114} />
        </td>
        <td>
          <Skeleton height={20} width={120} marginTop={-114} marginLeft={5} />
        </td>
        <td>
          <Skeleton width={"100%"} height={120} marginBottom={-5} />
        </td>
        <td style={{ width: "12%" }}>
          <StyleRelative>
            <Skeleton
              height={30}
              width={50}
              display={"inline-block"}
              marginRight={10}
              marginLeft={10}
              marginTop={-114}
            />
            <Skeleton
              height={30}
              width={50}
              marginTop={-114}
              display={"inline-block"}
            />
          </StyleRelative>
        </td>
      </tr>
    </>
  );
};
