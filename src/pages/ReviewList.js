import React ,{useState}from "react";
import ReviewCard from './ReviewCard';
import '../CSS/ItemList.css';

const ReviewList =({Itemcard,ReviewCount,style ,handleClickCheckbox, delete_list})=>{
  
    return (
        <div className="itemList">
          
         {/*페이지 내용*/} 
         <div >
         
          <table className="itemListTitle">
            <thead >
              <tr >
                  <th style={{width:'30px'}}></th>
                  <th style={{width:'330px'}}>상품이름</th>
                  <th style={{width:'180px'}}>아이디</th>
                  <th style={{width:'200px'}}>등록일</th>
                  <th style={{width:'100px'}}>별점</th>
                  <th style={{width:'350px'}}>내용</th>
                  <th style={{width:'200px'}}></th>
              </tr>
            </thead>
            </table>
        
         <ul className="list_itemview">
          {Itemcard &&
          Itemcard.map((itemdata) => {
            return (
              <ReviewCard key={itemdata.rvw_id}
                body={itemdata}
                
                style={style}
                handleClickCheckbox={handleClickCheckbox}
                delete_list={delete_list}
              />
            );
          })}
          </ul>
         </div>
        
       </div>
       
    );
  
}
  export default ReviewList;