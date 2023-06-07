import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { styled } from "styled-components";
import { PATH } from "../paths";
import { scroll } from "../assets/js/scrolltop";

const StyleBox = styled.div`
  padding: 130px 0 0;
  background: #222;
`;
export default function AboutLayout() {
  scroll();
  return (
    <>
      <StyleBox></StyleBox>
      <main className="main">
        <section className="about">
          <div className="container">
            <div className="about_content">
              <div className="about_content-heading headings">Về Chúng Tôi</div>
              <div className="about_content-tabs">
                <NavLink to={PATH.about} end className="tab">
                  Nguồn Gốc
                </NavLink>
                <NavLink to={PATH.service} end className="tab">
                  Dịch Vụ
                </NavLink>
                <NavLink to={PATH.job} end className="tab">
                  Nghề Nghiệp
                </NavLink>
              </div>
              <div className="about_content-box">
                <Outlet />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
