import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faHeart,
  faCartShopping,
  faMagnifyingGlass,
  faXmark,
  faArrowUp,
  faClipboardList,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../paths";
import ItemCart from "../components/itemCart";
import {
  handeCLose,
  handleCart,
  handleScrollTop,
  handleSroll,
  handleUser,
} from "../assets/js/header";
import { styled } from "styled-components";
import { useAuth } from "./Context/AuthContext";
import { message } from "antd";
import { ProductServices } from "../services/productServices";
import ProductItemSearch, {
  ProductItemSearchSkeleton,
} from "./Product/productItemSearch";
import { VND } from "../assets/js/handlePrice";
import { useCart } from "./Context/CartContext";

const StyleAvatar = styled.div`
  position: relative;
  padding-bottom: 100%;
  overflow: hidden;
  width: 35px;
  height: 10px;
  img {
    border-radius: 50%;
    position: absolute;
    max-width: 100%;
    min-height: 100%;
    min-width: 100%;
    object-fit: cover;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export default function Header() {
  const [messageApi, contextHolder] = message.useMessage();
  const { data, handleLogout } = useAuth();
  const [value, setValue] = useState();
  const [datasearch, setDataSearch] = useState();
  // const [cart, setCart] = useState(() => {
  //   const cartLocal = localStorage.getItem("cart");
  //   if (cartLocal) return JSON.parse(cartLocal);
  //   return [];
  // });
  const { cart, handleMulti, handlePlus, removeProduct } = useCart();
  useEffect(() => {
    value &&
      (async () => {
        const product = await ProductServices.postSearch(value);
        await setDataSearch(product.data);
      })();
  }, [value]);
  useEffect(() => {
    handleSroll();
    handeCLose();
    handleCart();
    handleScrollTop();
    handleUser();
  }, []);
  if (localStorage.getItem("success")) {
    messageApi.success("Đăng Nhập Thành Công");
    setTimeout(() => {
      localStorage.removeItem("success");
    }, 2000);
  }
  const handleOpenSearch = () => {
    document.querySelector("#searchproduct").classList.toggle("active");
    document.querySelector(".header_search").classList.toggle("active");
  };
  const handleOpenNav = () => {
    document.querySelector(".header .nav").classList.toggle("active");
  };
  let total = 0;
  cart &&
    cart.forEach((e) => {
      total += (e.price - (e.price * e.discount) / 100) * e.quality;
    });

  return (
    <header className="header active">
      {contextHolder}
      <div className="container-fuild">
        <div className="header_content">
          {/* <div className="header_content-search">
            <input type="text" name="" id="" placeholder="Search Product" />
            <button>
              <FontAwesomeIcon icon={faMagnifyingGlass} color="#fff" />
            </button>
          </div> */}
          <div className="header_content-logo">
            <Link to={PATH.home}>
              <img
                src="https://res.cloudinary.com/dsuxginpx/image/upload/v1686175956/static/coffee-logo_kdo4w3.webp"
                alt=""
              />
            </Link>
          </div>
          <div className="header_content-box">
            <div className="user">
              {data ? (
                <StyleAvatar className="avt">
                  <img src={(data && data.urlAvatar) || PATH.imageUrlDefault} />
                </StyleAvatar>
              ) : (
                <Link to={PATH.login}>
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    color="#fff"
                    fontSize={25}
                  />
                </Link>
              )}
              {data ? (
                <div className="userbox active">
                  <Link to={PATH.user} className="thumnail">
                    <img
                      src={(data && data.urlAvatar) || PATH.imageUrlDefault}
                      alt=""
                    />
                    <div className="content">
                      <p className="name">{data && data.name}</p>
                      <p className="text">Quản lý tài khoản của bạn</p>
                    </div>
                  </Link>
                  {data && data.type === 1 && (
                    <Link to={PATH.admin} className="logout">
                      Quản Lý Hệ Thống
                    </Link>
                  )}
                  <Link to={PATH.changepass} className="logout">
                    Đổi Mật Khẩu
                  </Link>

                  <Link className="logout" onClick={(e) => handleLogout()}>
                    Đăng Xuất
                  </Link>
                </div>
              ) : (
                <div className="userbox" style={{ display: "none" }}></div>
              )}
            </div>
            <Link to={PATH.whistlist} className="heart --cpn ">
              <FontAwesomeIcon icon={faHeart} color="#fff" fontSize={25} />
            </Link>
            <Link to={PATH.listorder} className="heart --cpn ">
              <FontAwesomeIcon
                icon={faClipboardList}
                color="#fff"
                fontSize={25}
              />
            </Link>
            <div className="cart --cpn --cart">
              <FontAwesomeIcon
                icon={faCartShopping}
                color="#fff"
                fontSize={25}
              />
              <span className="quantity_cart">{cart && cart.length}</span>
            </div>
            <div className="hamburger" onClick={handleOpenNav}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
        </div>
      </div>
      <nav className="header-nav">
        <ul>
          <li>
            <Link to={PATH.home}>Trang Chủ</Link>
          </li>
          <li>
            <Link to={PATH.coffee}>Cà Phê </Link>
          </li>
          <li>
            <Link to={PATH.preeze}>Preeze </Link>
          </li>
          <li>
            <Link to={PATH.tea}>Trà </Link>
          </li>
          <li>
            <Link to={PATH.different}>Khác </Link>
          </li>
          <li>
            <Link to={PATH.about}>Về Chúng Tôi</Link>
          </li>
          <li>
            <Link to={PATH.contact}>Liên Hệ</Link>
          </li>
          <li>
            <input
              type="text"
              name="search"
              placeholder="Nhập Tên Sản Phẩm Cần Tìm Kiếm ...."
              id="searchproduct"
              value={(value && value) || ""}
              onChange={(e) => setValue(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              color="#fff"
              onClick={handleOpenSearch}
            />
          </li>
        </ul>
      </nav>
      <div className="header-cart">
        <p className="title">GIỎ HÀNG</p>
        <FontAwesomeIcon icon={faXmark} fontSize={25} className="close" />
        <div className="cartitem">
          {cart &&
            cart.map((e) => (
              <ItemCart
                key={e.id}
                {...e}
                handleMulti={handleMulti}
                handlePlus={handlePlus}
                removeProduct={removeProduct}
              />
            ))}
        </div>
        <div className="checkout">
          <p>Tổng Tiền: {VND.format(total)}</p>
          <button className="btncheckout">
            <Link to={PATH.payment} style={{ color: "#fff" }}>
              Thanh Toán
            </Link>
          </button>
        </div>
      </div>
      <div className="header-icon">
        <FontAwesomeIcon icon={faArrowUp} className="totop" />
      </div>
      <div className="header_search">
        <div
          className="header_search-box"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
            padding: 20,
          }}
        >
          {datasearch
            ? datasearch.map((e) => <ProductItemSearch key={e.id} {...e} />)
            : Array.from(Array(10)).map((_, i) => (
                <ProductItemSearchSkeleton key={i} />
              ))}
        </div>
      </div>
      <div className="nav">
        <ul>
          <li>
            <Link to={PATH.home}>Trang Chủ</Link>
          </li>
          <li>
            <Link to={PATH.coffee}>Cà Phê </Link>
          </li>
          <li>
            <Link to={PATH.preeze}>Preeze </Link>
          </li>
          <li>
            <Link to={PATH.tea}>Trà </Link>
          </li>
          <li>
            <Link to={PATH.different}>Khác </Link>
          </li>
          <li>
            <Link to={PATH.about}>Về Chúng Tôi</Link>
          </li>
          <li>
            <Link to={PATH.contact}>Liên Hệ</Link>
          </li>
          <li>
            <Link to={PATH.whistlist}>Sản Phẩm Yêu Thích</Link>
          </li>
          <li>
            <Link to={PATH.listorder}>Đơn Hàng</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
