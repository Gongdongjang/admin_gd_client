import React,{useEffect,useState} from "react";
import axios from "axios";
import { Link ,useLocation} from "react-router-dom";
import * as functions from './functions.js';
import '../CSS/MdRead.css';

function ItemPage  (){
  const img_url = 'https://gdjang.s3.ap-northeast-2.amazonaws.com/';
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
      .get(`http://localhost:5000/api/search/name/${body.farm_id}/${body.store_id}`)
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
      .get(`http://localhost:5000/api/read/imgs/${body.md_id}`)
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
  const isFridge=()=>{
    if(body.md_isFridge)
      fridge="냉장 보관 필요";
    else
      fridge="실온 보관 가능"
      return fridge;
  }
  return (
    <div className="section">
      <div className='mdPage_container'>
        <h1>상품 상세페이지</h1>
        <Link to={`/orderList/${body.md_id}`} state={{md_id : body.md_id}}>
        <h3>픽업리스트 확인하기</h3>  
        </Link>
        <div className="pageContent">
          
          <p>상품번호 : {body.md_id}</p>
          <p>상품이름 : {body.md_name}</p>
          <p>상품가격 : {body.pay_price} </p>
          <p>남은구매일 : {body.md_dd} </p>
          <p>상품중량 : {body.md_weight}</p>
          <p>상품구성 : {body.pay_comp}</p>
          <p>냉장고필요여부 : {isFridge()}</p>
          <p>진행농가 : {farm}</p>
          <p>농가소개 : {farm_info}</p>
          <p>구매제한 : {body.md_maxqty}</p>
          <p>할인정보 : {body.pay_dc}</p>
          <p>결제예정일 : {body.pay_schedule.substr(0, 10)}</p>
          <p>진행일 : {functions.duration(body.md_start,body.md_end)}</p>
          <p>목표수량 : {body.stk_goal}</p>
          <p>최대확보수량 : {body.stk_max}</p>
          <p>남은수량 : {body.stk_remain}</p> 
          <p>현재구매수량 : {body.stk_total}</p>
          <p>가게이름 : {store}</p>
          <p>가게 설명 : {store_info}</p>
          <p>픽업일 : {functions.duration(body.pu_start,body.pu_end)}</p>
          <p>썸네일</p>

          <img src={ img_url + thumbnail} alt={`${thumbnail}`}/>
          <p>슬라이드</p>
          <div>
          {images.map((image, id) => (
                <div  className="imgbox" key={id}>
                  
                  <img className="selectedImg" src={img_url+image} alt={`${image}-${id}`} />
                </div>
              ))}
          </div>
          
          <br/> <br/> <br/> <br/> <br/>
          <p>상세이미지</p>
          <img src={ img_url+ detail} alt={`${detail}`} />

        </div>
                
        <div className="pageBtn">
          <div className='ud_btn'>
            <Link to={`/mdPost/update/${body.md_id}`} ><button  type="button">수정</button></Link>
            <button type="button" onClick={()=>functions.removeMD(body.md_id)}>삭제</button>
          </div>
          <div className='return_btn'>
            <Link to="/mdRead"><button>목록으로 돌아가기</button></Link>
          </div>
        </div>
      </div>
    </div>
      );
}
export default ItemPage;