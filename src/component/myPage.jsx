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
    const [userInfo, setUserInfo] = useState({
        name: "-",
        std_num: "-",
        birthDay: "-",
        phoneNumber: "-" 
    })

    async function getPosts() {
        try {
            setPostLoading(true)
            
            const {data} = await axios.post(`${code}/member/posts`, {}, {withCredentials: true})
            const res = data.data
            
            setPostList(res.postList)
        } catch(e) {
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
        } catch(e) {
            console.log(e)
            alert("알 수 없는 오류 발생")
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

                {/* <button onClick={}></button> */}
                {/* TODO section 과 code-box를 선택하면 보이게끔. */}
                {/* + API연결하기 */}
                {/* <button className="edit-btn">정보수정</button> */}
            </div>
            <div className="info-container">
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
                {/* <div className="code-box">
                    <div className="item-container">
                        <div className="item-view">
                            <div className="code-item">
                                <span className="code">1jy5ghs8cow1k</span>
                                <span>미사용</span>
                            </div>
                        </div>
                        <div className="item-view">
                            <div className="code-item">
                                <span className="code">1jy5ghs8cow1k</span>
                                <span>미사용</span>
                            </div>
                        </div>
                        <div className="item-view">
                            <div className="code-item">
                                <span className="code">1jy5ghs8cow1k</span>
                                <span>미사용</span>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    </div>
    )
}