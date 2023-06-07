import React from "react";
import { VND } from "../../assets/js/handlePrice";
import moment from "moment";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { PATH } from "../../paths";

export default function OrderListItem({
  id,
  total_price,
  product,
  name,
  phone,
  address,
  status,
  created_at,
  handleCancel,
}) {
  const statusMessage =
    status === 0
      ? "Chờ Xác Nhận"
      : status === 1
      ? "Chờ Lấy Hàng"
      : status === 2
      ? "Đơn Hàng Giao Thành Công"
      : "Đơn Hàng Đã Hủy";
  return (
    <div className="boxs">
      <div className="productlist">
        <div className="list">
          {product &&
            product.map((e) => (
              <div className="item" key={e.id}>
                <div className="thumnail">
                  <img src={e.urlThumnail} alt="" width={100} />
                </div>
                <div className="content">
                  <Link to={`/detail/${e.id}`} className="name">
                    {e.name}
                  </Link>
                  <p className="price">{VND.format(e.price)}</p>
                  <p className="quality">{`x${e.quality}`}</p>
                </div>
              </div>
            ))}
          <p className="total">Tổng Tiền: {VND.format(total_price)}</p>
        </div>
      </div>
      <div className="infor-customer">
        <p className="name">
          <span>Tên Khách Hàng: </span>
          {name}
        </p>
        <p className="phone">
          <span>Số Điện Thoại: </span>
          {phone}
        </p>
        <p className="address">
          <span>Địa Chỉ: </span>
          {address}
        </p>
        <p className="status">
          <span>Trạng Thái Đơn Hàng: </span>
          {statusMessage}
        </p>
        <p className="time">
          <span>Ngày Đặt Hàng: </span>
          {moment(created_at).format("DD/MM/YYYY HH:mm:ss")}
        </p>
        {status === 0 && (
          <button className="btnanimate" onClick={(e) => handleCancel(id)}>
            Hủy Đơn Hàng
          </button>
        )}
      </div>
    </div>
  );
}
