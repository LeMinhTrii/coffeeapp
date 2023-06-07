import React, { useEffect, useState } from "react";
import CategoryAround from "../components/around";
import ProductItem, { ProductItemSkeleton } from "../components/productItem";
import { PATH } from "../paths";
import { Link, NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { slider } from "../libs/slider";
import BlogItem from "../components/blogItem";
import { useGetProduct } from "../hooks/useGetProduct";
import { ProductServices } from "../services/productServices";
import { scroll } from "../assets/js/scrolltop";
import { message } from "antd";
import { useCart } from "../components/Context/CartContext";
import { useGetCategory } from "../hooks/useGetCategory";
export default function Home() {
  // lib slider
  const { data } = useGetProduct();
  const [category, setCategory] = useState();
  const [categoryid, setCategoryId] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const { data: categories } = useGetCategory();
  const { handleCart } = useCart();
  useEffect(() => {
    categoryid === 0 && scroll();
    (async () => {
      const Product = await ProductServices.getProductByCategory(
        categoryid || 1
      );
      await setCategory(Product.data);
    })();
  }, [categoryid]);
  // Xử Lý Dữ Liệu Theo Tab
  const handleTab = (e) => {
    e.preventDefault();
    document.querySelectorAll(".tab").forEach((e) => {
      e.classList.remove("active");
    });
    e.target.className = "tab active";
    setCategoryId(parseInt(e.target.id));
  };
  const handleHeart = async (obj) => {
    try {
      const addWishList = await ProductServices.postWishList(obj);
      messageApi.success(addWishList.data.message);
    } catch (error) {
      messageApi.error("Bạn Phải Đăng Nhập");
    }
  };
  const messageAddCart = localStorage.getItem("addcart");
  if (messageAddCart) {
    messageApi.success(messageAddCart);
    setTimeout(() => {
      localStorage.removeItem("addcart");
    }, 2000);
  }
  const handleLink = () => {
    if (categoryid === 0 || categoryid === 1) {
      return PATH.coffee;
    } else if (categoryid === 2) {
      return PATH.preeze;
    } else if (categoryid === 3) {
      return PATH.tea;
    }
    return PATH.different;
  };
  return (
    <main className="main">
      {contextHolder}
      <section className="banner">
        <div className="container">
          <div className="banner_content">
            <div className="banner_content-box">
              <span className="text">100% PREMIUM QUALITY</span>
              <h1 className="heading">Brazilian Sweet Cappuccino</h1>
              <p className="desc">
                Premium cofee blensds for everyone by labella
              </p>
              <a href="javasript:void(0)" className="btn">
                Explore Now
              </a>
            </div>
            <div className="banner_content-photo">
              <img src="/src/assets/image/coffebanner.png" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="category">
        <div className="container">
          <div className="category_content">
            <div className="category_content-box">
              {categories &&
                categories.map((e) => <CategoryAround key={e.id} {...e} />)}
            </div>
          </div>
        </div>
      </section>
      <section className="product">
        <div className="container">
          <div className="product_content">
            <h2 className="product_content-heading headings">
              Sản Phẩm <span>Thịnh Hành</span>
            </h2>
            <div className="product_content-tablist">
              <NavLink
                to={PATH.about}
                className="tab active"
                id="1"
                onClick={(e) => handleTab(e)}
              >
                Cà Phê
              </NavLink>
              <NavLink
                to={PATH.about}
                className="tab"
                id="2"
                onClick={(e) => handleTab(e)}
              >
                Freeze
              </NavLink>
              <NavLink
                to={PATH.about}
                className="tab"
                id="3"
                onClick={(e) => handleTab(e)}
              >
                Trà
              </NavLink>
              <NavLink
                to={PATH.about}
                className="tab"
                id="4"
                onClick={(e) => handleTab(e)}
              >
                Khác
              </NavLink>
            </div>
            <div className="product_content-box">
              {category &&
                category
                  .slice(0, 4)
                  .map((e) => (
                    <ProductItem
                      key={e.id}
                      {...e}
                      handleHeart={handleHeart}
                      handleCart={handleCart}
                    />
                  ))}
            </div>
            <button className="product_content-btn">
              <Link to={handleLink()}>Xem Thêm</Link>
            </button>
          </div>
        </div>
      </section>
      <section className="introduce">
        <div className="container">
          <div className="introduce_content">
            <div className="introduce_content-box">
              <div className="thumnail">
                <img src="/src/assets/image/introthumnail.png" alt="" />
              </div>
              <div className="content">
                <h2 className="heading">Brasilian Coffee Buy 1 + Get 1 Free</h2>
                <p className="text">Order Now! And Get 50% Off</p>
                <p className="desc">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Excepturi sequi, consequatur magni quos doloribus atque sint
                  sit, corporis fugit, dolorem dicta qui.
                </p>
                <button className="btn">Purchase Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="selling">
        <div className="container">
          <div className="selling_content">
            <div className="selling_content-heading headings">
              Sản Phẩm <span>Bán Chạy</span>
            </div>
            <div className="selling_content-box">
              <Slider {...slider}>
                {data
                  ? data.map((e) => (
                      <ProductItem
                        key={e.id}
                        {...e}
                        column
                        handleHeart={handleHeart}
                        handleCart={handleCart}
                      />
                    ))
                  : Array.from(Array(10)).map((_, i) => (
                      <ProductItemSkeleton key={i} column />
                    ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
      <section className="blog">
        <div className="container">
          <div className="blog_content">
            <div className="blog_content-heading headings">
              Blog <span>Nổi Bật</span>
            </div>
            <div className="blog_content-box">
              <BlogItem
                thumnail={"blogone.jpg"}
                day={"Webheay Theme | 17 January 2021"}
                name={"Repeat Predefined Chunks"}
                desc={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptaalias maiores ipsum Perferendis, impedit repudiandae. Velit ipsum Perferendis, impedit repudiandae.ipsum Perferendis, impedit repudiandae."
                }
              />
              <BlogItem
                thumnail={"blogtwo.jpg"}
                day={"Webheay Theme | 17 January 2021"}
                name={"Repeat Predefined Chunks"}
                desc={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptaalias maiores ipsum Perferendis, impedit repudiandae. Velit"
                }
              />
              <BlogItem
                thumnail={"blogthree.jpg"}
                day={"Webheay Theme | 17 January 2021"}
                name={"Repeat Predefined Chunks"}
                desc={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptaalias maiores ipsum Perferendis, impedit repudiandae. Velit"
                }
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
