import React, {useState} from "react";
import { Link } from "react-router-dom";
import '../CSS/Header.css';

function Header() {
    const [menu, setMenu] = useState(0);

    const changeMenu = (menu) => {
        setMenu(menu);
    }

    return (
            <div className="menubar">
                {/*로고,로그인*/}
                <div className="menuTop">
                    <Link to="/home"><a id="Logo"></a></Link>
                    <Link to="/login" id="login">로그인</Link>
                </div>
                {/*메인메뉴*/}
                <span className="menuLeft">
                    <ul  id="mainMenuUl">
                        <div id="topUl">관리</div>
                        <Link to="/main/partner"><li className={`${menu === 0? 'active': ''}`} onClick={() => changeMenu(0)}>입점 업체 관리</li></Link>
                        <Link to="/main/mdPost"><li className={`${menu === 1? 'active': ''}`} onClick={() => changeMenu(1)}>공동구매 관리</li></Link>
                        <Link to="/main/contents"><li className={`${menu === 2? 'active': ''}`} onClick={() => changeMenu(2)}>컨텐츠 관리</li></Link>
                        <Link to="/main/review"><li className={`${menu === 3? 'active': ''}`} onClick={() => changeMenu(3)}>리뷰 관리</li></Link>
                        <Link to="/main/notification"><li className={`${menu === 4? 'active': ''}`} onClick={() => changeMenu(4)}>알림 관리</li></Link>
                        <Link to="/main/notice"><li className={`${menu === 5? 'active': ''}`} onClick={() => changeMenu(5)}>공지사항 관리</li></Link>
                    </ul>
                </span>
            </div>
  );
}

// class Header extends React.Component{
//
//     constructor(props) {
//         super();
//
//         this.state = {
//           menu: 0,
//         };
//       }
//
//       changeMenu = (menuIndex) =>{
//         this.setState({menu : menuIndex});
//       }
//
//
//     render(){
//         return (
//             <div className="menubar">
//                 {/*로고,로그인*/}
//                 <div className="menuTop">
//                     <Link to="/home"><a id="Logo"></a></Link>
//                     <Link to="/login" id="login">로그인</Link>
//                 </div>
//                 {/*메인메뉴*/}
//                 <span className="menuLeft">
//                     <ul  id="mainMenuUl">
//                         <div id="topUl">관리</div>
//                         <Link to="/main/partner"><li className={`${this.state.menu === 0? 'active': ''}`} onClick={() => this.changeMenu(0)}>입점 업체 관리</li></Link>
//                         <Link to="/main/mdPost"><li className={`${this.state.menu === 1? 'active': ''}`} onClick={() => this.changeMenu(1)}>공동구매 관리</li></Link>
//                         <Link to="/main/contents"><li className={`${this.state.menu === 2? 'active': ''}`} onClick={() => this.changeMenu(2)}>컨텐츠 관리</li></Link>
//                         <Link to="/main/review"><li className={`${this.state.menu === 3? 'active': ''}`} onClick={() => this.changeMenu(3)}>리뷰 관리</li></Link>
//                         <Link to="/main/notification"><li className={`${this.state.menu === 4? 'active': ''}`} onClick={() => this.changeMenu(4)}>알림 관리</li></Link>
//                         <Link to="/main/notice"><li className={`${this.state.menu === 5? 'active': ''}`} onClick={() => this.changeMenu(5)}>공지사항 관리</li></Link>
//
//                     </ul>
//
//                 </span>
//             </div>
//   );
//     }
// }

export default Header;
