import React from "react";
import '../CSS/Home.css';
class Home extends React.Component{
    render(){
  return (
    <div>
    <div className="homepage" >
      <button>입점 업체 관리</button>
      <button>진행중인 공동구매</button>
      <button>리뷰 관리</button>
      <button>공지사항</button>
      <button>콘텐츠</button>
      <button>알림 관리</button>      
    </div>
    <footer>
        <h5>공동장</h5>
        <h5>위치 : 어쩌구저쩌구</h5>
        <h5>법인 : 어쩌구저쩌구</h5>
      </footer>
    </div>
  );
};
}
export default Home;