import React, { useState } from "react";
import { useAuth } from "../../components/Context/AuthContext";
import Field from "../../components/field";
import { Button, message } from "antd";
import { UserServices } from "../../services/userServices";

export default function ChangePass() {
  scroll();
  const [form, setForm] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const { data } = useAuth();
  const handleUpdatePass = async () => {
    const objPass = {
      passOld: form && form.passOld,
      passNew: form && form.passNew,
      passNewComfirm: form && form.passNewComfirm,
    };
    try {
      const ChangePass = await UserServices.updatePass(
        data && data.id,
        objPass
      );
      console.log(objPass);
      message.success(ChangePass.data.message);
      setForm();
    } catch (error) {
      messageApi.error(error.response.data.message);
    }
  };
  return (
    <>
      {contextHolder}
      <h2 className="heading">Đổi Mật Khẩu</h2>
      <div className="form-group">
        <Field
          type="password"
          name="Mật Khẩu Cũ"
          white
          value={(form && form.passOld) || ""}
          onChange={(e) => setForm({ ...form, passOld: e.target.value })}
        />
        <Field
          type="password"
          name="Mật Khẩu Mới"
          white
          value={(form && form.passNew) || ""}
          onChange={(e) => setForm({ ...form, passNew: e.target.value })}
        />
        <Field
          type="password"
          name="Nhập Lại Mật Khẩu Mới"
          white
          value={(form && form.passNewComfirm) || ""}
          onChange={(e) => setForm({ ...form, passNewComfirm: e.target.value })}
        />
        <div className="flex">
          <Button className="btnsave" onClick={handleUpdatePass}>
            Lưu Thay Đổi
          </Button>
        </div>
      </div>
    </>
  );
}
