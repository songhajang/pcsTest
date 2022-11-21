import React from "react";

function Post({ data, OnClik }) {
  if (!data) {
    return (
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <h3>리스트를 받아오지 못했어요 새로고침을 눌러 다시 해보세요!</h3>
        <button className="res" onClick={OnClik}>
          새로고침
        </button>
      </div>
    );
  }

  return data.map((data) => (
    <div className="post" key={data.postId} id={data.postId}>
      <p>
        {data.created.split("T")[0]}
        <span></span>
      </p>

      <h1>{data.description}</h1>
    </div>
  ));
}
export default Post;
