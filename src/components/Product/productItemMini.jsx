import React from "react";
import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import { PATH } from "../../paths";
import { VND } from "../../assets/js/handlePrice";
import Skeleton from "../Skeleton";

export default function ProductItemMini({
  id,
  name,
  description,
  price,
  discount,
  category_id,
  urlThumnail,
  remove,
}) {
  return (
    <tr>
      <td>{id}</td>
      <td className="thumnail">
        <img src={urlThumnail} alt="" />
      </td>
      <td>{name}</td>
      <td>{description}</td>
      <td>{VND.format(price)}</td>
      <td>{discount}</td>
      <td>{category_id}</td>
      <td>
        <Button
          type="primary"
          danger
          onClick={(e) => {
            const question = confirm("Bạn Có Muốn Xóa Không ?");
            question && remove(id);
          }}
        >
          Xóa
        </Button>
        <Button
          type="primary"
          style={{ margin: "10px 0 0", background: "#ff9800" }}
        >
          <Link to={`editproduct/${id}`}>Sửa</Link>
        </Button>
      </td>
    </tr>
  );
}
export const SkeletonProductItemMini = () => {
  return (
    <tr>
      <td>
        <Skeleton height={15} width={15} marginTop={-268} />
      </td>
      <td className="thumnail">
        <Skeleton height={100} marginBottom={-22} />
      </td>
      <td>
        <Skeleton height={20} marginTop={-268} />
      </td>
      <td>
        <Skeleton height={80} width={550} marginBottom={-14} />
      </td>
      <td>
        <Skeleton height={20} width={70} marginTop={-268} />
      </td>
      <td>
        <Skeleton height={20} marginTop={-268} />
      </td>
      <td>
        <Skeleton height={20} marginTop={-268} />
      </td>
      <td>
        <Skeleton height={30} width={60} marginBottom={10} marginLeft={24} />
        <Skeleton height={30} width={60} marginLeft={24} />
      </td>
    </tr>
  );
};
