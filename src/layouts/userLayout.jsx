import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { PATH } from "../paths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faCircleXmark,
  faFileImport,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../components/Context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useUpload } from "../components/Context/UploadContext";
import { scroll } from "../assets/js/scrolltop";

export default function UserLayout() {
  scroll();
  const { data, coverimage } = useAuth();
  const {
    handleFile,
    handleUpdateAvatar,
    image,
    handleClose,
    openPopup,
    contextHolder,
    openbgrCover,
    closebgrCover,
    handleUpdateCoverImage,
  } = useUpload();

  const navigate = useNavigate();
  useEffect(() => {
    !data && navigate(PATH.login);
  }, [data]);

  return (
    <>
      {contextHolder}
      <div className="noneuser"></div>
      <section className="userbanner">
        <div className="container">
          <div className="userbanner_content">
            <div className="userbanner_content-photo">
              <div className="coverimage">
                <img
                  src={
                    (image && image.avatar) ||
                    (coverimage && coverimage[0].filepath) ||
                    PATH.imageBackgroundDefault
                  }
                />
                <FontAwesomeIcon
                  icon={faCamera}
                  className="camera"
                  onClick={(e) => openbgrCover()}
                />
              </div>
              <div className="userphoto">
                <div className="thumnail">
                  <img
                    src={(data && data.urlAvatar) || PATH.imageUrlDefault}
                    alt=""
                  />
                  <FontAwesomeIcon
                    icon={faCamera}
                    className="cameraavatar"
                    onClick={(e) => openPopup(e)}
                  />
                </div>
                <p className="name">{data && data.name}</p>
              </div>
              <div className="tabs">
                <NavLink to={PATH.user} className="tab" end>
                  Hồ Sơ
                </NavLink>
                <NavLink to={PATH.whistlist} className="tab">
                  Sản phẩm yêu thích
                </NavLink>
                {/* <NavLink to={PATH.buyhistory} className="tab">
                  Lịch sử mua hàng
                </NavLink> */}
                <NavLink to={PATH.changepass} className="tab">
                  Đổi mật khẩu
                </NavLink>
              </div>
            </div>
            <div className="userbanner_content-box">{<Outlet />}</div>
            <div className="userbanner_content-empty"></div>
          </div>
        </div>
      </section>
      <div className="popupchangeavatar">
        <div className="box">
          <div className="thumnail">
            <img
              src={
                (image && image.avatar) ||
                (data && data.urlAvatar) ||
                PATH.imageUrlDefault
              }
            />
          </div>
          <div className="content">
            <label>
              <span className="title">Chọn Hình Đại Diện</span>
              <label className="boxfile">
                <FontAwesomeIcon icon={faFileImport} />
                <p className="text">
                  Kéo Thả Hình Vào Đây Hoặc Chọn Từ Thư Mục
                </p>
                <input
                  type="file"
                  name="file"
                  onChange={(ev) => handleFile(ev)}
                />
              </label>
            </label>
            <button className="save" onClick={(e) => handleUpdateAvatar(data)}>
              Lưu Thay Đổi
            </button>
          </div>
          <div className="close" onClick={(e) => handleClose(e)}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </div>
        </div>
      </div>
      <div className="popupcoverbackground">
        <div className="box">
          <div className="thumnail">
            <img
              src={
                (image && image.avatar) ||
                (coverimage && coverimage[0].filepath) ||
                PATH.imageBackgroundDefault
              }
            />
          </div>
          <div className="content">
            <label>
              <span className="title">Chọn Ảnh Bìa</span>
              <label className="boxfile">
                <FontAwesomeIcon icon={faFileImport} />
                <p className="text">
                  Kéo Thả Hình Vào Đây Hoặc Chọn Từ Thư Mục
                </p>
                <input
                  type="file"
                  name="file"
                  onChange={(ev) => handleFile(ev)}
                />
              </label>
            </label>
            <button
              className="save"
              onClick={(e) => handleUpdateCoverImage(data)}
            >
              Lưu Thay Đổi
            </button>
          </div>
          <div className="close" onClick={(e) => closebgrCover(e)}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </div>
        </div>
      </div>
    </>
  );
}
