import React from "react";
import ItemCard from './itemCard';
import { Link } from "react-router-dom";
import '../CSS/ItemList.css';

class MDList extends React.Component{

  state = {};

    render(){
      const { Itemcard } = this.props;
    return (
        <div>
         
         {/*페이지 내용*/} 
         <div className="itemList">
         <ul className="list__itemview">
          {Itemcard &&
          Itemcard.map((itemdata) => {
            return (
              <ItemCard
                mdId={itemdata.md_id}
                start={itemdata.md_start}
                end={itemdata.md_end}
                mdName = {itemdata.md_name} 
                farmName ={itemdata.farm_id}
                storeName ={itemdata.store_id}
              />
            );
          })}
          </ul>
         </div>
       </div>
    );
  };
}
  export default MDList;