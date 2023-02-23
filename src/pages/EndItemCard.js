import React,{useEffect,useState} from "react";
import axios from "axios";
import { Link ,useLocation} from "react-router-dom";
import * as functions from './functions.js';
function EndItemCard({  body , farmName ,storeName,style }) {
 
  let[farm,setFarm] = useState();
  let[store,setStore] = useState();
  let[result,setResult] = useState('');
  let[resultColor,setResultColor] = useState('');
  

  useEffect(() => { //상점,농가 id로 이름 검색해서 넣기 
    
    axios
      .get(`http://localhost:5000/api/md/name/${farmName}/${storeName}`)
      .then(({data }) => {
        //console.log(data);
        setFarm(data.farm_name);
        setStore(data.store_name);
      })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시
      });

      getResult();

  }, []);
  const getResult=()=>{

    if(body.md_result==0) //0이면 취소 1이면 성공 2이면 종료
    {
        setResult("진행실패");
        setResultColor("resultRed");
    }
    else if(body.md_result==1)
    {
      setResult("진행확정");
      setResultColor("resultGreen");
    }
    else if(body.md_result==2)
    {
      setResult("진행종료");
      setResultColor("resultPurple");
    }
  }
    return (
      
      <div>
        <li className="item_card"  >
          <Link to={`/mdPost/MDRead/ItemPage/${body.md_id}`} state={{ body:body}}>
          <table  >
            
            <tbody>
              
                <tr>
                  <th style={{width:'20px'}}> <input type="checkbox"/></th>
                  <th style={{width:'70px'}}>{body.md_id}</th>
                  <th style={{width:'260px',display: 'inline-block',marginRight:'5px'}}>{body.md_name}</th>
                  <th style={{width:'145px',display: 'inline-block'}}>{farm}</th>
                  <th style={{width:'145px',display: 'inline-block'}}>{store}</th>
                  <th style={{width:'150px',display: 'inline-block'}}>{body.md_type}</th>
                  <th style={{width:'130px',display: 'inline-block'}}>{body.md_date.substr(0, 10)}</th>
                  <th style={{width:'260px'}}>{functions.duration(body.md_start,body.md_end)}</th>
                  <th style={{width:'120px'}}>{body.stk_total}/{body.stk_goal}</th>
                  <th style={{width:'150px'}}><span id={resultColor} >......</span>{result}</th>
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
  export default EndItemCard;