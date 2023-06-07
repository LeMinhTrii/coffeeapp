import React, { useEffect, useState } from "react";
import Field from "../../components/field";
import { Button, message } from "antd";
import { useAuth } from "../../components/Context/AuthContext";
import { scroll } from "../../assets/js/scrolltop";
import { UserServices } from "../../services/userServices";

export default function User() {
  useEffect(() => {
    scroll();
  }, []);
  const [form, setForm] = useState();
  const { data, getDataUser } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  const handleUpdate = async () => {
    if (form) {
      const user = {
        name: (form && form.name) || (data && data.name),
        phone_number: (form && form.phone) || (data && data.phone_number),
      };
      try {
        const updateUser = await UserServices.updateUser(data && data.id, user);
        message.success(updateUser.data.message);
        getDataUser();
      } catch (error) {
        messageApi.error(error.response.data.message);
      }
    }
  };
  return (
    <>
      {contextHolder}
      <h2 className="heading">Thông Tin Cá Nhân</h2>
      <div className="form-group">
        <Field
          disabled
          name="email"
          white
          defaultValue={(data && data.email) || ""}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Field
          name="Họ tên"
          white
          defaultValue={(data && data.name) || ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Field
          name="Số điện thoại"
          white
          defaultValue={(data && data.phone_number) || ""}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <div className="flex">
          <Button className="btnsave" onClick={handleUpdate}>
            Lưu Thay Đổi
          </Button>
        </div>
      </div>
    </>
  );
}
