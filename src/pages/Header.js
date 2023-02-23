import React from "react";
import { Link } from "react-router-dom";
import '../CSS/Header.css';
class Header extends React.Component{
 
    render(){
        return (
            <div className="menubar">
                {/*로고,로그인*/}
                <div className="menuTop">
                    <Link to="/home"><a id="Logo"></a></Link>
                    <a id="login"><Link to="/login">로그인</Link></a>
                </div>
                {/*메인메뉴*/}
                <span className="menuLeft">
                    <ul  id="mainMenuUl">
                        <div id="topUl">관리</div>
                        <Link to="/partner"><li>입점 업체 관리</li></Link>
                        <Link to="/mdPost"><li>공동구매 관리</li></Link>
                        <Link to="/contents"><li>컨텐츠 관리</li></Link>
                        <Link to="/review"><li>리뷰 관리</li></Link>
                        <Link to="/contents"><li>컨텐츠</li></Link>
                        <Link to="/notification"><li>알림 관리</li></Link>
                        <Link to="/board"><li>공지사항 관리</li></Link>
                    </ul>
                    
                </span>
            </div>      
  );
    }
}

export default Header;
