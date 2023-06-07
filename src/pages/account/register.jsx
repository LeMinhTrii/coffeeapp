import React, { useEffect, useState } from "react";
import Field from "../../components/field";
import { message } from "antd";
import { UserServices } from "../../services/userServices";
import { PATH } from "../../paths";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const navigator = useNavigate();
  //  Hàm xử lý đăng ký tài khoản
  const handleRegister = async () => {
    if (Object.entries(form).length !== 4) {
      messageApi.error("Vui Lòng Nhập Đầy Đủ Thông Tin");
    } else {
      try {
        await UserServices.register(form);
        localStorage.setItem("created", "Tài Khoản Của Bạn Đã Được Đăng Ký");
        navigator(PATH.login);
      } catch (error) {
        messageApi.error(error.response.data.message);
      }
    }
  };
  const handleKey = (ev) => {
    if (ev.key === "Enter") {
      handleRegister();
    }
  };
  return (
    <>
      {contextHolder}
      <Field
        name="họ tên"
        placeholder="Nhập Tên"
        required
        defaultValue={form.name || ""}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        onKeyUp={handleKey}
      />
      <Field
        name="số điện thoại"
        placeholder="Nhập Số Điện Thoại"
        required
        defaultValue={form.phone_number || ""}
        onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
        onKeyUp={handleKey}
      />
      <Field
        name="email"
        placeholder="Nhập Địa Chỉ Email"
        required
        defaultValue={form.email || ""}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        onKeyUp={handleKey}
      />
      <Field
        name="mật khẩu"
        placeholder="Nhập Mật Khẩu"
        required
        defaultValue={form.password || ""}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        onKeyUp={handleKey}
      />
      <button className="btnlogin" onClick={handleRegister}>
        TẠO TÀI KHOẢN
      </button>
      <div className="desc">
        Chúng tôi cam kết bảo mật và sẽ không bao
        <br /> giờ đăng
        <br /> hay chia sẻ thông tin mà chưa có được sự đồng ý của bạn.
      </div>
    </>
  );
}
