import React from 'react';
//import './Header.css';
import '../CSS/PartnerPost.css';
import { Link ,} from "react-router-dom";
class Review_header extends React.Component{
    render(){
        return (
            <ul className='tab'>
            <li className='tabBtn' ><Link to="/review/reviewRead">전체</Link></li>
            <li className='tabBtn' ><Link to="/review/delectedList">삭제내역</Link></li>   
        </ul>
            
  );
    }
}

export default Review_header;