import React, { useEffect, useState } from "react";
import { PaymentStyle } from "./order";
import { useAuth } from "../components/Context/AuthContext";
import { OrderServices } from "../services/orderServices";
import OrderListItem from "../components/Order/orderlist";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PATH } from "../paths";
import { Link, useNavigate } from "react-router-dom";
import { scroll } from "../assets/js/scrolltop";
import { message } from "antd";

export default function ListOrderByUser() {
  const navigator = useNavigate();
  const { data } = useAuth();
  const [order, setOrder] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getAllOrderByUser();
    !data && navigator(PATH.login);
  }, [order, data]);
  useEffect(() => {
    scroll();
  }, []);
  const getAllOrderByUser = async () => {
    if (data && data.id) {
      const Order = await OrderServices.getAllOderByUserId(data && data.id);
      await setOrder(Order.data);
    }
  };
  const handleCancel = async (id) => {
    try {
      await OrderServices.updateOrder(id, {
        status: 3,
      });
      messageApi.success("Hủy Đơn Hàng Thành Công");
    } catch (error) {
      messageApi.error(error.response.data.message);
    }
  };
  return (
    <>
      {contextHolder}
      <PaymentStyle className="pdnone"></PaymentStyle>
      <div className="listorder">
        <div className="container">
          <div className="listorder_content">
            <div className="listorder_content-heading headings">Đơn Hàng</div>
            <div className="listorder_content-box">
              {order ? (
                order.map((e) => (
                  <OrderListItem
                    key={e.id}
                    {...e}
                    handleCancel={handleCancel}
                  />
                ))
              ) : (
                <div className="noneorder">
                  <div className="content">
                    <FontAwesomeIcon
                      icon={faClipboardList}
                      color="#fff"
                      fontSize={100}
                    />
                    <p className="text">Bạn Chưa Có Đơn Hàng Nào</p>
                    <button className="btnanimate">
                      <Link to={PATH.home}>Tiếp Tục Mua Hàng</Link>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
