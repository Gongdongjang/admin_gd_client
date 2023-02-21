import PartnerPost_page from './PartnerPost_page';
import PartnerPost_header from './PartnerPost_header';
import React, { useState, useEffect }  from 'react';
import '../CSS/PartnerPost.css';

function PartnerPost (){
    
    return (
      <div >
        {/*페이지 내용*/} 
        <div className='partnerPost_container'>
        
        <PartnerPost_header/>
        <hr/>
        <PartnerPost_page />
        </div>
      </div>
    );
  
}
  export default PartnerPost;