import { Link } from "react-router-dom";
import axios from "axios";
import * as functions from './functions.js';
function ItemCard({  body ,mdId,  start,end, mdName, farmName ,storeName }) {

    return (
      
      <div>
        <li className="item_card"  >
          <Link to={`/ItemPage/${mdId}`} state={{ body:body}}>
        <div className="cardContent">
          <div className="itemThumbnail"></div>
        <p>상품 번호 : {mdId}</p>
        <p>
          상품명 : <span>{mdName}</span>
        </p>
        <p>농가 : {farmName}</p>
        <p>스토어 : {storeName}</p>
        <p>진행일 : {functions.duration(start,end)}</p>
        </div> 
        </Link>
        <div className="cardBtn">
          <Link to={`/mdPost/update/${mdId}`} ><button className="edit" type="button">수정</button></Link>
          <button className="delete" type="button" onClick={()=>functions.removeMD(body.md_id)}>삭제</button>
        </div>
        </li>
             
      </div>
      
    );
  }
  export default ItemCard;