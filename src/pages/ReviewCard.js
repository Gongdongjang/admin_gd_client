import React,{useEffect,useState} from "react";

import { Link ,useLocation} from "react-router-dom";
import * as functions from './functions.js';
import axios from "axios";
function ReviewCard({  body,style,handleClickCheckbox,delete_list }) {
  let[mdName,setMdName] = useState('');
  let[user_id,setUser_id] = useState('');
  useEffect(() => {  
    
    axios
        .get(`/api/review/${body.rvw_id}`)
        .then(({ data }) => {
          console.log(data);
          setMdName(data[0].md_name);
          setUser_id(data[0].user_id);
        })
        .catch(e => {  // API 호출이 실패한 경우
          console.error(e);  // 에러표시
          
        });
  
   }, []);


    return (
      
      <div>
        <li className="item_card"  >
          <Link to={`/main/review/reviewRead/ReviewPage/${body.rvw_id}`} state={{ body:body}}>
          <table  >
            
            <tbody>
              
                <tr>
                  <th style={{width:'20px'}}> <input type={"checkbox"} value={body.rvw_id} onClick={(event) => handleClickCheckbox(event, delete_list)}/></th>
                  <th style={{width:'300px'}}>{mdName}</th>
                  <th style={{width:'200px',display: 'inline-block',marginRight:'5px'}}>{user_id}</th>
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