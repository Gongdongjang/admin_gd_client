import React from "react";
import { Link } from "react-router-dom";
import '../CSS/Header.css';
class Header extends React.Component{
 
    render(){
        return (
            <div className="menubar">
                {/*로그인,알림*/}
                <div className="topMenu">
                    <h3 className="topMenus"><Link to="/login">로그인</Link></h3>
                    <button className="topMenus"><Link to="/message">알림</Link></button>
                </div>
                {/*메인메뉴*/}
                <div className="dropdown">
                    <div className="mainMenu">
                    <div><Link to="/home"><h5 id="Logo">공동장 로고</h5></Link></div>
                    <ul  id="mainMenuUl">
                        <li><Link to="/partner">입점 업체 관리</Link></li>
                        <li><Link to="/mdPost">공동구매 관리</Link></li>
                        <li><Link to="/review">리뷰 관리</Link></li>
                        <li><Link to="/board">공지사항</Link></li>
                        <li><Link to="/contents">콘텐츠</Link></li>
                        <li><Link to="/message">알림 관리</Link></li>
                    </ul>
                    </div>

                    <ul className="dropdown-content">
                        <div className="mdMenu">
                        <li><Link to="/mdPost">상품 등록</Link></li>
                        <li><Link to="/mdRead">진행중인 상품</Link></li>
                        </div>
                        <div className="mdMenu">
                        <li><Link to="/mdPost">상품 등록</Link></li>
                        <li><Link to="/mdRead">진행중인 상품</Link></li>
                        </div>
                        <div className="mdMenu">
                        <li><Link to="/mdPost">상품 등록</Link></li>
                        <li><Link to="/mdRead">진행중인 상품</Link></li>
                        </div>
                        <div className="mdMenu">
                        <li><Link to="/mdPost">상품 등록</Link></li>
                        <li><Link to="/mdRead">진행중인 상품</Link></li>
                        </div>
                        
                    </ul>
                </div>
            </div>      
  );
    }
}

export default Header;