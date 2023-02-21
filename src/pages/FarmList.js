import React ,{useState}from "react";
import Farm_card from './Farm_card';
import Paging from './paging';
import '../CSS/ItemList.css';

const FarmList =({Itemcard,farmCount,style })=>{


    return (
        <div className="itemList">
          <table className="itemListTitle">
            <thead >
              <tr >
                  <th style={{width:'70px'}}></th>
                  <th style={{width:'150px'}}>농가명</th>
                  <th style={{width:'100px'}}>농장주</th>
                  <th style={{width:'200px'}}>연락처</th>
                  <th style={{width:'200px'}}>주거래품목</th>
                  <th style={{width:'240px'}}>현재협업여부</th>
                  <th style={{width:'200px'}}>등록일자</th>
                  <th style={{width:'60px'}}></th>
              </tr>
            </thead>
            </table>
          
         <div >
          
         <ul className="list_itemview">
          {Itemcard &&
          Itemcard.map((itemdata) => {
            return (
              <Farm_card key={itemdata.farm_id}
                body={itemdata}
                farmId={itemdata.farm_id}
                
                style={style}
              />
            );
          })}
          </ul>
         </div>
       </div>
       
    );
  
}
  export default FarmList;