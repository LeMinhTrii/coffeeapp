import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { styled } from "styled-components";

const StylePagiNate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0 0;
  ul {
    display: flex;
    gap: 5px;
    .page-item {
      padding: 7px 15px;
      text-align: center;
      background: #53a16e;
      cursor: pointer;
      &.active {
        .page-link {
          color: #b00b58;
        }
      }
      .page-link {
        color: #fff;
        font-weight: 600;
        display: inline-block;
      }
    }
  }
`;
export default function Paginate({ totalPage }) {
  // lấy query ở url
  const [search, useSearch] = useSearchParams();
  const currentPage = parseInt(search.get("page") || 1);
  const _search = new URLSearchParams(search);
  //   lấy link hiện tại
  const { pathname } = useLocation();
  const renderItem = () => {
    const list = [];
    let start = currentPage - 2;
    let end = currentPage + 2;
    if (start < 1) {
      start = 1;
      end = start + 4;
    }
    if (end > totalPage) {
      end = totalPage;
      start = end - 4;
      if (start < 1) start = 1;
    }
    for (let i = start; i <= end; i++) {
      _search.set("page", i);
      list.push(
        <li
          key={i}
          className={i == currentPage ? "page-item active" : "page-item"}
        >
          <Link to={`${pathname}?${_search.toString()}`} className="page-link">
            {i}
          </Link>
        </li>
      );
    }
    return list;
  };
  //   next page
  _search.set("page", currentPage + 1);
  const nextLink = `${pathname}?${_search.toString()}`;
  //   pre page
  _search.set("page", currentPage - 1);
  const preLink = `${pathname}?${_search.toString()}`;
  return (
    <StylePagiNate>
      <ul>
        {currentPage > 1 && (
          <li className="page-item">
            <Link to={preLink} className="pre">
              <FontAwesomeIcon icon={faArrowLeft} color="#fff" />
            </Link>
          </li>
        )}

        {renderItem()}
        {currentPage < totalPage && (
          <li className="page-item">
            <Link to={nextLink} className="next">
              <FontAwesomeIcon icon={faArrowRight} color="#fff" />
            </Link>
          </li>
        )}
      </ul>
    </StylePagiNate>
  );
}
