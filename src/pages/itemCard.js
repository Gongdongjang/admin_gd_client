import { Link } from "react-router-dom";
function ItemCard({mdId, key, start,end, mdName, farmName ,storeName }) {

  let startDate = start;
  let endDate = end;

  let date = startDate.substr(0, 10)+'~'+endDate.substr(0, 10);

    return (
      <div>
        
        <li className="item_card" key={mdId} >
          <Link to={`/ItemPage/${mdId}`}>
        <div className="cardContent">
          <div className="itemThumbnail"></div>
        <p>상품 번호 : {mdId}</p>
        <p>
          상품명 : <span className="text--brand">{mdName}</span>
        </p>
        <p>농가 : {farmName}</p>
        <p>스토어 : {storeName}</p>
        <p>진행일 : {date}</p>
        <div className="cardBtn">
          <button className="edit" type="button">수정</button>
          <button className="delete" type="button">삭제</button>
        </div>
        </div> 
        </Link>
        </li>
             
      </div>
      
    );
  }
  export default ItemCard;