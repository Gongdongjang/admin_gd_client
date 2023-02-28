import React, {useEffect,useState} from 'react';
//import './Header.css';
import '../CSS/PartnerPost.css';
import { Link ,} from "react-router-dom";
const Review_header = () => {
    let[menu,setMenu] = useState(0);
    
        return (
            <ul className='tab'>
            <li className={`${menu === 0? 'tabBtnActive': 'tabBtn'}`} onClick={() => setMenu(0)}><Link to="/main/review/reviewRead">전체</Link></li>
            <li className={`${menu === 1? 'tabBtnActive': 'tabBtn'}`} onClick={() => setMenu(1)} ><Link to="/main/review/delectedList">삭제내역</Link></li>   
        </ul>
            
  );
    
}

export default Review_header;