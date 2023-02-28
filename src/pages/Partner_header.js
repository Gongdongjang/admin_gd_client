import React, {useEffect,useState} from 'react';
//import './Header.css';
import { Link ,} from "react-router-dom";

const Partner_header = () => {

    let[menu,setMenu] = useState(0);
    return (
        <ul className='tab'>
            <li  className={`${menu === 0? 'tabBtnActive': 'tabBtn'}`} onClick={() => setMenu(0)}><Link to="/main/partner/farmRead">입점농가</Link></li>
            <li  className={`${menu === 1? 'tabBtnActive': 'tabBtn'}`} onClick={() => setMenu(1)}><Link to="/main/partner/storeRead">입점스토어</Link></li>
            <li  className={`${menu === 2? 'tabBtnActive': 'tabBtn'}`} onClick={() => setMenu(2)}><Link to="/main/partner/partner_post">등록하기</Link></li>   
        </ul>
    );
};

export default Partner_header;