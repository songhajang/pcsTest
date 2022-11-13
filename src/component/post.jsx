import React from "react";
// import { useState } from "react";
// import axios from "axios";
// import Loading from "./loading";

function Post({ data, page }) {
  // console.log(data);
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
