import React,{useEffect,useState} from "react";
import axios from "axios";
import { Link ,useLocation} from "react-router-dom";
import PartnerMdList from "./PartnerMdList";
import * as functions from './functions.js';
import '../CSS/PartnerRead.css';

function Store_page  (){
  const img_url = 'https://ggdjang.s3.ap-northeast-2.amazonaws.com/';
  const body = useLocation().state.body;
  let[loading,setLoding]=useState(false);
  let[ItemList,setItemList]=useState([]);
  let[mdCount,setMdCount]=useState(0);
  const [ style, setStyle ] = useState({display: 'none'});
  //console.log(JSON.stringify(body));

  let[thumbnail,setThumbnail] = useState();
  let[main,setMain] = useState();
  let[detail,setDetail] = useState();
 useEffect(() => {  
  axios
  .get(`http://localhost:5000/api/partner/read/store/imgs/${body.store_id}`)
  .then(({data }) => {
    console.log(data);
    setThumbnail(data[0].store_thumbnail);
    setMain(data[0].store_mainImg);
    setDetail(data[0].store_detailImg);
  })
  .catch(e => {  // API 호출이 실패한 경우
    console.error(e);  // 에러표시 
  });
  axios
      .get(`http://localhost:5000/api/partner/md/store/${body.store_id}`)
      .then(({ data }) => {
        console.log(data);
        setLoding(true);
        setItemList(data);
        setMdCount(data.length);
      })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시
        setLoding(false);
      });

 }, []);

 const getHours=()=>
 {
   let string = "월요일 : "+body.hours_mon1+" ~ "+body.hours_mon2+" 화요일 : "+body.hours_tue1+" ~ "+body.hours_tue2+" 수요일 : "+body.hours_wed1+" ~ "+body.hours_wed2+" 목요일 : "+body.hours_thu1+" ~ "+body.hours_thu2
   +" 금요일 : "+body.hours_fri1+" ~ "+body.hours_fri2+" 토요일 : "+body.hours_sat1+" ~ "+body.hours_sat2+" 일요일 : "+body.hours_sun1+" ~ "+body.hours_sun2;
   //console.log(string);
   return string;
   //console.log(hours.mon1);
   //console.log(JSON.stringify(hours.value));
 }

  return (
    <div className="section">
       
      <div className='farmPage_container'>
        <div className="farmPageContent">
          <img className="pageThumbnail" src={ img_url + main} />
          
          <div className='page_title'>
            <p className="partner_name">{body.store_name}</p>
            <Link to={`/partner/partner_post/storePost/update/${body.store_id}`} ><p className="updateBtn">수정하기</p></Link>
          </div>
    
          <table className="partnerPage_table">
            <tbody>
           
            <tr><th>스토어번호</th><th>{body.store_id}</th></tr>
            <tr><th>스토어정보 </th><th> {body.store_info} </th></tr>
            <tr><th>스토어 위치 </th><th>{body.store_loc}{body.farm_detailLoc}</th></tr>
            <tr><th>우편번호  </th><th> {body.store_zonecode}</th></tr>
            <tr><th>운영시간  </th><th> {getHours()}</th></tr>
            <tr><th>운영요일  </th><th>{body.hours_week}</th></tr>
            <tr><th>규모  </th><th>{body.store_size}</th></tr>
            <tr><th>사장님  </th><th> {body.store_owner}</th></tr>
            <tr><th>연락처  </th><th> {body.store_phone}</th></tr>
            <tr><th>사업자등록번호 </th><th> {body.store_businessNum}</th></tr>
            <tr><th>이메일  </th><th> {body.store_email}</th></tr>
            
            <tr><th>계약기간  </th><th> {body.store_contractTerm}</th></tr>
            <tr><th>계약여부  </th><th> {body.store_isContract}</th></tr>
            <tr><th>거래기간  </th><th> {functions.duration(body.store_start,body.store_end)}</th></tr>
           
            </tbody>
          </table>


          <p>썸네일</p>
          <img src={ img_url+ thumbnail} alt={`${thumbnail}`} />
          <p>상세이미지</p>
          <img src={ img_url+ detail} alt={`${detail}`} />

        </div>
        <div className="farmPageReport">
          
        <div className='page_title'>
            <p className="partner_name">진행내역</p>
          </div>
          <div >
            <PartnerMdList Itemcard={ItemList} mdCount={mdCount} style={style}/>
          </div>
          <p>스토어매출 </p>
          <p>월 평균 nnnn원</p>
          
          <p>매출 추이</p>
          <div className="report"></div>
          <p>특이사항  </p>
          <p className="page_memo">{body.store_memo}</p>

          
        </div>
                {/*
        <div className="pageBtn">
        <button type="button" onClick={()=>functions.removeMD(body.farm_id)}>삭제</button>
          <div className='return_btn'>
            <Link to="/farmRead"><button>목록으로 돌아가기</button></Link>
          </div> 
        </div>*/}
      </div> 
    </div>
      );
}
export default Store_page;