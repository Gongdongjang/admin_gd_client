import {NavLink, Route, Routes} from "react-router-dom";
import React, { useState ,useEffect} from "react";
import "../CSS/Notice.css";
import NoticeList from "./Notice/NoticeList";
import NoticeWrite from "./Notice/NoticeWrite";
import NoticeDetail from "./Notice/NoticeDetail";

function Notice() {

  let[menu,setMenu] = useState(0);
  return (
    <div>
      
    <ul className={"tab"}>
        <li className={`${menu === 0? 'tabBtnActive': 'tabBtn'}`} onClick={() => setMenu(0)}><NavLink  to={'/main/notice'} end>공지사항</NavLink></li>
        <li className={`${menu === 1? 'tabBtnActive': 'tabBtn'}`} onClick={() => setMenu(1)} > <NavLink to={'/main/notice/write'}>공지 작성하기</NavLink></li>
    </ul>
    <div className={"partnerSection"}>
        
      <Routes>
        <Route path='/' element={<NoticeList />}/>
        <Route path='/write' element={<NoticeWrite />}/>
          <Route path={'/:noticeId'} element={<NoticeDetail />} />
      </Routes>
    </div>
    
    </div>
  )
}

export default Notice;
