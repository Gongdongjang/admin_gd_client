import React ,{useState}from "react";
import ItemCard from './itemCard';
import Paging from './paging';
import '../CSS/ItemList.css';

const MDList =({Itemcard,mdCount })=>{

  const [page, setPage] = useState(1);
  const limit=12;//12개씩 보기
  const offset =  (page- 1) *limit;
  const handlePageChange = (page) => {
    setPage(page);
    console.log(page)
  };
    return (
        <div className="itemList">
         {/*페이지 내용*/} 
         <div >
         <ul className="list_itemview">
          {Itemcard &&
          Itemcard.slice(offset, offset + limit).map((itemdata) => {
            return (
              <ItemCard key={itemdata.md_id}
                body={itemdata}
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
         <div className="paging">
            <Paging count={mdCount} limit={limit} page={page}  handlePageChange={ handlePageChange}/>
          </div>
       </div>
       
    );
  
}
  export default MDList;