import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { PATH } from "../paths/index";
import { Button, Pagination, Switch } from "antd";
import {
  faClipboard,
  faHouse,
  faL,
  faListUl,
  faMoon,
  faRightFromBracket,
  faSun,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { scroll } from "../assets/js/scrolltop";
import { useAuth } from "../components/Context/AuthContext";

export default function AdminLayout() {
  scroll();
  const { data } = useAuth();
  const navigate = useNavigate();
  const [darkmode, setDarkMode] = useState(() => {
    const status = localStorage.getItem("status");
    if (status) return JSON.parse(status);
    return false;
  });
  useEffect(() => {
    localStorage.setItem("status", JSON.stringify(darkmode));
    data && data.type === 0 && navigate(PATH.home);
  }, [data]);
  const onChange = (ev) => {
    ev ? setDarkMode(true) : setDarkMode(false);
  };
  return (
    <>
      {data && data.type === 1 && (
        <div className={darkmode ? "manager dark" : "manager"}>
          <div className="manager_content">
            <div className="manager_content-tabs">
              <div className="account">
                <div className="thumnail">
                  <img src="/src/assets/image/user.png" alt="" />
                </div>
                <p className="name">Lê Minh Trí</p>
              </div>
              <div className="text">
                {darkmode ? (
                  <FontAwesomeIcon icon={faMoon} fontSize={30} />
                ) : (
                  <FontAwesomeIcon icon={faSun} fontSize={30} />
                )}
                <Switch onChange={onChange} defaultChecked={darkmode} />
              </div>

              <NavLink to={PATH.admin} className="tab" end>
                <FontAwesomeIcon icon={faHouse} />
                <span>Trang Chủ</span>
              </NavLink>
              <NavLink to={PATH.category} className="tab">
                <FontAwesomeIcon icon={faListUl} />
                <span>Danh Mục Sản Phẩm</span>
              </NavLink>
              <NavLink to={PATH.account} className="tab">
                <FontAwesomeIcon icon={faUser} />
                <span>Tài Khoản</span>
              </NavLink>
              <NavLink to={PATH.order} className="tab">
                <FontAwesomeIcon icon={faClipboard} />
                <span> Đơn Hàng</span>
              </NavLink>
              <NavLink to={PATH.home} className="tab">
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span>Đi Đến Trag Chủ</span>
              </NavLink>
            </div>
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}
