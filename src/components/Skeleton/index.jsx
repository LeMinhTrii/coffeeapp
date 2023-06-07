import React from "react";
import { styled } from "styled-components";

const SkeletonStyle = styled.div`
  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  width: 100%;
  animation: shine 1.5s linear infinite;
  &.circle {
    border-radius: 50%;
  }
  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
`;
export default function Skeleton({
  shap = "rectangle",
  width,
  height,
  children,
  ...props
}) {
  return (
    <SkeletonStyle className={shap} style={{ width, height, ...props }}>
      {children}
    </SkeletonStyle>
  );
}
