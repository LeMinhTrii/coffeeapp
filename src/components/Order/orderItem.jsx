import { Button } from "antd";
import React, { useState } from "react";
import { VND } from "../../assets/js/handlePrice";
export default function OrderItem({
  id,
  name,
  phone,
  address,
  product,
  status,
  total_price,
  handleDeleteOrder,
  handleEditOrder,
}) {
  const [statusorder, setStatusOrder] = useState();
  const statusmessage =
    status === 0
      ? "Chờ Xác Nhận"
      : status === 1
      ? "Chờ Lấy Hàng"
      : status === 2
      ? "Giao Thành Công"
      : "Đã Hủy";
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{phone}</td>
        <td>{address}</td>
        <td style={{ textAlign: "left", width: "20%" }}>
          {product.map((e) => (
            <div style={{ padding: "3px" }} key={e.id}>
              <p style={{ padding: "0 0 5px" }}>{e.name}</p>
              <span style={{ color: "red" }}>
                {VND.format(e.price - (e.price * e.discount) / 100)}
              </span>
              <span style={{ marginLeft: "10px" }}>x{e.quality}</span>
            </div>
          ))}
        </td>
        <td>{VND.format(total_price)}</td>
        <td>
          {status === 2 || status === 3 ? (
            statusmessage
          ) : (
            <select
              value={statusorder || status || ""}
              onChange={(e) => setStatusOrder(e.target.value)}
            >
              <option value={0}>Chờ Xác Nhận</option>
              <option value={1}>Chờ Lấy Hàng</option>
              <option value={2}>Giao Thành Công</option>
              {/* <option value={3}>Đã Hủy</option> */}
            </select>
          )}
        </td>
        <td>
          <Button
            type="primary"
            danger
            onClick={(e) => {
              const question = confirm("Bạn Có Muốn Xóa Đơn Hàng Này Không ?");
              question && handleDeleteOrder(id);
            }}
          >
            Xóa
          </Button>
          <Button
            type="primary"
            style={{ margin: "10px 0 0", background: "#ff9800" }}
            onClick={(e) => handleEditOrder(id, statusorder)}
          >
            Sửa
          </Button>
        </td>
      </tr>
    </>
  );
}
