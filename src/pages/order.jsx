import axios from "axios";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Field from "../components/field";
import { useCart } from "../components/Context/CartContext";
import OrderTable from "../components/Order/ordertable";
import { VND } from "../assets/js/handlePrice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { PATH } from "../paths";
import { Link } from "react-router-dom";
import { useAuth } from "../components/Context/AuthContext";
import { message } from "antd";
import { OrderServices } from "../services/orderServices";
import { scroll } from "../assets/js/scrolltop";
import { handeCLose } from "../assets/js/header";

export const PaymentStyle = styled.div`
  padding-top: 130px;
  background: #222;
`;
const CustomFeild = styled.div`
  margin-bottom: -30px;
`;
export default function OrderList() {
  const [location, setLocation] = useState();
  const [wards, setWards] = useState();
  const { cart, handleMulti, handlePlus, removeProduct } = useCart();
  const [form, setForm] = useState({});
  const { data } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const { removeCart } = useCart();

  useEffect(() => {
    (async () => {
      const Location = await axios.get(import.meta.env.VITE_API_LOCATION);
      setLocation(Location.data[49]);
    })();
    scroll();
    document.querySelector(".header-cart").classList.remove("active");
  }, []);
  const handleLocation = (ev) => {
    const name = ev.target.value;
    setForm({ ...form, district: name });
    const LocationByWard =
      location && location.districts.find((e) => e.name === name);
    setWards(LocationByWard.wards);
  };
  const handlePayment = async () => {
    const PayMentByUser = {
      name: form && form.name,
      phone: form && form.phone,
      address: `${form && form.street}, ${form && form.wards}, ${
        form && form.district
      }, Thành Phố Hồ Chí Minh.`,
      product: cart && JSON.stringify(cart),
      total_price: total,
      user_id: data.id,
    };
    if (cart && cart.length !== 0) {
      if (Object.entries(form).length === 5) {
        try {
          await OrderServices.postOrder(PayMentByUser);
          messageApi.success("Thanh Toán Thành Công");
          setForm();
          localStorage.removeItem("cart");
          removeCart();
        } catch (error) {
          messageApi.error(error.response.data.message);
        }
      } else {
        messageApi.error("Vui Lòng Nhập Đầy Đủ Thông Tin");
      }
    } else {
      messageApi.error("Giỏ hàng trống");
    }
  };
  let total = 0;
  cart &&
    cart.forEach((e) => {
      total += (e.price - (e.price * e.discount) / 100) * e.quality;
    });
  return (
    <>
      {contextHolder}
      <PaymentStyle className="pdnone"></PaymentStyle>
      <div className="payment">
        <div className="container">
          <div className="payment_content">
            <div className="payment_content-textbox headings">THANH TOÁN</div>
            <div className="payment_content-box">
              <div className="productpayment">
                <table>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Hình ảnh</th>
                      <th>Tên sản phẩm</th>
                      <th>Giá</th>
                      <th>Số Lượng</th>
                      <th>Điều Chỉnh</th>
                      <th style={{ width: "1%" }}>Tổng Tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length !== 0 ? (
                      cart.map((e, i) => (
                        <OrderTable
                          key={e.id}
                          {...e}
                          stt={i + 1}
                          handleMulti={handleMulti}
                          handlePlus={handlePlus}
                          removeProduct={removeProduct}
                        />
                      ))
                    ) : (
                      <div className="none">
                        <div className="pst">
                          <FontAwesomeIcon icon={faCartPlus} className="cart" />
                          <p className="desc">
                            Chưa có sản phẩm nào trong giỏ hàng
                          </p>
                          <Link to={PATH.home} className="linkbuy">
                            Tiếp Tục Mua Hàng
                          </Link>
                        </div>
                      </div>
                    )}
                  </tbody>
                  <div className="totalprice">
                    <span>Tổng Cộng</span>
                    <span>{VND.format(total)}</span>
                  </div>
                </table>
              </div>
              <div className="form-group">
                <h2 className="title">Thông Tin Khách Hàng</h2>
                <Field
                  name="Họ Tên"
                  required
                  placeholder="Nhập Họ Tên"
                  value={(form && form.name) || ""}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Field
                  name="Số Điện Thoại"
                  required
                  placeholder="Nhập Số Điên Thoại"
                  value={(form && form.phone) || ""}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <label htmlFor="location" className="text">
                  Địa Chỉ
                </label>
                <Field value="Thành Phố Hồ Chí Minh" />
                <select
                  id="location"
                  value={(form && form.district) || ""}
                  onChange={(ev) => handleLocation(ev)}
                >
                  {location &&
                    location.districts.map((e, i) => (
                      <option value={e.name} key={e.code}>
                        {e.name}
                      </option>
                    ))}
                </select>
                <select
                  value={(form && form.wards) || ""}
                  onChange={(e) => setForm({ ...form, wards: e.target.value })}
                >
                  {wards ? (
                    wards.map((e, i) => (
                      <option value={e.name} key={e.code}>
                        {e.name}
                      </option>
                    ))
                  ) : (
                    <option value="default">Phường Nguyễn Thái Bình</option>
                  )}
                </select>
                <CustomFeild></CustomFeild>
                <Field
                  placeholder="Nhập tên đường, số nhà, ..."
                  value={(form && form.street) || ""}
                  onChange={(e) => setForm({ ...form, street: e.target.value })}
                />

                <button className="btnanimate" onClick={handlePayment}>
                  Đặt Hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
