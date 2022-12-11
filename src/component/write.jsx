import axios from "axios";
import React from "react";

function Write({
  writePost,
  setDescription,
  description,
  writeModal,
  onClickModal,
  isLogin
}) {
  const code = process.env.REACT_APP_BACKEND_URL;

  const logout = async () => {
    try {
      await axios.post(`${code}/logout`, {}, {withCredentials: true})
      alert("로그아웃 성공")
      window.location.href="/"
    } catch(e) {
      alert("로그아웃 실패!")
    }
  }
  
  return (
    <form onSubmit={writePost}>
      <div className="popUp-div">
        <h1>글 작성</h1>
      </div>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="작성할 글을 입력해주세요."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="popUp-div buttons">
        <input
          type="button"
          value="취소"
          className="cancellation"
          onClick={onClickModal}
          //   style={writeModal ? { display: "block" } : { display: "none" }}
        />
        <input type="submit" value="게시" className="posting" />
      </div>
      <div className="login-box">
        {
          isLogin ? (
            <a href="/my-page">마이페이지</a>
          ) : (
            <a href="/login">로그인하러 가기</a>
          )
        }
        {!isLogin ? (<a href="/join">회원가입하러 가기</a>) : <a onClick={logout}>로그아웃</a>}
      </div>
    </form>
  );
}
export default Write;
