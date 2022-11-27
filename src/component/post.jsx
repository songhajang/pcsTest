import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function Post({ data, code, liked, reported }) {
  const [isLikeClicked, setIsLikeClicked] = useState(liked);
  const [isReported, setIsReported] = useState(reported);
  const [likedCount, setLikedCount] = useState(data.likedCount)
  const [isLikeWorking, setIsLikeWorking] = useState(false)
  const [isReportWorking, setIsReportWorking] = useState(false)

  const addLike = async () => {
    if (isLikeWorking) return
    
    try {
      setIsLikeWorking(true)
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
      setIsLikeWorking(false)
    }
    
  };

  const report = async () => {
    if (isReportWorking) return

    const reason = ""
    if (!isReported) 
      reason = prompt("신고 사유 \n\n명확한 이유 없는 신고 혹은 장난성 신고는 계정 정지 처분을 당할 수 있습니다.")

    try {
      if (!reason || reason.length < 10)
        return alert("신고 사유는 10자 이상 적어주셔야 합니다.")
      setIsReportWorking(true)

      await axios.post(
        `${code}/post/report/${data.postId}`,
        { reason },
        { withCredentials: true }
      );

      if (isReported) {
        setIsReported(false)
      } else {
        setIsReported(true)
      }
    } catch (err) {
      const status = err?.response?.status
      if (status == 401) {
        alert("로그인 후 이용해주십시오.");
        window.location.href = "/login";
        return;
      }
      alert("신고 등록중 알 수 없는 오류가 발생하였습니다. 관리자에게 문의하세요.");
    } finally {
      setIsReportWorking(false)
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
        <button
          onClick={report}
          style={isReported ? { color: "red" } : { color: "black" }}
          value={data.postId} >
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
