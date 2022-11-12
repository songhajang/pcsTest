import { useEffect, useState } from "react";
import axios from "axios";
import logo from "./img/logo.png";
import footerLogo from "./img/footer-logo.png";
import "./App.css";
import Post from "./component/post";
import Alarm from "./component/alarm";
import Loading from "./component/loading";

function App() {
  const [isMatchMedia, setIsMatchMedia] = useState(false);
  const [styleMatchMedia, setStyleMatchMedia] = useState(false);
  const [data, setData] = useState([]);
  const [description, setDescription] = useState("");
  const [postLoading, setPostLoading] = useState(true);
  const [writeLoading, setWriteLoading] = useState(true);

  const getPostList = async () => {
    const { data } = await axios.get("/posts");
    setData(data.data);
    setPostLoading(false);
    setWriteLoading(false);
  };

  const writePost = async (e) => {
    e.preventDefault();
    setWriteLoading(true);
    await axios.post("/post/write", {
      description,
    });
    console.log(description);
    setPostLoading(true);
    getPostList();
    setDescription("");
  };

  useEffect(() => {
    const listener = window.addEventListener("resize", () => {
      if (window.matchMedia("(max-width: 1600px)").matches) {
        setIsMatchMedia(true);
        if (window.matchMedia("(max-width: 930px)").matches) {
          setStyleMatchMedia(true);
        } else setStyleMatchMedia(false);
      } else setIsMatchMedia(false);
    });

    getPostList();

    return () => window.removeEventListener("resize", listener);
  }, []);

  return (
    <>
      <div
        className="popUpIcon"
        style={
          isMatchMedia
            ? { transform: "translateX(0%)" }
            : { transform: "translateX(200%)" }
        }
      >
        +
      </div>
      <div
        className="popUp"
        style={
          isMatchMedia
            ? { transform: "translateX(200%)" }
            : { transform: "translateX(00%)" }
        }
      >
        {writeLoading ? (
          <Loading />
        ) : (
          <form onSubmit={writePost}>
            <div className="popUp-div">
              <h1>글 작성</h1>
              <p>장송하님</p>
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
            {/* <div className="popUp-div">
            <input type="radio" name="check" id="anon" />
            <label htmlFor="anon">익명</label>
            <input type="radio" name="check" id="rlNm" />
            <label htmlFor="rlNm">본명</label>
          </div> */}
            <div className="popUp-div buttons">
              <input type="button" value="취소" className="cancellation" />
              <input type="submit" value="게시" className="posting" />
            </div>
          </form>
        )}
      </div>
      <section className="main">
        <img src={logo} alt="컴과고로고" />
        <h1>
          컴과고 <br /> 대신 전해드립니다.
        </h1>
      </section>
      <section className="alarm">
        <Alarm title="글 작성할때 욕설은 금지입니다." />
        <Alarm title="로그인 후 이용 부탁드립니다." />
      </section>
      <section
        className="posts"
        style={
          styleMatchMedia
            ? { justifyContent: "center" }
            : { justifyContent: "flex-start" }
        }
      >
        {postLoading ? (
          <Loading />
        ) : (
          data.map((data) => (
            <Post
              key={data.postId}
              postId={data.postId}
              title={data.description}
              date={data.created.split("T")[0]}
              like={data.liked}
              refreshPosts={getPostList}
            />
          ))
        )}
      </section>
      <section className="pages">
        <button>&#60;</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>&#62;</button>
      </section>
      <section className="footer">
        <img src={footerLogo} alt="로고" />
        <p>부산컴퓨터과학고등학교</p>
      </section>
    </>
  );
}

export default App;
