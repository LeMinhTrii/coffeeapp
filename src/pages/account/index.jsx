import React, { useEffect, useState } from "react";
import Field from "../../components/field";
import { UserServices } from "../../services/userServices";
import { message } from "antd";
import { PATH } from "../../paths";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({});
  const { handleLogin, contextHolder } = useAuth();
  const handleKey = (ev) => {
    if (ev.key === "Enter") {
      handleLogin(form);
    }
  };
  return (
    <>
      {contextHolder}
      <Field
        name="email"
        placeholder="Nhập Địa Chỉ Email"
        required
        value={form.email || ""}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        onKeyUp={handleKey}
      />
      <Field
        type="password"
        name="mật khẩu"
        placeholder="Nhập Mật Khẩu"
        required
        value={form.password || ""}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        onKeyUp={handleKey}
      />
      <span className="text">Quên mật khẩu ?</span>
      <button className="btnlogin" onClick={(e) => handleLogin(form)}>
        ĐĂNG NHẬP
      </button>
      <div className="desc">
        Chúng tôi cam kết bảo mật và sẽ không bao
        <br /> giờ đăng
        <br /> hay chia sẻ thông tin mà chưa có được sự đồng ý của bạn.
      </div>
    </>
  );
}
