import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductServices } from "../../services/productServices";
import Field from "../../components/field";
import { Button } from "antd";
import { styled } from "styled-components";
import { useGetProduct } from "../../hooks/useGetProduct";
import { PATH } from "../../paths";

export const StyleEdit = styled.div`
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
export default function EditProduct() {
  const { data } = useGetProduct();
  console.log(data);
  let [form, setForm] = useState({});
  const [image, setImage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  //   Lấy Dữ Liệu Theo Id Để Hiển Thị
  const ProductEdit = data && data.find((e) => e.id === parseInt(id));
  //   Update Dữ Liệu
  const handleEdit = async () => {
    const dataUpdate = {
      name: (form && form.name) || (ProductEdit && ProductEdit.name),
      description:
        (form && form.description) || (ProductEdit && ProductEdit.description),
      price: (form && form.price) || (ProductEdit && ProductEdit.price),
      discount:
        (form && form.discount) || (ProductEdit && ProductEdit.discount),
      category_id:
        (form && form.category_id) || (ProductEdit && ProductEdit.category_id),
      file: form && form.fileName,
    };
    await ProductServices.putProduct(id, dataUpdate);
    localStorage.setItem("editProduct", "null");
    navigate(PATH.admin);
  };
  // Xử lý File
  const handleFile = (e) => {
    const file = e.target.files[0];
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
    <>
      <div className="manager_content-box">
        <StyleEdit>
          <div className="image">
            {image ? (
              <img src={image} />
            ) : ProductEdit ? (
              <img src={ProductEdit.urlThumnail} />
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
              defaultValue={(ProductEdit && ProductEdit.name) || ""}
              onChange={(e) => (form.name = e.target.value)}
            />
            <Field
              name="Mô Tả"
              placeholder="Nhập mô tả"
              required
              color
              defaultValue={(ProductEdit && ProductEdit.description) || ""}
              onChange={(e) => (form.description = e.target.value)}
            />
            <Field
              name="Giá"
              placeholder="Nhập giá sản phẩm"
              required
              color
              defaultValue={(ProductEdit && ProductEdit.price) || ""}
              onChange={(e) => (form.price = e.target.value)}
            />
            <Field
              name="Giảm"
              placeholder="Nhập % giảm"
              required
              color
              defaultValue={(ProductEdit && String(ProductEdit.discount)) || ""}
              onChange={(e) => (form.discount = e.target.value)}
            />
            <div className="field">
              <label htmlFor="category">Danh Mục</label>
              <select
                id="category"
                value={
                  (form && form.category_id) ||
                  (ProductEdit && ProductEdit.category_id) ||
                  ""
                }
                onChange={(e) =>
                  setForm({ ...form, category_id: e.target.value })
                }
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
            <Button type="primary" className="add" onClick={handleEdit}>
              Sửa Sản Phẩm
            </Button>
          </div>
        </StyleEdit>
      </div>
    </>
  );
}
