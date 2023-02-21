import React from 'react';
//import './Header.css';
import { Link ,} from "react-router-dom";

const Partner_header = () => {
    return (
        <ul className='tab'>
            <li className='tabBtn' ><Link to="/partner/farmRead">입점농가</Link></li>
            <li className='tabBtn' ><Link to="/partner/storeRead">입점스토어</Link></li>
            <li className='tabBtn' ><Link to="/partner/partner_post">등록하기</Link></li>   
        </ul>
    );
};

export default Partner_header;