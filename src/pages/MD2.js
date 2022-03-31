import React from "react";
import ItemCard from './itemCard';
import { Link } from "react-router-dom";

class MD2 extends React.Component{

  state = {};

    render(){
      const { Itemcard } = this.props;
    return (
        <div>
        {/*카테고리 별 nav
         <div className='side'>
           <nav>
             <ul>
                <li><Link to="/md">md0</Link></li>
               <li><Link to="/md1">md1</Link></li>
               <li><Link to="/md2">md2</Link></li>
             </ul>
           </nav>
         </div>*/} 
         {/*페이지 내용*/} 
         <div className="itemList">
         <ul className="list__itemview">
        {Itemcard &&
          Itemcard.map((itemdata) => {
            return (
              <ItemCard
                mdName = {itemdata.md_name} 
                price ={itemdata.md_weight}
                farmName ={itemdata.farm_id}
              />
            );
          })}
      </ul>
         </div>
       </div>
    );
  };
}
  export default MD2;