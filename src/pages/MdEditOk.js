import React from "react";
import { Link } from "react-router-dom";
import '../CSS/MdPost.css';

class MdEditOk extends React.Component{
    render(){
  return (
    <div className="postOk_container">
    <h3>공동구매 수정 </h3>
    <div className="postOk">
        <div id="okBox">
        <h3>공동구매 수정이 완료되었습니다</h3>
        <br/>
        <Link to="/mdRead"><button className="postOkBtn">공동구매 확인하러 가기</button></Link>
        </div>
        
    </div>
    </div>
  );
};
}
export default MdEditOk;