// import React, { useState } from "react";
import "./Paging.css";
import Pagination from "react-js-pagination";

const Paging = ({ page, count, setPage }) => {
  console.log("page:" + page);
  console.log("count:" + count);
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={15}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={"<"}
      nextPageText={">"}
      onChange={setPage}
    ></Pagination>
  );
};
export default Paging;
