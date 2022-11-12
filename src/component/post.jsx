import React from "react";
import { useState } from "react";
import axios from "axios";
// import Loading from "./loading";

function Post({ postId, title, date, like, refreshPosts }) {
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  // const [likeLoading, setLikeLoading] = useState(true);

  const addLike = async () => {
    // 이 코드의 역할은 한번 클릭되면 좋아요 갯수 늘리는 호출을 하지 않기 위해 return 하는 거에요.
    if (isLikeClicked) return;
    // 초기값이 false니깐 처음 한번에는 실행되고 그 다음부터는 true로 만들기 떄문에 다시는 이 이상 실행이 되지 않겠죠.
    setIsLikeClicked(true);
    await axios.get(
      `https://pcs-daejeon.herokuapp.com/post/like/add/${postId}`
    );
    refreshPosts();
    // setLikeLoading(false);
    // 이 API가 좋아요 갯수 늘리는 API에요
  };

  return (
    <div className="post">
      <p>{date}</p>
      <h1>{title}</h1>
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
          onClick={addLike}
          style={isLikeClicked ? { color: "red" } : { color: "black" }}
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
      <p>좋아요 {like}개</p>
    </div>
  );
}
export default Post;
