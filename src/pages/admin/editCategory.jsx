import React, { useEffect, useState } from "react";
import { StyleEdit } from "./editProduct";
import Field from "../../components/field";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryServices } from "../../services/categoryServices";
import { PATH } from "../../paths";

export default function EditCategory() {
  const [category, setCategory] = useState();
  const [image, setImage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  let [form, setForm] = useState({});
  useEffect(() => {
    getAllCategory();
  });
  const getAllCategory = async () => {
    const Category = await CategoryServices.getCategory();
    await setCategory(Category.data);
  };
  //   Lấy Dữ Liệu Theo Id Để Hiển Thị
  const CategoryEdit = category && category.find((e) => e.id === parseInt(id));
  //   Update Dữ Liệu
  const handleEdit = async () => {
    const dataUpdate = {
      name_category: (form && form.name) || (CategoryEdit && CategoryEdit.name),
      file: form && form.fileName,
    };
    await CategoryServices.putCategory(id, dataUpdate);
    localStorage.setItem("editCategory", "null");
    navigate(PATH.category);
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
            ) : CategoryEdit ? (
              <img src={CategoryEdit.filepath} />
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
              defaultValue={(CategoryEdit && CategoryEdit.name_category) || ""}
              onChange={(e) => (form.name = e.target.value)}
            />
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
