import React,{useEffect,useState} from "react";
import { Link ,useLocation} from "react-router-dom";
import * as functions from './functions.js';

function Farm_card({  body ,farmId,style }) {

    return (
      
      <div>
        <li className="item_card"  >
          <Link to={`/main/partner/farmRead/farmPage/${farmId}`} state={{ body:body}}>
          <table  >
            
            <tbody>
              
                <tr>
                  <th style={{width:'70px'}}> <input type="checkbox"/></th>
                  <th style={{width:'180px',display: 'inline-block',marginRight:'5px'}}>{body.farm_name}</th>
                  <th style={{width:'120px',display: 'inline-block'}}>{body.farm_farmer}</th>
                  <th style={{width:'270px',display: 'inline-block'}}>{body.farm_phone}</th>
                  <th style={{width:'250px',display: 'inline-block'}}>{body.farm_saleItem}</th>
                  <th style={{width:'300px',display: 'inline-block'}}>{body.farm_isContract}</th>
                  <th style={{width:'260px'}}>{body.farm_start}</th>
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