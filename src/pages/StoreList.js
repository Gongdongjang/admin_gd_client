import React ,{useState}from "react";
import Store_card from './Store_card';
import Paging from './paging';
import '../CSS/ItemList.css';

const StoreList =({Itemcard,storeCount,style })=>{


    return (
        <div className="itemList">
          <table className="itemListTitle">
            <thead >
              <tr >
                  <th style={{width:'70px'}}></th>
                  <th style={{width:'150px'}}>스토어명</th>
                  <th style={{width:'100px'}}>가게주</th>
                  <th style={{width:'200px'}}>연락처</th>
                  <th style={{width:'200px'}}>시설</th>
                  <th style={{width:'240px'}}>현재협업여부</th>
                  <th style={{width:'200px'}}>등록일자</th>
                  <th style={{width:'60px'}}></th>
              </tr>
            </thead>
            </table>
         {/*페이지 내용*/} 
         <div >
          
         <ul className="list_itemview">
          {Itemcard &&
          Itemcard.map((itemdata) => {
            return (
              <Store_card key={itemdata.store_id}
                body={itemdata}
                storeId={itemdata.store_id}
                style={style}
              />
            );
          })}
          </ul>
         </div>
       </div>
       
    );
  
}
  export default StoreList;