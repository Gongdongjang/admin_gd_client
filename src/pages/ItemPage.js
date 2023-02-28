import React,{useEffect,useState} from "react";
import axios from "axios";
import { Link ,useLocation} from "react-router-dom";
import * as functions from './functions.js';
import noImg from "../imgs/gdg_admin_ic/image_not_supported_48.png";
import '../CSS/MdRead.css';

function ItemPage  (){
  const img_url = 'https://ggdjang.s3.ap-northeast-2.amazonaws.com/';
  const body = useLocation().state.body;
  //console.log(JSON.stringify(body));
  let[farm, setFarm] = useState();
  let[store, setStore] = useState();
  let[farm_info, setFarm_info] = useState();
  let[store_info, setStore_info] = useState();
  let[thumbnail,setThumbnail] = useState();
  let[images,setImages] = useState([]);
  let[detail,setDetail] = useState();
 

  const loadImage=(arr)=>
  {
    
    let imageLists=arr;
    let imageUrlLists = [...images];

    for (let i = 0; i < imageLists.length; i++) {
      imageUrlLists.push(imageLists[i]);
    }
    setImages(imageUrlLists);


  }
  let fridge ='';
  useEffect(() => { //상점,농가 id로 이름 검색해서 넣기 
    
    axios
      .get(`http://localhost:5000/api/md/name/${body.farm_id}/${body.store_id}`)
      .then(({data }) => {
        //console.log(data);
        setFarm(data.farm_name);
        setStore(data.store_name);
        setFarm_info(data.farm_info);
        setStore_info(data.store_info);
      })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시
      });
  
      axios
      .get(`http://localhost:5000/api/md/imgs/${body.md_id}`)
      .then(({data }) => {
        console.log(data);
       console.log(data[0].mdimg_thumbnail.toString());
        setThumbnail(data[0].mdimg_thumbnail);
        
        setDetail(data[0].mdImg_detail);
        var arr = new Array(data[0].mdImg_slide01,
          data[0].mdImg_slide02,
          data[0].mdImg_slide03, 
          data[0].mdImg_slide04, 
         data[0].mdImg_slide05); 
         loadImage(arr);
      })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시 
      });

  }, []);
  const mdCancle=(e)=>{
   
    e.preventDefault();
         axios
         .post(`http://localhost:5000/api/md/cancle/${body.md_id}`)
         .then((res) => console.log(res))
         .then(alert("공동구매가 종료되었습니다"))
         .then(window.location.href = '/mdPost/MDEnd'); 
     
  }
  return (
    <div className="section">
      <div className='farmPage_container'>
        <div className="farmPageContent">
          <img className="pageThumbnail" src={ img_url + thumbnail} />
          
          <div className='page_title'>
            <p className="partner_name">{body.md_name}</p>
            <Link to={`/main/MDPost/mdPost/update/${body.md_id}`} ><p className="updateBtn">수정하기</p></Link>
          </div>
          <Link to={`/main/orderList/${body.md_id}`} state={{md_id : body.md_id}}>
        <h4>픽업리스트 확인하기</h4>  
        </Link>
          <table className="partnerPage_table">
          
            <tbody>
            <tr><th>상품번호</th><th>{body.md_id}</th></tr>
            <tr><th>등록일/수정일</th><th> {body.md_date}</th><th>조회수</th><th> {body.md_views}</th></tr>
            <tr><th>시작 날짜  </th><th>  {body.md_start}</th><th>마감 날짜</th><th>{body.md_end}</th></tr>
            <tr><th>픽업일  </th><th>{functions.duration(body.pu_start,body.pu_end)}</th><th>냉장고 유무</th><th>{body.md_isFridge}</th></tr>
            <tr><th>농가</th><th> {farm}</th><th>스토어</th><th> {store}</th></tr>
            <tr><th>목표수량</th><th> {body.stk_goal}</th><th>상품종류  </th><th> {body.md_type}</th></tr>
            <tr><th>상품구성  </th><th>{body.pay_comp}</th></tr>
            <tr><th>상품가격 </th><th>{body.pay_price}</th><th>할인정보 </th><th> {body.pay_dc}</th></tr>
            </tbody>
          </table>
          <button id="MD_cancelBtn" onClick={mdCancle}>공동구매 종료하기</button>
        </div>
        <div className="farmPageReport">
        <h2>공동구매 이미지 등록  </h2>
        <div className="pageImgBox">
          <div>
            <div className="pageImg">
              <p>썸네일이미지</p>
              <img src={ img_url + thumbnail} alt={`${thumbnail}`}/>
            </div>
            <div className="pageImg">
              <p>본문 이미지</p>
              <img src={ img_url+ detail} alt={`${detail}`} />
            </div>
          </div>
          
          <div className="pageImgMain">
          <p>메인이미지</p>
            <div className="pageSlide">
              {images.map((image, id) => (
                <span   key={id}>
                  <img className="selectedImg" src={img_url+image} />
                </span>
              ))}
            </div>
          </div>
         

        </div>

          
          
        <h2>공동구매 진행상황  </h2>
        <table className="MD_table">  
        
        <tbody>
          
            <tr><th>진행단계</th><th> {body.stk_confirm}</th><th>주문확정여부  </th><th> {body.md_result}</th></tr>
            <tr><th>목표수량</th><th> {body.stk_goal}</th><th>남은수량  </th><th> {body.stk_remain}</th></tr>
            <tr><th>현재구매수량  </th><th> {body.stk_total}</th></tr>
       
            <tr><th>운송장번호</th><th> {body.pu_waybill}</th></tr>
            
            
            </tbody>
          </table>
      </div>
    </div>
    </div>
      );
}
export default ItemPage;