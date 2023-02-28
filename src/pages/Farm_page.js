import React,{useEffect,useState} from "react";
import axios from "axios";
import { Link ,useLocation} from "react-router-dom";
import PartnerMdList from "./PartnerMdList";
import * as functions from './functions.js';
import '../CSS/PartnerRead.css';

function Farm_page  (){
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
  let[saleQty,setSaleQty] = useState();
 useEffect(() => {  
  axios
  .get(`http://localhost:5000/api/partner/read/farm/imgs/${body.farm_id}`)
  .then(({data }) => {
   // console.log(data);
    //console.log(data[0].farm_img.toString());
    setSaleQty(data[0].farm_saleQty);
    setThumbnail(data[0].farm_thumbnail);
    setMain(data[0].farm_mainImg);
    setDetail(data[0].farm_detailImg);

  })
  .catch(e => {  // API 호출이 실패한 경우
    console.error(e);  // 에러표시 
  });
  axios
      .get(`http://localhost:5000/api/partner/md/farm/${body.farm_id}`)
      .then(({ data }) => {
        //console.log(data);
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
   
   return string;
 }
  return (
    <div className="section">
       
      <div className='farmPage_container'>
        <div className="farmPageContent">
          <img className="pageThumbnail" src={ img_url + main} />
          
          <div className='page_title'>
            <p className="partner_name">{body.farm_name}</p>
            <Link to={`/main/partner/partner_post/farmPost/update/${body.farm_id}`} ><p className="updateBtn">수정하기</p></Link>
          </div>
    
          <table className="partnerPage_table">
            <tbody>
           
            <tr><th>농가번호</th><th>{body.farm_id}</th></tr>
            <tr><th>농가정보 </th><th> {body.farm_info} </th></tr>
            <tr><th>농가 위치 </th><th>{body.farm_loc}{body.farm_detailLoc}</th></tr>
            <tr><th>우편번호  </th><th> {body.farm_zonecode}</th></tr>
            <tr><th>운영시간  </th><th> {getHours()}</th></tr>
            <tr><th>운영요일  </th><th>{body.hours_week}</th></tr>
            <tr><th>규모  </th><th>{body.farm_size}</th></tr>
            <tr><th>농장주  </th><th> {body.farm_farmer}</th></tr>
            <tr><th>사업자등록번호  </th><th> {body.farm_businessNum}</th></tr>
            <tr><th>연락처  </th><th> {body.farm_phone}</th></tr>
            <tr><th>이메일  </th><th> {body.farm_email}</th></tr>
            <tr><th>주요품목  </th><th> {body.farm_mainItem}</th></tr>
            <tr><th>거래품목  </th><th> {body.farm_saleItem}</th></tr>
            <tr><th>계약기간  </th><th> {body.farm_contractTerm}</th></tr>
            <tr><th>계약여부  </th><th> {body.farm_isContract}</th></tr>
            <tr><th>거래횟수  </th><th> {saleQty}</th></tr>
            <tr><th>거래기간  </th><th> {functions.duration(body.farm_start,body.farm_end)}</th></tr>
           
            </tbody>
          </table>


          <p>썸네일</p>
          <img src={ img_url+ thumbnail} alt={`${thumbnail}`} />
          <p>상세이미지</p>
          <img src={ img_url+ detail} alt={`${detail}`} />

        </div>
        <div className="farmPageReport">
        <p className="partner_name">공동구매 진행내역</p>
        
          <div >
            <PartnerMdList Itemcard={ItemList} mdCount={mdCount} style={style}/>
          </div>
          <p>농가매출 </p>
          <p>월 평균 nnnn원</p>
          <p>총 거래 횟수 {body.farm_saleQty}번</p>
          <p>매출 추이</p>
          <div className="report"></div>
          <p>특이사항  </p>
          <p className="page_memo">{body.farm_memo}</p>

          
        </div>
                
      </div> 
    </div>
      );
}
export default Farm_page;