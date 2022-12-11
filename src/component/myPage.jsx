import { useEffect, useState } from "react";
import axios from "axios";
import "./css/myPage.css"
import Post from "./post"
import logo from "../img/logo.png";

export default () => {
    const data = {
        postId: 1,
        description: "test글 작성",
        created: "2022-12-04T04:53:59.213031",
        likedCount: 0
    }
    
    return (
    <div id="myPageMain">
        <img id="logo" src={logo} />
        <div id="my-page">
            <h1 id="myTitle">PCS 마이페이지</h1>
            <div class="info-container">
                <div class="user"><span class="user-info">이름 : </span><span class="info name">장송하</span></div>
                <div class="user"><span class="user-info">학번 : </span><span class="info student-id">30119</span></div>
                <div class="user"><span class="user-info">생년월일 : </span><span class="info birth">2004.02.07</span></div>
                <div class="user"><span class="user-info">전화번호 : </span><span class="info phone-number">010-1234-5678</span></div>

                <br />

                {/* <button onClick={}></button> */}
                {/* TODO section 과 code-box를 선택하면 보이게끔. */}
                {/* + API연결하기 */}
                <button class="edit-btn">정보수정</button>
            </div>
            <div class="info-container">
                <section
                    className="posts post-box"
                    style={{ justifyContent: "center" }}
                >
                    <div id="1" className="post-item">
                        <Post data={data} code={"https://localhost"} liked={false} reported={false} />
                    </div>
                    <div id="1" className="post-item">
                        <Post data={data} code={"https://localhost"} liked={false} reported={false} />
                    </div>
                </section>
                <div class="code-box">
                    <div class="item-container">
                        <div class="item-view">
                            <div class="code-item">
                                <span class="code">1jy5ghs8cow1k</span>
                                <span>미사용</span>
                            </div>
                        </div>
                        <div class="item-view">
                            <div class="code-item">
                                <span class="code">1jy5ghs8cow1k</span>
                                <span>미사용</span>
                            </div>
                        </div>
                        <div class="item-view">
                            <div class="code-item">
                                <span class="code">1jy5ghs8cow1k</span>
                                <span>미사용</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}