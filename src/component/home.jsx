import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../img/logo.png";
import footerLogo from "../img/footer-logo.png";
import Post from "./post";
import Alarm from "./alarm";
import Loading from "./loading";
import Paging from "./pagination";
import Write from "./write";

function Home() {
  const [isMatchMedia, setIsMatchMedia] = useState(false);
  const [styleMatchMedia, setStyleMatchMedia] = useState(false);
  const [writeModal, setwriteModal] = useState(false);
  const [data, setData] = useState([]);
  const [description, setDescription] = useState("");
  const [postLoading, setPostLoading] = useState(true);
  const [writeLoading, setWriteLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const code = process.env.REACT_APP_BACKEND_URL;

  const pagePostList = async (page) => {
    if (page === undefined) {
      page = 1;
    }
    setCurrentPage(page);
    const pages = page - 1;
    try {
      const { data } = await axios.get(`${code}/posts/?page=${pages}`, {
        withCredentials: true,
      });
      setData(data.data);
      setPostLoading(false);
      setWriteLoading(false);
    } catch (err) {
      console.log(err);
      alert("글을 가져오는 중 원인 모를 오류 발생! 관리자에게 문의하세요.");
    }
  };

  const writePost = async (e) => {
    e.preventDefault();
    const writeTitle = e.target[0].value.length;
    if (writeTitle >= 5 && writeTitle <= 100) {
      setWriteLoading(true);
      try {
        await axios.post(
          `${code}/post/write`,
          {
            description,
          },
          { withCredentials: true }
        );
      } catch (err) {
        if (err?.response?.status == 401) {
          alert("로그인 후 이용해주십시오.");
          window.location.href = "/login";
          return;
        }
        if (err?.response?.data == "bad words") {
          alert("욕설이 감지됐습니다.");
          return;
        }

        alert("글 작성중 원인 모를 오류 발생! 관리자에게 문의하세요.");
      }

      setPostLoading(true);
      setwriteModal(false);
      pagePostList();
      setDescription("");
    } else {
      alert("작성글은 5자 이상 100자 이하로 작성해 주세요.");
      setDescription("");
    }
  };

  const onClickModal = () => {
    setwriteModal(!writeModal);
  };

  useEffect(() => {
    if (window.innerWidth < "1600") {
      setIsMatchMedia(true);
      if (window.matchMedia("(max-width: 944px)").matches) {
        setStyleMatchMedia(true);
      } else setStyleMatchMedia(false);
    } else setIsMatchMedia(false);

    const listener = window.addEventListener("resize", () => {
      if (window.matchMedia("(max-width: 1600px)").matches) {
        setIsMatchMedia(true);
        if (window.matchMedia("(max-width: 944px)").matches) {
          setStyleMatchMedia(true);
        } else setStyleMatchMedia(false);
      } else setIsMatchMedia(false);
    });
    const getPostList = async () => {
      try {
        const { data } = await axios.get(`${code}/posts/`);
        setData(data.data);
        setPostLoading(false);
        setWriteLoading(false);
      } catch {
        setPostLoading(false);
        setWriteLoading(false);
      }
    };

    getPostList();

    return () => window.removeEventListener("resize", listener);
  }, []);

  return (
    <>
      <div
        className="bgModal"
        style={writeModal ? { display: "block" } : { display: "none" }}
      >
        <div className=" wh-Modal">
          <button
            id="closeBtn"
            className="close"
            onClick={onClickModal}
            style={writeModal ? { display: "block" } : { display: "none" }}
          ></button>
          {writeLoading ? (
            <Loading />
          ) : (
            <Write
              setDescription={setDescription}
              writePost={writePost}
              onClickModal={onClickModal}
              writeModal={writeModal}
              description={description}
            />
          )}
        </div>
      </div>

      <div
        className="popUpIcon"
        onClick={onClickModal}
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
          <Write
            setDescription={setDescription}
            writePost={writePost}
            writeModal={writeModal}
            description={description}
          />
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
          <Post data={data.postList} page={currentPage} OnClik={pagePostList} />
        )}
      </section>
      <section className="pages">
        <Paging
          count={data.totalPost}
          page={currentPage}
          setPage={pagePostList}
        />
      </section>
      <section className="footer">
        <img src={footerLogo} alt="로고" />
        <p>부산컴퓨터과학고등학교</p>
      </section>
    </>
  );
}

export default Home;
