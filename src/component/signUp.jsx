import React, { useState } from "react";
import axios from "axios";
import loading from "../img/loading.gif";
import logo from "../img/logo.png";
import "./css/signUp.css";

function SignUp() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authType, setAuthType] = useState("DIRECT");
  const [referCode, setReferCode] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_BACKEND_URL;

  async function signUp() {
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${url}/sign-up`,
        {
          loginId,
          password,
          name,
          birthDay,
          phoneNumber,
          authType,
          studentNumber,
          referCode,
        },
        { withCredentials: true }
      );
      const resData = res?.data;

      if (!resData) {
        throw new Error("resData is null");
      }

      window.location.href = "/login";
    } catch (err) {
      if (err?.response?.data.message == "student already sign up") {
        alert("이미 존재하는 학생입니다.");
      }
      alert("로그인중 문제가 발생하였습니다. 관리자에게 문의해주세요.");
    } finally {
      setIsLoading(false);
    }
  }

  function locationToHome() {
    window.location.href = "/";
  }

  function changeAuthType() {
    setAuthType(document.querySelector('input[name="authType"]:checked').value);
  }

  return (
    <div class="signUp_card">
      <div className="logo" onClick={locationToHome}>
        <img
          src={logo}
          alt="컴과고로고"
          width="25%"
          style={{
            maxWidth: "50px",
          }}
        />
        <h2>컴과고 대전</h2>
      </div>
      <div id="signUpArea">
        <input
          type="text"
          class="signUpInput"
          name="loginId"
          placeholder="login"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />

        <input
          type="password"
          class="signUpInput"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          class="signUpInput"
          name="비밀번호 확인"
          placeholder="비밀번호 확인"
        />

        <input
          type="text"
          class="signUpInput"
          name="name"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          class="signUpInput"
          name="birthDay"
          placeholder="생년월일 ex)010101"
          maxLength="6"
          value={birthDay}
          onChange={(e) => setBirthDay(e.target.value)}
        />

        <input
          type="text"
          class="signUpInput"
          name="phoneNumber"
          placeholder="전화번호 ex) 01012341234"
          maxLength="11"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <input
          type="text"
          class="signUpInput"
          name="studentNumber"
          placeholder="학번"
          maxLength="5"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
        />

        <span id="authRadio">
          <span>
            <label htmlFor="direct">직접 확인</label>{" "}
            <input
              type="radio"
              id="direct"
              name="authType"
              value="DIRECT"
              defaultChecked
            />
          </span>

          <span>
            <label htmlFor="indirect">추천 확인</label>{" "}
            <input
              type="radio"
              id="indirect"
              name="authType"
              value="INDIRECT"
            />
          </span>
        </span>
        <input
          type="text"
          class="signUpInput"
          name="referCode"
          placeholder="추천코드"
          maxLength="16"
          value={referCode}
          onChange={(e) => setReferCode(e.target.value)}
        />
      </div>
      {isLoading ? (
        <img src={loading} alt="로딩중" width="10%" id="loadingImg" />
      ) : (
        <button id="loginBtn" onClick={signUp}>
          회원가입
        </button>
      )}
    </div>
  );
}
export default SignUp;
