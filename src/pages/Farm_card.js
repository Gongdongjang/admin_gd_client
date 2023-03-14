import React,{useEffect,useState} from "react";
import { Link ,useLocation} from "react-router-dom";
import * as functions from './functions.js';
import contractNone from "../imgs/gdg_admin_ic/ic_store_none.png";
import contractWait from "../imgs/gdg_admin_ic/ic_store_waiting.png";
import contractWork from "../imgs/gdg_admin_ic/ic_store_working.png";
function Farm_card({  body ,farmId,style }) {
  let contractImg;
  const conImg=()=>{
   
    if(body.farm_isContract=="협업기획중")
      contractImg=contractWait;
    else if(body.farm_isContract=="미활동")
      contractImg=contractNone;
    else
      contractImg=contractWork;
      return contractImg;
  }
  
    return (
      
      <div>
        <li className="item_card"  >
          <Link to={`/main/partner/farmRead/farmPage/${farmId}`} state={{ body:body}}>
          <table  >
            
            <tbody>
              
                <tr>
                  <th style={{width:'70px'}}></th>
                  <th style={{width:'180px',display: 'inline-block',marginRight:'5px'}}>{body.farm_name}</th>
                  <th style={{width:'120px',display: 'inline-block'}}>{body.farm_farmer}</th>
                  <th style={{width:'270px',display: 'inline-block'}}>{body.farm_phone}</th>
                  <th style={{width:'280px',display: 'inline-block'}}>{body.farm_saleItem}</th>
                  <th style={{width:'70px',display: 'inline-block'}}><img id="contractImg"src={conImg()}/></th>
                  <th style={{width:'150px',display: 'inline-block'}}>{body.farm_isContract}</th>
                  <th style={{width:'350px'}}>{body.farm_start}</th>
                </tr>
             
            </tbody>
          </table>
        
        </Link>
        {/*
        <div className="cardBtn">
          <Link to={`/mdPost/update/${mdId}`} ><button className="edit" type="button">수정</button></Link>
          <button  className="delete" type="button" style={style} onClick={()=>functions.removeMD(body.md_id)}>삭제</button>
    </div>*/}
        </li>
             
      </div>
      
    );
  }
  export default Farm_card;