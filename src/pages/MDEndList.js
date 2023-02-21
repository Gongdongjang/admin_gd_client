import React ,{useState}from "react";
import EndItemCard from './EndItemCard';
import Paging from './paging';
import '../CSS/ItemList.css';

const MDEndList =({Itemcard,mdCount,style })=>{
 
    return (
        <div className="itemList">
          
         {/*페이지 내용*/} 
         <div >
         
          <table className="itemListTitle">
            <thead >
              <tr >
                  <th style={{width:'70px'}}></th>
                  <th style={{width:'80px'}}>품번</th>
                  <th style={{width:'330px'}}>상품이름</th>
                  <th style={{width:'180px'}}>농가명</th>
                  <th style={{width:'180px'}}>상점명</th>
                  <th style={{width:'180px'}}>거래품목</th>
                  <th style={{width:'180px'}}>등록일</th>
                  <th style={{width:'320px'}}>진행일</th>
                  <th style={{width:'150px'}}>참여/목표</th>
                  <th style={{width:'240px'}}>진행결과</th>
                  <th style={{width:'60px'}}></th>
              </tr>
            </thead>
            </table>
        
         <ul className="list_itemview">
          {Itemcard &&
          Itemcard.map((itemdata) => {
            return (
              <EndItemCard key={itemdata.md_id}
                body={itemdata}
                mdId={itemdata.md_id}
                start={itemdata.md_start}
                end={itemdata.md_end}
                mdName = {itemdata.md_name} 
                farmName ={itemdata.farm_id}
                storeName ={itemdata.store_id}
                style={style}
              />
            );
          })}
          </ul>
         </div>
        
       </div>
       
    );
  
}
  export default MDEndList;