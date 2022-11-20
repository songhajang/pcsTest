import React from "react";
import loading from "../img/loading.gif";

function Loading() {
  return (
    <div className="loading">
      <img src={loading} alt="로딩중" width="25%" />
      <p>잠시만 기다려 주세요.</p>
    </div>
  );
}

export default Loading;
