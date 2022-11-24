import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function Post({ data, code, liked }) {
  const [isLikeClicked, setIsLikeClicked] = useState(liked ? true : false);
  const [likedCount, setLikedCount] = useState(data.likedCount)
  const [isWorking, setIsWorking] = useState(false)

  const addLike = async () => {
    if (isWorking) {
      return
    }
    try {
      setIsWorking(true)
      await axios.post(
        `${code}/post/like/add/${data.postId}`,
        {},
        { withCredentials: true }
      );

      if (isLikeClicked) {
        setIsLikeClicked(false)
        setLikedCount(likedCount - 1)
      } else {
        setLikedCount(likedCount + 1)
        setIsLikeClicked(true)
      }
    } catch (err) {
      const status = err?.response?.status
      if (status == 401) {
        alert("로그인 후 이용해주십시오.");
        window.location.href = "/login";
        return;
      }
      alert("좋아요 등록중 알 수 없는 오류가 발생하였습니다. 관리자에게 문의하세요.");
    } finally {
      setIsWorking(false)
    }
    
  };

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
          onClick={addLike}
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
      <p>좋아요 {likedCount}개</p>
    </div>
  );
}
export default Post;
