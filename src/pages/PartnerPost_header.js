import React, {useEffect,useState} from 'react';
//import './Header.css';
import { Link ,} from "react-router-dom";
import '../CSS/PartnerPost.css';
const PartnerPost_header = () => {
    let[menu,setMenu] = useState(0);
    return (
        <div>
            <ul className='postTab'>
                <li className={`${menu === 0? 'postTabBtnActive': 'postTabBtn'}`} onClick={() => setMenu(0)} ><Link to="/main/partner/partner_post/farmPost">농가</Link></li>
                <li className={`${menu === 1? 'postTabBtnActive': 'postTabBtn'}`} onClick={() => setMenu(1)}><Link to="/main/partner/partner_post/storePost">스토어</Link></li>
            </ul>
            
        </div>
        
        
    );
};

export default PartnerPost_header;