import React from "react";
// import { useState } from "react";
// import axios from "axios";
// import Loading from "./loading";

function Post({ data, page }) {
  console.log(data);
  let test = data.filter(
    (data, index) => index >= (page - 1) * 15 && index < page * 15
  );
  console.log(test, page * 15);
  return test.map((data) => (
    <div className="post" key={data.postId} id={data.postId}>
      <p>{data.created.split("T")[0]}</p>
      <h1>{data.description}</h1>
    </div>
  ));
}
export default Post;
