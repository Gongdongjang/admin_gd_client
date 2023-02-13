import {Route, Routes} from "react-router-dom";
import "../CSS/Notice.css";
import NoticeList from "./Notice/NoticeList";
import NoticeWrite from "./Notice/NoticeWrite";

function Notice() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<NoticeList />}/>
        <Route path='/write' element={<NoticeWrite />}/>
      </Routes>
    </div>
  )
}

export default Notice;
