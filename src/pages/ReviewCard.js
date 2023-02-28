import React,{useEffect,useState} from "react";

import { Link ,useLocation} from "react-router-dom";
import * as functions from './functions.js';
function ReviewCard({  body,style }) {
 
  let[farm,setFarm] = useState();
  let[store,setStore] = useState();

    return (
      
      <div>
        <li className="item_card"  >
          <Link to={`/main/review/reviewRead/ReviewPage/${body.rvw_id}`} state={{ body:body}}>
          <table  >
            
            <tbody>
              
                <tr>
                  <th style={{width:'20px'}}> <input type="checkbox"/></th>
                  <th style={{width:'300px'}}>{body.md_id}</th>
                  <th style={{width:'200px',display: 'inline-block',marginRight:'5px'}}>{body.user_no}</th>
                  <th style={{width:'200px',display: 'inline-block'}}>{body.rvw_datetime}</th>
                  <th style={{width:'200px',display: 'inline-block'}}>{body.rvw_rating}</th>
                  <th style={{width:'350px',display: 'inline-block'}}>{body.rvw_content}</th>
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
  export default ReviewCard;