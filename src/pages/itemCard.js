import React,{useEffect,useState} from "react";
import axios from "axios";
import { Link ,useLocation} from "react-router-dom";
import * as functions from './functions.js';
function ItemCard({  body ,mdId,  start,end, mdName, farmName ,storeName }) {
  const img_url = 'https://gdjang.s3.ap-northeast-2.amazonaws.com/';
  let[thumbnail,setThumbnail] = useState();
  let[farm,setFarm] = useState();
  let[store,setStore] = useState();

  useEffect(() => { //상점,농가 id로 이름 검색해서 넣기 
    
    axios
      .get(`http://localhost:5000/api/search/name/${farmName}/${storeName}`)
      .then(({data }) => {
        //console.log(data);
        setFarm(data.farm_name);
        setStore(data.store_name);
      })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시
      });

      axios
      .get(`http://localhost:5000/api/read/imgs/${mdId}`)
      .then(({data }) => {
       // console.log(data);
       //console.log(data[0].mdimg_thumbnail.toString());
        setThumbnail(data[0].mdimg_thumbnail);
      })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시 
      });

  }, []);
    return (
      
      <div>
        <li className="item_card"  >
          <Link to={`/ItemPage/${mdId}`} state={{ body:body}}>
        <div className="cardContent">
          <div >
          <img className="itemThumbnail" src={ img_url+ thumbnail}  />
          </div>
        <p>상품 번호 : {mdId}</p>
        <p>
          상품명 : <span>{mdName}</span>
        </p>
        <p>농가 : {farm}</p>
        <p>스토어 : {store}</p>
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