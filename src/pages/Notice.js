import {NavLink, Route, Routes} from "react-router-dom";
import "../CSS/Notice.css";
import NoticeList from "./Notice/NoticeList";
import NoticeWrite from "./Notice/NoticeWrite";

function Notice() {
  return (
    <div>
        <NavLink className={"Notice-menuBtn"} to={'/notice'} end>공지사항</NavLink>
        <NavLink className={"Notice-menuBtn"} to={'/notice/write'}>공지 작성하기</NavLink>
      <Routes>
        <Route path='/' element={<NoticeList />}/>
        <Route path='/write' element={<NoticeWrite />}/>
      </Routes>
    </div>
  )
}

export default Notice;
