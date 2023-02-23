import MDPost_page from './MDPost_page';
import MDPost_header from './MDPost_header';
import React, { useState, useEffect }  from 'react';
import '../CSS/PartnerPost.css';
//import '../CSS/MdPost.css';

function MDPost (){
    
    return (
      <div  className="section">
        {/*페이지 내용*/} 
        <div className='partner_container'>
        <MDPost_header/>
        
        <MDPost_page />
        </div>
      </div>
    );
  
}
  export default MDPost;