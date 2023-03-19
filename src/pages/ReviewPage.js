import React,{useEffect,useState} from "react";
import axios from "axios";
import { Link ,useLocation} from "react-router-dom";
import * as functions from './functions.js';
import noImg from "../imgs/gdg_admin_ic/ic_imgx.png";
import '../CSS/MdRead.css';
function ReviewPage  (){
  const img_url = 'https://ggdjang.s3.ap-northeast-2.amazonaws.com/';
  const body = useLocation().state.body;
  //console.log(JSON.stringify(body));
  let[img1,setImg1] = useState('');
  let[img2,setImg2] = useState('');
  let[img3,setImg3] = useState('');
  let[mdName,setMdName] = useState('');
  let[user_id,setUser_id] = useState('');
  var deleteMsg='사용자에 의해 작성된 리뷰입니다';

  useEffect(() => {  
    axios
    .get(`/api/review/img/${body.rvw_id}`)
    .then(({data }) => {
      console.log(data);
      setImg1(data[0].rvw_img1);
      setImg2(data[0].rvw_img2);
      setImg3(data[0].rvw_img3);
    })
    .catch(e => {  // API 호출이 실패한 경우
      console.error(e);  // 에러표시 
    });
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

   const deleteRvw=(e)=>{//리뷰삭제 or 복구하기
    if(body.rvw_isDelete){ //삭제된거면 복구 
      e.preventDefault();
      if (window.confirm('리뷰를 복구하시겠습니까?'))
      {
        axios
        .post(`/api/review/recover/${body.rvw_id}`)
        .then((res) => console.log(res))
        .then(alert("복구되었습니다"))
        .then(window.location.href = '/main/review/delectedList'); 
      }
    }
    else{ //삭제전이면 삭제
      e.preventDefault();
      if (window.confirm('리뷰를 삭제하시겠습니까?'))
      {
        axios
        .post(`/api/review/delete/${body.rvw_id}`)
        .then((res) => console.log(res))
        .then(alert("삭제되었습니다"))
        .then(window.location.href = '/main/review'); 
      }
    }
   
    
  }
  const who=()=>{
    if(body.rvw_isDelete) //1이면 삭제된거(영구 ㄴㄴ)
    {
      if(body.rvw_who)//1이면 관계자 0이면 사용자
        deleteMsg="관계자에 의해 삭제된 리뷰입니다";
      else
        deleteMsg="사용자에 의해 삭제된 리뷰입니다";
    }
    return deleteMsg;
  }
  return (
    <div className="section">
      <div className='farmPage_container'>
        <div className="reviewPageContent">
          
          
          <h2>리뷰상세보기</h2>
          <button id="rvwBtn" onClick={deleteRvw}>{body.rvw_isDelete?"리뷰 복구하기":"리뷰 삭제하기"}</button>
          <table className="reviewPage_table">
          
            <tbody>
           
            <tr><th>상품명</th><th>{mdName}</th></tr>
            <tr><th>아이디 </th><th> {user_id} </th></tr>
            <tr><th>작성일자 </th><th>{body.rvw_datetime}</th></tr>
            <tr><th>삭제일자</th><th> {body.rvw_delete}</th></tr>
            <tr><th>별점  </th><th> {body.rvw_rating}</th></tr>
            <tr><th>이미지 </th><th> <img id="rvwImg" src={ img1=='null'?noImg:(img_url + img1)} />
            <img id="rvwImg" src={img2=='null'?noImg:(img_url + img2)} /><img id="rvwImg" src={img3=='null'?noImg:(img_url + img3)} /></th></tr>
            </tbody>
          </table>
        </div>
        <div>
          <div id="rvw_isDelete">삭제여부</div>
          <div id="rvw_who">
            {who()}
          </div>
        </div>
        <div className="reviewPageTXT">
        본문
        <div id="rvw_txt">{body.rvw_content}</div>

                
        
      </div>
    </div>
    </div>
      );
}
export default ReviewPage;