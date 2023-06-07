import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import OrderItem from "../../components/Order/orderItem";
import { OrderServices } from "../../services/orderServices";
export default function Order() {
  const [messageApi, contextHolder] = message.useMessage();
  const [orderlist, setOrderList] = useState();
  useEffect(() => {
    getOrder();
  }, []);
  const getOrder = async () => {
    const order = await OrderServices.getAllOder();
    await setOrderList(order.data);
  };

  const handleDeleteOrder = async (id) => {
    try {
      await OrderServices.deleteOrder(id);
      getOrder();
      messageApi.success("Xóa Đơn Hàng Thành Công");
    } catch (error) {
      messageApi.error("Xóa Đơn Hàng Không Thành Công");
    }
  };
  const handleEditOrder = async (id, status) => {
    if (status === undefined) {
      messageApi.error("Vui Lòng Chọn Trạng Thái Mới Cho Đơn Hàng");
    } else {
      try {
        await OrderServices.updateOrder(id, { status });
        getOrder();
        messageApi.success("Cập Nhật Trạng Thái Cho Đơn Hàng Thành Công");
      } catch (error) {
        messageApi.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div className="manager_content-box" style={{ paddingBottom: "50px" }}>
        <div className="textbox">
          <div className="heading">Order</div>
        </div>
        <div className="productlist_account">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Tên Khách Hàng</th>
                <th>Số Điện Thoại</th>
                <th>Địa Chỉ</th>
                <th>Tên Sản Phẩm</th>
                <th>Tổng Tiền</th>
                <th>Tình Trạng</th>
                <th>Chức Năng</th>
              </tr>
            </thead>
            <tbody>
              {orderlist &&
                orderlist.map((e) => (
                  <OrderItem
                    key={e.id}
                    {...e}
                    handleDeleteOrder={handleDeleteOrder}
                    handleEditOrder={handleEditOrder}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="editstatus">
        <label>Trạng Thái Đơn Hàng</label>
        <select
          value={(statusorder && statusorder) || (order && order.status) || ""}
          onChange={(e) => handleStatus(e)}
        >
          <option value={0}>Chờ Xác Nhận</option>
          <option value={1}>Chờ Lấy Hàng</option>
          <option value={2}>Giao Thành Công</option>
          <option value={3}>Đã Hủy</option>
        </select>
      </div> */}
    </>
  );
}
