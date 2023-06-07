import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { PATH } from "../paths";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { message } from "antd";
import { scroll } from "../assets/js/scrolltop";

const StyleLogin = styled.div`
  padding-top: 130px;
  background: #222;
`;
export default function AccountLayout() {
  scroll();
  const [messageApi, contextHolder] = message.useMessage();
  const [active, setActive] = useState(false);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate(PATH.home);
  }, [user]);
  if (localStorage.getItem("created")) {
    messageApi.success("Đăng Ký Tài Khoản Thành Công");
    setTimeout(() => {
      localStorage.removeItem("created");
    }, 2000);
  }
  const handleTab = (ev) => {
    ev.target.id === "2" ? setActive(true) : setActive(false);
  };
  return (
    <>
      {contextHolder}
      <StyleLogin></StyleLogin>
      <main className="main">
        <section className="login">
          <div className="container">
            <div className="login_content">
              <div className="login_content-heading headings">
                {!active ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
              </div>
              <div className="login_content-box">
                <div className="thumnail">
                  <img src="/src/assets/image/coffebanner.png" alt="" />
                </div>
                <div className="content">
                  <div className="tabs">
                    <Link
                      to={PATH.login}
                      className={!active ? "tab active" : "tab"}
                      id="1"
                      onClick={handleTab}
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to={PATH.register}
                      className={active ? "tab active" : "tab"}
                      id="2"
                      onClick={handleTab}
                    >
                      Đăng ký
                    </Link>
                  </div>
                  <div className="form-group">
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
