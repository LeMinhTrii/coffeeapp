import React, { useEffect, useState } from "react";
import OrderItem from "../../components/Order/orderItem";
import { Button } from "antd";
import CategoryItem, { SkeletonCategoryItem } from "../../components/Category";
import { CategoryServices } from "../../services/categoryServices";

export default function Category() {
  const [category, setCategory] = useState();
  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = async () => {
    const category = await CategoryServices.getCategory();
    await setCategory(category.data);
  };
  console.log(category);
  return (
    <>
      <div className="manager_content-box" style={{ paddingBottom: "50px" }}>
        <div className="textbox">
          <div className="heading">Category</div>
          <Button type="primary" className="btnadd">
            Thêm Danh Mục
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
                ? category.map((e) => <CategoryItem key={e.id} {...e} />)
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
