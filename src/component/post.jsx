import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function Post({ data, code }) {
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  // const [postId, setPostId] = useState(0);

  // const addLike = async (e) => {
  //   if (isLikeClicked) return;
  //   setPostId(e.target.value);
  //   const test = await axios.get(`${code}/post/like/add/1`);
  //   console.log(test);
  // };

  useEffect(() => {
    const addLike = async () => {
      const test = await axios.get(
        `${code}/post/like/add/${data.postId}`,
        {},
        { withCredentials: true }
      );
      console.log(test);
    };
    addLike();
  });

  if (!data) {
    return (
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <h3>리스트를 받아오지 못했어요 로그인 후 다시 해보세요!</h3>
      </div>
    );
  }

  return (
    <div className="post" key={data.postId} id={data.postId}>
      <p>
        {data.created.split("T")[0]}
        <span></span>
      </p>

      <h1>{data.description}</h1>

      <div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-trash"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          신고
        </button>
        <button
          // onClick={addLike}
          style={isLikeClicked ? { color: "red" } : { color: "black" }}
          value={data.postId}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-heart"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          좋아요
        </button>
      </div>
      <p>좋아요 {data.likedPostId}개</p>
    </div>
  );
}
export default Post;
