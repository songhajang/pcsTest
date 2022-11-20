import React, { useState } from "react";
import axios from "axios";
import loading from "../img/loading.gif";
import logo from "../img/logo.png";
import "./css/login.css"

function Login() {
  const [loginId, setLoginId] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const url = process.env.REACT_APP_BACKEND_URL;
  
  async function login() {
    const form = new FormData()
    form.append('loginId', loginId)
    form.append('password', password)
    setIsLoading(true)
    
    try {
      const res = await axios.post(`${url}/login`, form, {withCredentials:true})
      const resData = res?.data

      if (!resData) {
        throw new Error("resData is null")
      }
      
      // window.location.href="/"
    } catch(err) {
      alert("로그인중 문제가 발생하였습니다. 관리자에게 문의해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  function locationToHome() {
    window.location.href="/"
  }

  return (
    <div className="login_card">
      <img src={logo} alt="컴과고로고" width='25%' onClick={locationToHome} />
      <div id="loginArea" >
        <input type="text" id="loginId" name="loginId" placeholder="login" 
          value={loginId} onChange={(e) => setLoginId(e.target.value)} />
        <br />
        <input type="password" id="password" name="password" placeholder="password" 
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <a href="/join">계정이 없으신가요? 회원가입하기</a>
        <a href="/admin" id="adminLink">관리자 페이지</a>
      </div>
      <br />
      {isLoading ? ( 
          <img src={loading} alt="로딩중" width="10%" id="loadingImg" />
      ) : (
        <button id="loginBtn" onClick={login}>로그인</button>
      )}
    </div>
  )
}
export default Login;
