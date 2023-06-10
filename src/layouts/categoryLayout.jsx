import {
  faArrowDownWideShort,
  faList,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Paginate from "../components/paginate";
import { Outlet } from "react-router-dom";
import { useStatus } from "../components/Context/StatusContext";
import ProductItem from "../components/productItem";
import { scroll } from "../assets/js/scrolltop";
import { UsePaginate } from "../components/Context/PaginateContext";

const StyleCoffe = styled.div`
  padding: 130px 0 0;
  background: #222;
`;
export default function CategoryLayout() {
  const { status, render } = useStatus();
  const [name, setName] = useState("Cà Phê");
  const url = location.href.split("category")[1];
  const { handleSort, page } = UsePaginate();

  useEffect(() => {
    document.querySelector(".header .nav").classList.remove("active");
    scroll();
    if (url) {
      switch (url) {
        case "/":
          setName("Cà Phê");
          break;
        case "/preeze":
          setName("Preeze");
          break;
        case "/tea":
          setName("Trà");
          break;
        case "/different":
          setName("Khác");
          break;
      }
    }
  }, [url]);
  return (
    <>
      <StyleCoffe className="pdnone"></StyleCoffe>
      <main className="main">
        <section className="coffee">
          <div className="container">
            <div className="coffee_content">
              <div className="coffee_content-heading headings">
                {name && name}
              </div>
              <div className="coffee_content-box">
                <div className="product">
                  <div className="box">
                    <div className="tabs">
                      <span className="text">How To Show: </span>
                      <span onClick={(ev) => render(ev)}>
                        <FontAwesomeIcon icon={faTableCells} id="cell" />
                      </span>
                      <span onClick={(ev) => render(ev)}>
                        <FontAwesomeIcon icon={faList} id="row" />
                      </span>
                    </div>
                    <div className="sort">
                      <span className="text">Sắp xếp:</span>
                      <FontAwesomeIcon icon={faArrowDownWideShort} />
                      <select onChange={(ev) => handleSort(ev)}>
                        <option value="0">Mặc định</option>
                        <option value="1">Giá giảm dần</option>
                        <option value="2">Giá tăng dần</option>
                        <option value="3">Hàng mới nhất</option>
                        <option value="4">Hàng cũ nhất</option>
                      </select>
                    </div>
                  </div>
                  <div
                    className={
                      status ? "list productcpn column" : "list productcpn"
                    }
                  >
                    <Outlet />
                  </div>
                  <Paginate totalPage={page} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
