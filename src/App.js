import { useEffect, useState } from "react";
import axios from "axios";
import logo from "./img/logo.png";
import footerLogo from "./img/footer-logo.png";
import "./App.css";
import Post from "./component/post";
import Alarm from "./component/alarm";

function App() {
  const [isMatchMedia, setIsMatchMedia] = useState(false);
  const [styleMatchMedia, setStyleMatchMedia] = useState(false);
  const [data, setData] = useState([]);
  // 이건 글 작성 폼에서 input text 관리하기 위한 state에요 !
  const [description, setDescription] = useState("");

  const getPostList = async () => {
    // 네 그래서 이 / posts 라는 path는 결론적으로 https://~~/posts가 됩니다. (여기서 ~~ 는 아까 본 proxy에 있는 값)데
    const { data } = await axios.get("/posts");
    setData(data.data);
  };

  const writePost = async (e) => {
    e.preventDefault();
    // 이건 description state 가지고 post 작성하는 api 에 담아주는 거구요.
    await axios.post("/post/write", {
      data: {
        description,
      },
    });
    // 지금 보니깐 익명글 이다 보니 글 등록에 대한 동의와 거절이 있네요 .. 일단 모든 글 작성 동의를 위해서는 이따가 해볼게요
    getPostList();
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
      {/* <div className="bgModal">
        <div className="wh-Modal">
          <form action="" method="post">
            <div>
              <h1>글 작성</h1>
              <p>장송하님</p>
            </div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="작성할 글을 입력해주세요."
            ></textarea>
            <div>
              <input type="radio" name="check" id="anon" />
              <label htmlFor="anon">익명</label>
              <input type="radio" name="check" id="rlNm" />
              <label htmlFor="rlNm">본명</label>
            </div>
            <div>
              <input type="button" value="취소" />
              <input type="button" value="게시" />
            </div>
          </form>
        </div>
      </div> */}
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
        {/* 그리고 여기서 form에 onSubmit에 아까 만들어둔 writePost 함수를 달아줄게요  */}
        {/* 이거 form tag에만 달려있는 이벤트가 submit 이벤트 인데 이거 form 안에 있는 button 클릭하거나 엔터 치면 발생함 */}
        <form onSubmit={writePost}>
          <div>
            <h1>글 작성</h1>
            <p>장송하님</p>
          </div>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="작성할 글을 입력해주세요."
            // 자 여기서 이 input을 관리할거에요ㅇ
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div>
            <input type="radio" name="check" id="anon" />
            <label htmlFor="anon">익명</label>
            <input type="radio" name="check" id="rlNm" />
            <label htmlFor="rlNm">본명</label>
          </div>
          <div>
            <input type="button" value="취소" />
            <input type="submit" value="게시" />
          </div>
        </form>
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
        className="post"
        style={
          styleMatchMedia
            ? { justifyContent: "center" }
            : { justifyContent: "flex-start" }
        }
      >
        {/* 여기 부분을 바꿔주면 되겠죠 ! 근데 문제가 있어요 우리는 title과
        createdAt 이런식으로 이름을 정해놨는데.. API에서 오는 값은 created,
        description, liked, postId 이렇게 오네요.. 그래서 사실 그거만 바꿔주면
        되요 뭐냐 타이틀은 왜넹안옴 ? ? */}
        {/* 자 간단해용 ! 지금은 created가 2022-11-01 이 처럼 오지 않고 ISOString으로 오거든요 ex: 2022-11-01T11:55:44Z 
        이런식 그래서 이걸 뒤에꺼 처럼 바꿔야 하는데 지금은 간단하게 T를 기준으로 split하고 0번째 인덱스를 가져올게요 */}
        {data.map((data) => (
          <Post
            key={data.postId}
            postId={data.postId}
            title={data.description}
            date={data.created.split("T")[0]}
            like={data.liked}
            refreshPosts={getPostList}
          />
        ))}
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
