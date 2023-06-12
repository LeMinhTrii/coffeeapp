import React, { useEffect, useState } from "react";
import OrderItem from "../../components/Order/orderItem";
import { Button, message } from "antd";
import CategoryItem, { SkeletonCategoryItem } from "../../components/Category";
import { CategoryServices } from "../../services/categoryServices";
import { PATH } from "../../paths";
import { Link } from "react-router-dom";

export default function Category() {
  const [category, setCategory] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const messageAdd = localStorage.getItem("addCategory");
  const messageEdit = localStorage.getItem("editCategory");
  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = async () => {
    const category = await CategoryServices.getCategory();
    await setCategory(category.data);
  };
  const handleDeleteCategory = async (id) => {
    await CategoryServices.deleCategoryById(id);
    getCategory();
    messageApi.success("Xóa Danh Mục Thành Công");
  };
  // message Add Category Susscess
  if (messageAdd) {
    messageApi.success("Thêm Danh Mục Thành Công");
    setTimeout(() => {
      localStorage.removeItem("addCategory");
    }, 2000);
  }
  // message Edit Category Susscess
  if (messageEdit) {
    messageApi.success("Sửa Danh Mục Thành Công");
    setTimeout(() => {
      localStorage.removeItem("editCategory");
    }, 2000);
  }
  return (
    <>
      {contextHolder}
      <div className="manager_content-box" style={{ paddingBottom: "50px" }}>
        <div className="textbox">
          <div className="heading">Category</div>
          <Button type="primary" className="btnadd">
            <Link to={PATH.addcategory}>Thêm Danh Mục</Link>
          </Button>
        </div>
        <div className="productlist_account">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Tên danh mục</th>
                <th style={{ width: "74.49%" }}>Hình ảnh</th>
                <th>Chức Năng</th>
              </tr>
            </thead>
            <tbody>
              {category
                ? category.map((e) => (
                    <CategoryItem
                      key={e.id}
                      {...e}
                      handleDeleteCategory={handleDeleteCategory}
                    />
                  ))
                : Array.from(Array(10)).map((_, i) => (
                    <SkeletonCategoryItem key={i} />
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
