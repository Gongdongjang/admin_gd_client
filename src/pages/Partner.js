
import Partner_page from './Partner_page';
import Partner_header from './Partner_header';
import React, { useState, useEffect }  from 'react';
import '../CSS/PartnerPost.css';

function Partner (){
    
    return (
      <div className="section">
        {/*페이지 내용*/} 
        <div className='partner_container'>
          
        <Partner_header/>
        <Partner_page />
        </div>
      </div>
    );

}
  export default Partner;