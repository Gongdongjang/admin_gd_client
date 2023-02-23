import React from "react";
import { Link } from "react-router-dom";
import '../CSS/MdPost.css';

class MdPostOk extends React.Component{
    render(){
  return (
    <div className="postOk_container">
    <h3>공동구매 등록 </h3>
    <div className="postOk">
        <div id="okBox">
        <h3>공동구매 등록이 완료되었습니다</h3>
        <br/>
        <Link to="/mdRead"><button className="postOkBtn">공동구매 확인하러 가기</button></Link>
        </div>
        
    </div>
    </div>
  );
};
}
export default MdPostOk;