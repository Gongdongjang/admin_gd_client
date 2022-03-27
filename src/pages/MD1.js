import React from "react";
import { Link } from "react-router-dom";

class MD1 extends React.Component{
    render(){
    return (
        <div className="section">
        {/*카테고리 별 nav*/} 
         <div className='side'>
           <nav>
             <ul>
                <li><Link to="/md">md0</Link></li>
               <li><Link to="/md1">md1</Link></li>
               <li><Link to="/md2">md2</Link></li>
             </ul>
           </nav>
         </div>
         {/*페이지 내용*/} 
         <div>
          <h1>MD1</h1>
          <p>MD1 페이지입니다.</p>
        </div>
       </div>
    );
  };
}
  export default MD1;