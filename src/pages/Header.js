import React from "react";
import { Link } from "react-router-dom";
import '../CSS/Header.css';
class Header extends React.Component{
    render(){
        return (
            <div>
                <nav className="headerNav ">
                <ul>
                  <li><Link to="/home">홈</Link></li>
                  <li><Link to="/partner">협업체</Link></li>
                  <li><Link to="/md">상품</Link></li>
                  <li><Link to="/contents">컨텐츠</Link></li>
                  <li><Link to="/login">로그인</Link></li>
                  <li><Link to={'/notice'}>공지사항</Link></li>
                </ul>
                </nav>
            </div>
            
  );
    }
}

export default Header;
