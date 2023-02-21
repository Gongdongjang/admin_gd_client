import React from 'react';
//import './Header.css';
import '../CSS/PartnerPost.css';
import { Link ,} from "react-router-dom";
class MDPost_header extends React.Component{
    render(){
        return (
            <ul className='tab'>
            <li className='tabBtn' ><Link to="/mdPost/MDRead">진행중</Link></li>
            <li className='tabBtn' ><Link to="/mdPost/MDEnd">확정/실패/종료</Link></li>
            <li className='tabBtn' ><Link to="/mdPost/MDPost">공동구매 등록하기</Link></li>   
        </ul>
            
  );
    }
}

export default MDPost_header;