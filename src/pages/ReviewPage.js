import React,{useEffect,useState} from "react";

import { Link ,useLocation} from "react-router-dom";
import * as functions from './functions.js';
import noImg from "../imgs/gdg_admin_ic/image_not_supported_48.png";
import '../CSS/MdRead.css';
function ReviewPage  (){
  const img_url = 'https://ggdjang.s3.ap-northeast-2.amazonaws.com/';
  const body = useLocation().state.body;
  //console.log(JSON.stringify(body));
  let[img1,setImg1] = useState('');
  let[img2,setImg2] = useState('');
  let[img3,setImg3] = useState('');
  var deleteMsg='시용자에 의해 작성된 리뷰입니다';
  const who=()=>{
    if(body.rvw_isDelete) //1이면 삭제된거(영구 ㄴㄴ)
    {
      if(body.rvw_who)//1이면 관계자 0이면 사용자
        deleteMsg="관계자에 의해 삭제된 리뷰입니다";
      else
        deleteMsg="시용자에 의해 삭제된 리뷰입니다";
    }
  }
  return (
    <div className="section">
      <div className='farmPage_container'>
        <div className="reviewPageContent">
          
          
          <h1>리뷰상세보기</h1>
    
          <table className="partnerPage_table">
          
            <tbody>
           
            <tr><th>상품명</th><th>{body.md_id}</th></tr>
            <tr><th>아이디 </th><th> {body.user_no} </th></tr>
            <tr><th>작성일자 </th><th>{body.rvw_datetime}</th></tr>
            <tr><th>삭제일자</th><th> {body.rvw_delete}</th></tr>
            <tr><th>별점  </th><th> {body.rvw_rating}</th></tr>
            <tr><th>이미지 </th><th> <img id="rvwImg" src={ img1==''?noImg:(img_url + img1)} />
            <img id="rvwImg" src={img2==''?noImg:(img_url + img2)} /><img id="rvwImg" src={img3==''?noImg:(img_url + img3)} /></th></tr>
            </tbody>
          </table>
        </div>
        <div>
          <div id="rvw_isDelete">삭제여부</div>
          <div id="rvw_who">
            {deleteMsg}
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