import React ,{useState}from "react";
import PartnerItemCard from './PartnerItemCard';
import Paging from './paging';
import '../CSS/ItemList.css';

const PartnerMdList =({Itemcard,mdCount,style })=>{


  const [page, setPage] = useState(1);
  const limit=5;//12개씩 보기
  const offset =  (page- 1) *limit;
  const handlePageChange = (page) => {
    setPage(page);
    console.log(page)
  };

    return (
        <div className="partneritemList">
          
         {/*페이지 내용*/} 
         <div >
        
         <ul className="partnerItemList_itemview">
          {Itemcard &&
          Itemcard.slice(offset, offset + limit).map((itemdata) => {
            return (
              <PartnerItemCard key={itemdata.md_id}
                body={itemdata}
                mdId={itemdata.md_id} 
                mdName = {itemdata.md_name}
                confirm ={itemdata.stk_confirm}
                
                style={style}
              />
            );
          })}
          </ul>
         </div>
         <div className="paging">
            <Paging count={mdCount} limit={limit} page={page}  handlePageChange={ handlePageChange}/>
          </div>
       </div>
       
    );
  
}
  export default PartnerMdList;