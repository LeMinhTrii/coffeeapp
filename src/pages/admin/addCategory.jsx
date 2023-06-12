import { Button, message } from "antd";
import React, { useState } from "react";
import { PATH } from "../../paths";
import { CategoryServices } from "../../services/categoryServices";
import { useNavigate } from "react-router-dom";
import Field from "../../components/field";
import { StyleAdd } from "./addProduct";

export default function AddCategory() {
  const [form, setForm] = useState({});
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  //   Add Category
  const handleAddCategory = async () => {
    if (Object.keys(form).length !== 2) {
      messageApi.error("Vui Lòng Nhập Đầy Đủ Thông Tin");
    } else {
      const formData = new FormData();
      formData.append("name_category", form.name);
      formData.append("file", form.fileName);
      await CategoryServices.postCategory(formData);
      localStorage.setItem("addCategory", "null");
      navigate(PATH.category);
    }
  };
  const handleFile = (ev) => {
    const file = ev.target.files[0];
    setForm({ ...form, fileName: file });
    // display image selected
    const reader = new FileReader();
    reader.readAsDataURL(file);
    if (file) {
      reader.onload = () => {
        setImage(reader.result);
      };
    } else {
      setImage("");
    }
  };
  return (
    <div className="manager_content-box">
      {contextHolder}
      <StyleAdd>
        <div className="image">
          {image ? (
            <img src={image} />
          ) : (
            <img src="/src/assets/image/Default_Image_Thumbnail.png" />
          )}
        </div>
        <div className="form-group">
          <Field
            name="Tên Danh Mục"
            placeholder="Nhập Tên Danh Mục"
            color
            required
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <div className="field">
            <label htmlFor="photo">Hình ảnh</label>
            <input type="file" id="photo" name="file" onChange={handleFile} />
          </div>
          <Button type="primary" className="add" onClick={handleAddCategory}>
            Thêm Danh Mục
          </Button>
        </div>
      </StyleAdd>
    </div>
  );
}
