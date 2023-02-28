import React,{useEffect,useState} from "react";

import { Link ,useLocation} from "react-router-dom";
import * as functions from './functions.js';
function Store_card({  body ,storeId}) {

    return (
      
      <div>
        <li className="item_card"  >
          <Link to={`/main/partner/storeRead/storePage/${storeId}`} state={{ body:body}}>
          <table  >
            
            <tbody>
              
                <tr>
                  <th style={{width:'70px'}}> <input type="checkbox"/></th>
                  <th style={{width:'180px',display: 'inline-block',marginRight:'5px'}}>{body.store_name}</th>
                  <th style={{width:'120px',display: 'inline-block'}}>{body.store_owner}</th>
                  <th style={{width:'270px',display: 'inline-block'}}>{body.store_phone}</th>
                  <th style={{width:'250px',display: 'inline-block'}}>{body.store_fridge}</th>
                  <th style={{width:'300px',display: 'inline-block'}}>{body.store_isContract}</th>
                  <th style={{width:'260px'}}>{body.store_start}</th>
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
  export default Store_card;