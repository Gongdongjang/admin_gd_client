import React, { useState } from 'react';
import '../CSS/paging.css';
import Pagination from 'react-js-pagination';

const Paging = ({count,limit,page,handlePageChange}) => {

    return (
      <Pagination
        activePage={page}
        itemsCountPerPage={limit}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
    );
  };
export default Paging;