import React from 'react';
//import './Header.css';
import { Link ,} from "react-router-dom";
import '../CSS/PartnerPost.css';
const PartnerPost_header = () => {
    return (
        <div>
            <ul className='postTab'>
                <li className='postTabBtn' ><Link to="/partner/partner_post/farmPost">농가</Link></li>
                <li className='postTabBtn' ><Link to="/partner/partner_post/storePost">스토어</Link></li>
            </ul>
            
        </div>
        
        
    );
};

export default PartnerPost_header;