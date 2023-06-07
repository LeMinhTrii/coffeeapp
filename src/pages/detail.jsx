import { faComments, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ProductItem, { ProductItemSkeleton } from "../components/productItem";
import Slider from "react-slick";
import { slider } from "../libs/slider";
import ReviewItem from "../components/reviewItems";
import { useParams } from "react-router-dom";
import { ProductServices } from "../services/productServices";
import { VND } from "../assets/js/handlePrice";
import { scroll } from "../assets/js/scrolltop";
import { useAuth } from "../components/Context/AuthContext";
import { PATH } from "../paths";
import { message } from "antd";
import { useCart } from "../components/Context/CartContext";
const StyLeDetail = styled.div`
  padding-top: 130px;
  background: #222;
`;
export default function Detail() {
  const { data: userdata } = useAuth();
  const { id } = useParams();
  const [data, setData] = useState();
  const [related, setRelated] = useState();
  const [comment, setComment] = useState();
  const [form, setForm] = useState();
  const { handleCart } = useCart();

  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    scroll();
    getProductById(id);
    getComment(id);
    document.querySelector("#searchproduct").classList.remove("active");
    document.querySelector(".header_search").classList.remove("active");
  }, [id]);
  useEffect(() => {
    data && getProductRelated();
  }, [data]);
  // Get Detail
  const getProductById = async (id) => {
    const product = await ProductServices.getDetail(id);
    await setData(product.data);
  };
  // Get Related Theo Category Id
  const getProductRelated = async () => {
    const productRelated = await ProductServices.getProductByCategory(
      data && data.category_id
    );
    await setRelated(productRelated.data);
  };
  // Get Comment By Product Id
  const getComment = async (id) => {
    try {
      const Comment = await ProductServices.getComment(id);
      await setComment(Comment.data);
    } catch (error) {
      setComment();
    }
  };
  const handleComment = async () => {
    if (form) {
      const commentdata = {
        user_id: userdata && userdata.id,
        product_id: id,
        content: form && form,
      };
      await ProductServices.postComment(commentdata);
      setForm();
      getComment(id);
    } else {
      messageApi.error("Vui Lòng Nhập Đánh Giá");
    }
  };
  const handleKey = (ev) => {
    if (ev.key === "Enter") {
      handleComment();
    }
  };
  return (
    <>
      {contextHolder}
      <StyLeDetail></StyLeDetail>
      <main className="main">
        <section className="detail">
          <div className="container">
            <div className="detail_content">
              <div className="detail_content-thumnail">
                <img src={data && data.urlThumnail} alt="" />
              </div>
              <div className="detail_content-box">
                <p className="name">{data && data.name}</p>
                <p className="desc">{data && data.description}</p>
                <p className="price">
                  <span>Giá:</span>
                  {data &&
                    VND.format(data.price - (data.price * data.discount) / 100)}
                  <span className="temp">
                    {data && data.discount !== 0 ? `-${data.discount}%` : ""}
                  </span>
                </p>
                <button
                  className="btnadd"
                  onClick={(e) => handleCart(data && data.id)}
                >
                  Thêm Vào Giỏ Hàng
                </button>
                <button className="wishlist">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="reviews">
          <div className="container">
            <div className="review_content">
              <div className="reviews_content-text">
                {`Reviews(${comment && comment.length})`}
              </div>
              <div className="reviews_content-form">
                {userdata && (
                  <div className="user">
                    <div className="photo">
                      <img
                        src={
                          (userdata && userdata.urlAvatar) ||
                          PATH.imageUrlDefault
                        }
                        alt=""
                      />
                    </div>
                    <p className="name">{userdata && userdata.name}</p>
                  </div>
                )}
                <div className="rating">
                  {/* <span>Customer Review </span> */}
                  {/* {Array.from(Array(5)).map((_, i) => (
                    <label key={i}>
                      <input type="radio" value={i + 1} name="rating" />
                      <FontAwesomeIcon icon={faStar} color="#cccccc" />
                    </label>
                  ))} */}
                </div>
                {userdata ? (
                  <div className="write">
                    <input
                      type="text"
                      placeholder="Đánh Giá Sản Phẩm"
                      value={form || ""}
                      onChange={(e) => setForm(e.target.value)}
                      onKeyUp={handleKey}
                    />
                    <button onClick={handleComment}>Gửi</button>
                  </div>
                ) : (
                  <div className="no_user">
                    Chỉ Những Người Đăng Nhập Mới Đánh Giá Sản Phẩm Được
                  </div>
                )}
              </div>
              <div className="reviews_content-review">
                {comment && comment.length != 0 ? (
                  comment.map((e) => <ReviewItem key={e.id} {...e} />)
                ) : (
                  <div className="no_review">
                    <div className="content">
                      <FontAwesomeIcon icon={faComments} />
                      <p>
                        Chưa có đánh giá nào bạn hãy là người đầu tiên đánh giá
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="related">
          <div className="container">
            <div className="related_content">
              <div className="related_content-heading headings">
                Sản Phẩm Liên Quan
              </div>
              <div className="related_content-box">
                <Slider {...slider}>
                  {related
                    ? related.map((e) => (
                        <ProductItem
                          key={e.id}
                          {...e}
                          column
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
      </main>
    </>
  );
}
