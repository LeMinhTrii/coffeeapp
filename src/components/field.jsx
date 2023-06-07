import React from "react";
import { styled } from "styled-components";
const StyleField = styled.div`
  label {
    text-transform: uppercase;
    font-size: 15px;
    display: inline-block;
    .required {
      color: red;
    }
    &.color {
      color: #992931;
    }
    &.white {
      color: #fff;
    }
  }
  input {
    margin: 15px 0;
    width: 100%;
    padding: 8px 15px;
    box-sizing: border-box;
    border-radius: 7px;
    display: block;
    border: 2px solid #888;
    transition: 1s;
    &:focus {
      border: 2px solid #53a16e;
      transition: 1s;
      outline: none;
    }
    &:disabled {
      background: #888;
      cursor: no-drop;
    }
  }
`;
export default function Field({
  type = "text",
  name,
  required,
  white,
  color,
  ...props
}) {
  return (
    <StyleField>
      <label className={color ? "color" : white ? "white" : ""}>
        {name}
        {required && <span className="required">*</span>}
      </label>
      <input type={type} {...props} />
    </StyleField>
  );
}
