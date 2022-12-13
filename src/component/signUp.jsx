import React, { useState } from "react";
import axios from "axios";
import loading from "../img/loading.gif";
import logo from "../img/logo.png";
import "./css/signUp.css";

function SignUp() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [checkPwd, setCheckPwd] = useState();
  const [name, setName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authType, setAuthType] = useState("DIRECT");
  const [referCode, setReferCode] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_BACKEND_URL;

  async function signUp() {
    if (!loginId || !password || !name || !birthDay || !phoneNumber || !authType || !studentNumber)
      return alert("모든 항목을 필수 기재 사항입니다.")

    if (password !== checkPwd) return alert("비밀번호가 다릅니다")
    if (name.length < 2) return alert("이름은 최소 한글자 이상이어야 합니다.")
    if (birthDay.length < 6 || birthDay.length > 6) return alert("생년월일은 6자로 이루어져야 합니다.")
    if (phoneNumber.length < 11 || phoneNumber.length > 11) return alert("전화번호는 11자로 이루어져야 합니다,.")
    if (studentNumber.length < 5 || studentNumber.length > 5) return alert("학번은 5자로 이루어져야 합니다.")
    
    if (!document.getElementById("infoAgreement").checked) 
      return alert("개인정보 수집 및 이용 동의는 필수입니다.")

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

      if (!referCode) {
        alert("회원가입에 성공하셨습니다.\n\n인스타그램(pcs-daejeon)으로 가셔서 본인인증을 해주시기 바랍니다.\n학생증, 신분증, 가족사랑카드 등 신분을 증명할 수 있는 아무 방법으로 신청하실 수 있습니다.")
        window.location.href = "/login";
        return
      }

      alert("추천코드를 사용한 회원가입에 성공하셨습니다.\n\n추천코드를 사용할 시 서비스 즉시 이용이 가능합니다.\n추천코드를 사용하였을 시 코드 발급자가 코드 사용자의 보증인이 됩니다.\n코드 사용자에게 문제가 발생할 시 보증인에게 책임이 넘어갑니다.")

      window.location.href = "/login";
    } catch (err) {
      if (err?.response?.status == 409) {
        alert("이미 존재하는 학생입니다.\n중복 불가: 아이디, 학번");
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
          value={checkPwd}
          onChange={e => setCheckPwd(e.target.value)}
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
          onChange={(e) => {
            if (!e.target.value.slice(e.target.value.length - 1, e.target.value.length).match(/[0-9]/g) && e.target.value.length > 0)
              return 
            setBirthDay(e.target.value)
          }}
        />

        <input
          type="text"
          class="signUpInput"
          name="phoneNumber"
          placeholder="전화번호 ex) 01012341234"
          maxLength="11"
          value={phoneNumber}
          onChange={(e) => {
            if (!e.target.value.slice(e.target.value.length - 1, e.target.value.length).match(/[0-9]/g) && e.target.value.length > 0)
              return 
            setPhoneNumber(e.target.value)
          }}
        />

        <input
          type="text"
          class="signUpInput"
          name="studentNumber"
          placeholder="학번"
          maxLength="5"
          value={studentNumber}
          onChange={(e) => {
            if (!e.target.value.slice(e.target.value.length - 1, e.target.value.length).match(/[0-9]/g) && e.target.value.length > 0)
              return 
            setStudentNumber(e.target.value)
          }}
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
      <div id="infoAgree">
        <a href="/infoAgreement.txt">개인정보처리방침 보러가기</a>
        <br />
        <input type="checkbox" id="infoAgreement" /> 개인정보 수집•이용 동의
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
