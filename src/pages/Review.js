import Review_page from './Review_page';
import Review_header from './Review_header';
import React, { useState, useEffect }  from 'react';
import '../CSS/PartnerPost.css';
//import '../CSS/MdPost.css';

function Review (){
    
    return (
      <div  className="section">
        {/*페이지 내용*/} 
        <div className='partner_container'>
        <Review_header/>
        
        <Review_page />
        </div>
      </div>
    );
  
}
  export default Review;