import React ,{useState,useEffect,useCallback}from "react";
import axios from "axios";
import { Link ,useLocation,useParams, useNavigate} from "react-router-dom";
import '../CSS/MdPost.css';
import MapTest from "./MapTest";
import * as functions from './functions.js';
function Store_post() {
  let navigate = useNavigate();//뒤로가기
  //이미지
  const url = useLocation();
  const img_url = 'https://ggdjang.s3.ap-northeast-2.amazonaws.com/';


  const [thumbnailImage, setThumbnailImage] = useState({
    image_file: "",
    preview_URL: "",
  });
  const [mainImage, setMainImage] = useState({
    image_file: "",
    preview_URL: "",
  });
  const [detailImage, setDetailImage] = useState({
    image_file: "",
    preview_URL: "",
  });
  const [photos,setPhotos] = useState({ //상품별 이미지
    thumbnail : '',
    main:'',
    detail : '',
  
  })
  const{ thumbnail, main, detail,} = photos; //이미지 정보

  const [store_loc,setStore_loc]=useState();
  const [store_detailLoc,setStore_detailLoc]=useState('');
  const [store_zonecode,setStore_zonecode]=useState();
  const { store_id } = useParams();//??????
  const [input, setInput] = useState({ //store 정보
   store_name : '',
   store_info : '',
   store_size : '',

   store_owner: '',
   store_phone : '',
   store_email: '',

   store_start : '',
   store_end : '',
   store_contractTerm: '',
   store_isContract : '',
   
   store_type: '',
   store_fridge: '',
   store_number: '',
   store_businessNum:'없음',
   store_memo : '',

})



const {  
  store_name ,store_info  ,store_size , store_owner ,store_phone ,store_email,store_start ,store_end,
  store_contractTerm, store_isContract ,store_memo ,store_type, store_fridge,store_number,store_businessNum, hours_week} = input; //농가 정보

const handleDeleteImage = () => {
    //setImages([]);
    //setSlides([]);
  };

  const [hours, setHours] = useState({ 
    mon1 : '', mon2 : '', tue1 : '',tue2 : '',wed1 : '',wed2 : '', thu1 : '', thu2 : '', fri1 : '',fri2 : '',sat1 : '',sat2 : '',sun1 : '',sun2:'',
  })
  const { mon1 , mon2 , tue1 ,tue2 ,wed1 ,wed2 , thu1 , thu2, fri1 ,fri2, sat1 ,sat2 ,sun1 ,sun2} = hours;

  useEffect(() => {
    //load();
  
    if (url.pathname.includes('update')) {
      getPostContent();
    }
  }, []);
  const getPostContent= async () => { //작성된 내용 가져오기_수정시
    //  hours에서도 읽어오기
  
    const res = await axios.get(`http://localhost:5000/api/partner/read/store/${store_id}`);
    const datas= res.data;
    console.log(datas);
    
    const getData = {
      store_name : datas[0].store_name,
      store_info : datas[0].store_info,

      store_size : datas[0].store_size,
     
      store_owner: datas[0].store_owner,
      store_phone : datas[0].store_phone,
      store_email: datas[0].store_email,
     
      store_contractTerm: datas[0].store_contractTerm,
      store_isContract : datas[0].store_isContract,

      store_memo : datas[0].store_memo ,
      store_type : datas[0].store_type,
      store_fridge : datas[0].store_fridge,
      store_number : datas[0].store_number,
      store_businessNum :datas[0].store_businessNum,
      store_start:datas[0].store_start,
      store_end:datas[0].store_end,
      store_type:datas[0].store_type,

      //운영시간
      
      mon1 : datas[0].hours_mon1, mon2 : datas[0].hours_mon2,
      tue1 : datas[0].hours_tue1, tue2 : datas[0].hours_tue2,
      wed1 : datas[0].hours_wed1, wed2 : datas[0].hours_wed2,
      thu1 : datas[0].hours_thu1, thu2 : datas[0].hours_thu2,
      fri1 : datas[0].hours_fri1, fri2 : datas[0].hours_fri2,
      sat1 : datas[0].hours_sat1, sat2 : datas[0].hours_sat2,
      sun1 : datas[0].hours_sun1, sun2 : datas[0].hours_sun2,
      week: datas[0].hours_week,
    };
    console.log(getData);
    setInput(getData);
    setHours(getData);
    setStore_loc(datas[0].store_loc);
    setStore_detailLoc(datas[0].store_detailLoc);
    setStore_zonecode(datas[0].store_zonecode);
    setThumbnailImage(datas[0].store_thumbnail);
    setDetailImage(datas[0].store_detailImg);
    setMainImage(datas[0].store_mainImg);
    functions.setChecked( datas[0].hours_week);
    functions.setChecked( datas[0].store_fridge);

  }
  const handleSubmit=(e)=> { //제출
    
    
    e.preventDefault();
    //if(!store_name || !store_loc  || !store_owner 
    //  || !store_phone ||  !store_start ||  !store_isContract ) //진행상황 필수로 바꾸기
    if(false)
    {
      alert("필수입력란을 채워주세요");
    }
    else
    {
      let body = {
        store_name : store_name, store_info : store_info, 
        store_loc : store_loc, store_detailLoc : store_detailLoc, store_zonecode : store_zonecode,
        store_size : store_size, store_owner: store_owner,
        store_phone : store_phone, store_email: store_email,
        store_start : store_start, store_end: store_end, 
        store_contractTerm: store_contractTerm, store_isContract : store_isContract,
        store_memo : store_memo , store_type : store_type,
        store_fridge : store_fridge, store_number : store_number,
        store_businessNum : store_businessNum,

        hours_mon1 : mon1,hours_mon2 : mon2,
        hours_tue1 : tue1,hours_tue2 : tue2,
        hours_wed1 : wed1,hours_wed2 : wed2,
        hours_thu1 : thu1,hours_thu2 : thu2,
        hours_fri1 : fri1,hours_fri2 : fri2,
        hours_sat1 : sat1,hours_sat2 : sat2,
        hours_sun1 : sun1,hours_sun2 : sun2,
        hours_week : hours_week,
       };
       console.log(body);
       const config = {
        headers : {'content-type': 'multipart/form-data'}
    };
       let formData = new FormData();
       formData.append('thumbnail',thumbnail);
       formData.append('main',main);
       formData.append('detail',detail);
       
       
       if(!store_id)
       {
         axios
         .post("http://localhost:5000/api/partner/post/store", body)
         .then((res) => console.log(res) )
         .then(alert("등록이 완료되었습니다"))
         .then(window.location.href = '/partner/storeRead');
         axios   // 이미지 추가
         .post(`http://localhost:5000/api/partner/post/store/popo`, formData,config)
         .then((res) => console.log(res))
        
       }
       else{
         axios
         .post(`http://localhost:5000/api/partner/store/update/${store_id}`, body)
         .then((res) => console.log(res))
         .then(alert("수정이 완료되었습니다"))
         .then(window.location.href = '/partner/storeRead');
         
       }
      
    }
    
  }


function handleClick() { //뒤로가기
  alert("작성중인 내용이 삭제됩니다");
  window.location.href = '/partner/storeRead';  
  //navigate(-1)
  }
const handleCheck = (e) => {//체크된것만 get
    // 선택된 목록 가져오기
    const query = 'input[name="'+e.target.name+'"]:checked';
    const selectedEls = document.querySelectorAll(query);
    
    // 선택된 목록에서 value 찾기
    let result = '';
    selectedEls.forEach((el) => {
      result += el.value + ' ';
    });
    
    // 출력
    let name =e.target.name;
    let value=result;
   
    setInput({
      ...input,
      [name]:value
  });
  
  };
const changeSelectOptionHandler = (e) =>{ //드롭바 형식 선택
    
    let name=e.target.name;
    let value = e.target.value;
    console.log("select"+name+value);
    setInput({
      ...input,
      [name]:value
    });
  };
  
const onDebounceChange = e => { //새 input 함수_호출빈도 down
    const {name, value} = e.target ;
      setInput({
          ...input,
          [name]:value
      });
      printValue(name,value);
  };
const printValue = useCallback( //농가 상점 검색
  functions.debounce((name,value)=> {},500),[]
);
const changeHours=(e)=>{ //시간입력
  //const {name, value} = e.target ;// destructuring
  let name =e.target.name;
  let value =e.target.value;
  console.log(e.target.value);
  setHours({
      ...hours,
      [name]:value
  });
}

const handleFileChange = (event) => { //이미지 업로드

  event.preventDefault();
  const name = event.target.name;
  const file = event.target.files[0];
  const fileReader = new FileReader();
  
  if(event.target.files[0]){
    fileReader.readAsDataURL(event.target.files[0])
  }
  fileReader.onload = () => {
    if(name=="thumbnail")
      setThumbnailImage(
      {
        image_file: event.target.files[0],
        preview_URL: fileReader.result
      }
    )
    else if(name=="main")
      setMainImage(
      {
        image_file: event.target.files[0],
        preview_URL: fileReader.result
      }
    )
    else
      setDetailImage(
      {
        image_file: event.target.files[0],
        preview_URL: fileReader.result
      }
    )
  }
    
    setPhotos({
      ...photos,
      [name]:file
  });
    console.log(photos);
}

const getNum=()=>{ //스토어 고유번호 발급
  let date= new Date();
  let storeCode=date.getFullYear().toString()+(date.getMonth()+1).toString()+date.getDate()+store_name;
  let name="store_number";
  let value = storeCode;
  setInput({
    ...input,
    [name]:value
});
}

    return (
      <div >
      
        {/*페이지 내용*/} 
        <div className='post'>
            
            <form  className='store_form' onSubmit={handleSubmit}>
            <div className="formCase">
              <div className="PartnerFormLeft">
              <h3>스토어 정보</h3>
            <label>
              스토어 이름 (필수)
              <input type="text" name="store_name" value={store_name} onChange={onDebounceChange} />
            </label><br/>
            <label>
              한줄 소개
              <textarea name="store_info" value={store_info} onChange={onDebounceChange} />
            </label><br/>
            <label>
              스토어 위치 (필수)
              <MapTest loc={store_loc} setLoc={setStore_loc} detailLoc={store_detailLoc} setDetailLoc={setStore_detailLoc} zonecode={store_zonecode} setZonecode={setStore_zonecode}/>
            </label><br/>
            
            <label>
              운영 시간
              월 <input type="time" name="mon1" value={mon1} onChange={changeHours}/> ~ <input type="time" name="mon2" value={mon2}onChange={changeHours}/>
              화 <input type="time" name="tue1"value={tue1} onChange={changeHours}/> ~ <input type="time" name="tue2"value={tue2} onChange={changeHours}/>
              수 <input type="time" name="wed1"value={wed1} onChange={changeHours}/> ~<input type="time" name="wed2"value={wed2} onChange={changeHours}/> 
              목 <input type="time" name="thu1"value={thu1} onChange={changeHours}/> ~<input type="time" name="thu2"value={thu2} onChange={changeHours}/> 
              금 <input type="time" name="fri1"value={fri1} onChange={changeHours}/>  ~<input type="time" name="fri2"value={fri2} onChange={changeHours}/> 
              토 <input type="time" name="sat1"value={sat1} onChange={changeHours}/>~<input type="time" name="sat2"value={sat2} onChange={changeHours}/> 
              일 <input type="time" name="sun1"value={sun1} onChange={changeHours}/> ~ <input type="time" name="sun2"value={sun2} onChange={changeHours}/> 
            </label><br/>
            <label>
            운영 요일 
              <input type="checkbox" name="hours_week" value={'월'} onChange={handleCheck}/>월 <input type="checkbox"name="hours_week" value={'화'} onChange={handleCheck}/>화 
              <input type="checkbox"name="hours_week" value={'수'} onChange={handleCheck}/>수 <input type="checkbox"name="hours_week" value={'목'} onChange={handleCheck}/>목
              <input type="checkbox"name="hours_week" value={'금'} onChange={handleCheck}/>금 <input type="checkbox"name="hours_week" value={'토'} onChange={handleCheck}/>토 
              <input type="checkbox"name="hours_week" value={'일'} onChange={handleCheck}/>일
              
            </label><br/>
             <label>
              스토어 규모
              <input type="text" name="store_size" value={store_size} onChange={onDebounceChange} />
            </label><br/>
            
            <h3>대표님 정보</h3>
            <div>
            <label>
              대표님 성함 (필수)
              <input type="text" name="store_owner" value={store_owner} onChange={onDebounceChange} />
            </label><br/>
            <label>
              전화번호 (필수)
              <input type="text" name="store_phone" value={store_phone} onChange={onDebounceChange} />
            </label><br/>
            <label>
              사업자 등록번호 
              <input type="text" name="store_businessNum" value={store_businessNum} onChange={onDebounceChange} />
            </label><br/>
            <label>
              이메일
              <input type="text" name="store_email" value={store_email} onChange={onDebounceChange} />*30자제한
            </label><br/>
            </div>
              </div>
              <div className="PartnerFormRight">
              <h3>거래정보</h3>
            <label>
              거래기간 (필수)
              <input type="date" name="store_start" value={store_start} onChange={onDebounceChange} />~
              <input type="date" name="store_end" value={store_end} onChange={onDebounceChange} />
            </label><br/>
            <label>
              계약기간
              <input type="text" name="store_contractTerm" value={store_contractTerm} onChange={onDebounceChange} />
            </label><br/>
            
            <label>
              거래상태 (필수)
              <select name="store_isContract" value={store_isContract}onChange={changeSelectOptionHandler}>
              <option value="선택하기">선택하기</option>
			     <option value="협업기획중">협업기획중</option>
			     <option value="공동구매진행">공동구매진행</option>
			     <option value="미활동">미활동</option>
              </select>
            </label><br/>

            <h3>이미지 첨부</h3>
            <label className="imgs">
              썸네일
              <div>
                <img className={thumbnail ? 'selectedImg' : 'noneImg'} alt="이미지 없음" src={thumbnailImage.preview_URL||img_url+thumbnailImage}style={{width:'200px',height:'200px'}}/>
                <input type="file" name="thumbnail"  accept='image/*' onChange={handleFileChange} />
              </div>
              메인이미지
              <div>
                <img className={main ? 'selectedImg' : 'noneImg'} alt="이미지 없음" src={mainImage.preview_URL||img_url+mainImage}style={{width:'200px',height:'200px'}}/>
                <input type="file" name="main"  accept='image/*' onChange={handleFileChange} />
              </div>
              상세이미지
              <div>
                <img className={detail ? 'selectedImg' : 'noneImg'} alt="이미지 없음" src={detailImage.preview_URL||img_url+detailImage}style={{width:'200px',height:'400px'}}/>
                <input type="file" name="detail"  accept='image/*' onChange={handleFileChange} />
              </div>
            </label><br/> 
            <label>
              업체 종류 
              <select name="store_type" value={store_type} onChange={changeSelectOptionHandler}>
                <option value="선택하기">선택하기</option>
			          <option value="제로웨이스트샵">제로웨이스트샵</option>
			          <option value="식료품점">식료품점</option>
			          <option value="카페">카페</option>
                <option value="기타">기타</option>
              </select>
            </label><br/>
            <label>
              냉장고 유무 (필수)
              <input type="checkbox" name="store_fridge" value={"냉장"}  onChange={handleCheck}/>냉장고
              <input type="checkbox" name="store_fridge" value={"냉동"}  onChange={handleCheck}/>냉동고
              <input type="checkbox" name="store_fridge" value={"시설없음"}  onChange={handleCheck}/>없음
              </label>
              <br/>

            <label>
              부여번호
              <input type="text" name=" store_number" value={ store_number} onChange={onDebounceChange} />
            </label>
            <button type="button" onClick={getNum}>발급하기</button><br/>
            
            <label>
              비고
              <textarea name="store_memo" value={store_memo} onChange={onDebounceChange} />
            </label><br/>
              </div>
            
            </div>
            <div className="postFooter">
            <button id="backBtn" type="button" onClick={handleClick}>뒤로가기</button>
            <input id="submitBtn" type="submit" value={ !store_id ? '등록' : '수정'} />
          </div>          
          </form>
        </div>
      </div>
    );
}
  export default Store_post;
