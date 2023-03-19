import React,{useEffect,useState} from "react";
import axios from "axios";
import { Link ,useLocation} from "react-router-dom";
import * as functions from './functions.js';
import '../CSS/PartnerRead.css';

function PartnerItemCard({  body ,mdId, mdName,confirm, style }) {
    const img_url = 'https://ggdjang.s3.ap-northeast-2.amazonaws.com/';
    let[thumbnail,setThumbnail] = useState();
  useEffect(() => { //상점,농가 id로 이름 검색해서 넣기 
    
    axios
      .get(`/api/md/imgs/${mdId}`)
      .then(({data }) => {
        
        setThumbnail(data[0].mdimg_thumbnail);
       
      })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시 
      });

    

  }, []);
    return (
      
      <div>
        <li className="partnerItem_card"  >
          <Link to={`/ItemPage/${mdId}`} state={{ body:body}}>
        <div className="partneritems">
        <label id="confirmLabel">{confirm}</label>
        <img src={ img_url + thumbnail} alt={`${thumbnail}`}/>
        
        <p >{mdName}</p>

        </div> 
        </Link>
        </li>
             
      </div>
      
    );
  }
  export default PartnerItemCard;