import React, { useEffect, useState } from "react";
import ProductItemMini, {
  SkeletonProductItemMini,
} from "../../components/Product/productItemMini";
import Paginate from "../../components/paginate";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { PATH } from "../../paths";
import { ProductServices } from "../../services/productServices";
import { message } from "antd";

export default function Admin() {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState();
  const messageAdd = localStorage.getItem("addProduct");
  const messageEdit = localStorage.getItem("editProduct");
  useEffect(() => {
    getProduct();
  }, []);
  // getAllProduct
  const getProduct = async () => {
    const Product = await ProductServices.getProduct();
    await setData(Product.data);
  };
  // deleteProductById
  const handleDelete = async (id) => {
    await ProductServices.deleteProduct(id);
    getProduct();
    messageApi.success("Xóa Sản Phẩm Thành Công");
  };
  // message Add Product Susscess
  if (messageAdd) {
    messageApi.success("Thêm Sản Phẩm Thành Công");
    setTimeout(() => {
      localStorage.removeItem("addProduct");
    }, 5000);
  }
  // message Edit Product Susscess
  if (messageEdit) {
    messageApi.success("Sửa Sản Phẩm Thành Công");
    setTimeout(() => {
      localStorage.removeItem("editProduct");
    }, 5000);
  }
  return (
    <>
      {contextHolder}
      <div className="manager_content-box">
        <div className="textbox">
          <div className="heading">Product</div>
          <div className="darkmode">
            <Link to={PATH.addproduct}>
              <Button type="primary" className="btnadd">
                Thêm Sản Phẩm
              </Button>
            </Link>
          </div>
        </div>
        <div className="productlist_account">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Mô tả</th>
                <th>Giá</th>
                <th>Giảm</th>
                <th>Danh Mục</th>
                <th>Chức Năng</th>
              </tr>
            </thead>
            <tbody>
              {data
                ? data.product.map((e) => (
                    <ProductItemMini key={e.id} {...e} remove={handleDelete} />
                  ))
                : Array.from(Array(20)).map((_, i) => (
                    <SkeletonProductItemMini key={i} />
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
