import { useEffect, useState } from "react";
import axios from "axios";
import "./css/myPage.css"
import Post from "./post"
import Loading from "./loading"
import logo from "../img/logo.png";
const code = process.env.REACT_APP_BACKEND_URL;

export default () => {
    const [postList, setPostList] = useState()
    const [postLoading, setPostLoading] = useState(true)
    const [viewMode, setViewMode] = useState("post")
    const [codeList, setCodeList] = useState([])
    const [userInfo, setUserInfo] = useState({
        name: "-",
        std_num: "-",
        birthDay: "-",
        phoneNumber: "-",
        auth_type: "-" 
    })

    async function getPosts() {
        try {
            setPostLoading(true)
            
            const {data} = await axios.post(`${code}/member/posts`, {}, {withCredentials: true})
            const res = data.data
            
            setPostList(res.postList)
        } catch(e) {
            const status = e?.response?.status
            if (status == 401) {
                alert("로그인 후 이용해주십시오.");
                window.location.href = "/login";
                return;
            }

            console.log(e)
            alert("알 수 없는 오류 발생")
        } finally {
            setPostLoading(false)
        }
    }

    async function myInfo() {
        try {
            const {data} = await axios.post(`${code}/member/info`, {}, {withCredentials: true})
            const res = data.data

            setUserInfo(res)

            if (res.auth_type == "DIRECT") {
                myCode()

                document.querySelector("#post").addEventListener("change", () => setViewMode("post"))
                document.querySelector("#code").addEventListener("change", () => {
                    setViewMode("code")
                    document.querySelector("#code").checked = true
                })
            }
        } catch(e) {
            const status = e?.response?.status
            if (status == 401) {
                alert("로그인 후 이용해주십시오.");
                window.location.href = "/login";
                return;
            }

            console.log(e)
            alert("알 수 없는 오류 발생")
        }
    }

    async function myCode() {
        try {
            const {data} = await axios.post(`${code}/code/list`, {}, {withCredentials: true})
            const res = data.data

            setCodeList(res)
        } catch(e) {
            const status = e?.response?.status
            if (status == 401) {
                alert("로그인 후 이용해주십시오.");
                window.location.href = "/login";
                return;
            }
            
            console.log(e)
            alert("오류 발생")
        }
    }

    
    useEffect(() => {
        getPosts()
        myInfo()

        alert("미완성 페이지입니다. \n빠른 시일내에 완성하도록 하겠습니다. 감사합니다.")
    }, [])
    
    return (
    <div id="myPageMain">
        <img id="logo" src={logo} onClick={() => window.location.href="/"} />
        <div id="my-page">
            <h1 id="myTitle" onClick={() => window.location.href="/"}>PCS 마이페이지</h1>
            <div className="info-container">
                <div className="user"><span className="user-info">이름 : </span><span className="info name">{userInfo.name}</span></div>
                <div className="user"><span className="user-info">학번 : </span><span className="info student-id">{userInfo.std_num}</span></div>
                <div className="user"><span className="user-info">생년월일 : </span><span className="info birth">{userInfo.birthDay}</span></div>
                <div className="user"><span className="user-info">전화번호 : </span><span className="info phone-number">{userInfo.phoneNumber}</span></div>

                <br />

                <div id="selectors" style={{
                    display: userInfo.auth_type == "DIRECT" ? "block" : "none"
                }}>
                    <div id="viewMode">
                        <label htmlFor="post">작성한 글 보기: </label><input type="radio" id="post" value="post" name="viewMode" defaultChecked />
                        <br />
                        <label htmlFor="code">추천코드 보기: </label><input type="radio" id="code" value="code" name="viewMode" />

                        <br /><br />
                        *유의사항: 추천코드는 해당 유저의 보증과 같은 개념입니다. 추천코드를 사용하여 가입한 유저에게 문제가 발생됐을 시 발급자(본인)에게도 책임이 있음을 알립니다.
                    </div>

                    <div id="infoBtn">
                        {/* <button className="edit-btn">정보수정</button> */}
                    </div>
                </div>
            </div>
            <div className="info-container">
                {viewMode == "post" ? (
                    <section
                        className="posts post-box"
                        style={{ justifyContent: "center" }}
                    >
                    {postLoading ? (
                        <Loading />
                        ) : (
                        postList.map((data) => {
                            return (
                                <div key={data.postId}>
                                    <Post data={data} code={code} liked={data.isLiked} reported={data.isReported} />
                                </div>
                            );
                        })
                    )}
                    </section>
                ) : userInfo.auth_type == "DIRECT" ? (
                        <div className="code-box">
                            <div className="item-container">
                                {codeList.map(data => {
                                    return (
                                        <div className="item-view" key={data.code_id}>
                                            <div className="code-item">
                                                <span className="code">{data.code}</span>
                                                <span>{data.isUsed ? data.used_by : "미사용"}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ) : ""
                }
            </div>
        </div>
    </div>
    )
}