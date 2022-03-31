function ItemCard({ key, mdName, price, farmName }) {
    return (
      <div>
        
        <li className="item_card" key={key}>
        <div className="cardContent">
        <p>
          상품명 : <span className="text--brand">{mdName}</span>
        </p>
        <p>가격 : {price}</p>
        <p>농가 : {farmName}</p>
        <div className="cardBtn">
          <button className="edit" type="button">수정</button>
          <button className="delete" type="button">삭제</button>
        </div>
        </div> 
        
        </li>
             
      </div>
      
    );
  }
  export default ItemCard;