import React, {useEffect,useState} from 'react';
import '../CSS/PartnerPost.css';
import { Link ,} from "react-router-dom";
const  MDPost_header = () => {
    let[menu,setMenu] = useState(0);
   
    return (
          <ul className='tab'>
            <li  className={`${menu === 0? 'tabBtnActive': 'tabBtn'}`} onClick={() => setMenu(0)} ><Link to="/main/mdPost/MDRead">진행중/확정</Link></li>
            <li  className={`${menu === 1? 'tabBtnActive': 'tabBtn'}`} onClick={() => setMenu(1)} ><Link to="/main/mdPost/MDEnd">실패/종료</Link></li>
            <li  className={`${menu === 2? 'tabBtnActive': 'tabBtn'}`} onClick={() => setMenu(2)} ><Link to="/main/mdPost/MDPost">공동구매 등록하기</Link></li>   
        </ul>
            
  );
    
}

export default MDPost_header;