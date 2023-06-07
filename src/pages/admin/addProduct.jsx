import React, { useState } from "react";
import { styled } from "styled-components";
import Field from "../../components/field";
import { Button, message } from "antd";
import { PATH } from "../../paths";
import { useNavigate } from "react-router-dom";
import { ProductServices } from "../../services/productServices";
const StyleAdd = styled.div`
  display: grid;
  grid-template-columns: 500px 1fr;
  padding: 90px 100px;
  align-items: center;
  .image {
    height: 300px;
    width: 300px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      max-width: 100%;
      min-height: 100%;
      min-width: 100%;
      object-fit: cover;
      transform: translate(-50%, -50%);
    }
  }
  .form-group {
    width: 550px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  label {
    color: #992931;
    font-weight: 600;
    text-transform: uppercase;
  }
  select {
    width: 100%;
    padding: 7px 10px;
    border-radius: 8px;
    margin: 15px 0;
    border: 2px solid #888;
  }
  .add {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 30px;
  }
  input[type="file"] {
    width: 95%;
    border: 2px solid #888;

    padding: 7px 10px;
    background: #fff;
    margin-top: 15px;
    border-radius: 8px;
  }
`;

export default function AddProduct() {
  const [form, setForm] = useState({});
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  //   Add Product
  const handleAddProduct = async () => {
    if (Object.keys(form).length !== 6) {
      messageApi.error("Vui Lòng Nhập Đầy Đủ Thông Tin");
    } else {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("discount", form.discount);
      formData.append("category_id", form.category);
      formData.append("file", form.fileName);
      await ProductServices.postProduct(formData);
      localStorage.setItem("addProduct", "null");
      navigate(PATH.admin);
    }
  };
  //   Xử lý File
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
            name="Tên Sản Phẩm"
            placeholder="Nhập Tên Sản Phẩm"
            color
            required
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Field
            name="Mô Tả"
            placeholder="Nhập mô tả"
            required
            color
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <Field
            name="Giá"
            placeholder="Nhập giá sản phẩm"
            required
            color
            value={form.price || ""}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <Field
            name="Giảm"
            placeholder="Nhập % giảm"
            required
            color
            value={form.discount || ""}
            onChange={(e) => setForm({ ...form, discount: e.target.value })}
          />
          <div className="field">
            <label htmlFor="category">Danh Mục</label>
            <select
              id="category"
              value={form.category || ""}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value={1}>Coffee</option>
              <option value={2}>Preeze</option>
              <option value={3}>Trà</option>
              <option value={4}>Khác</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="photo">Hình ảnh</label>
            <input type="file" id="photo" name="file" onChange={handleFile} />
          </div>
          <Button type="primary" className="add" onClick={handleAddProduct}>
            Thêm Sản Phẩm
          </Button>
        </div>
      </StyleAdd>
    </div>
  );
}
