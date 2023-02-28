import React ,{useState,useEffect,useCallback}from "react";
import axios from "axios";
import { Link ,useLocation,useParams, useNavigate} from "react-router-dom";
import '../CSS/MdPost.css';
import MapTest from "./MapTest";
import * as functions from './functions.js';
import { startTransition } from "react";

function Farm_post() {
  let navigate = useNavigate();//뒤로가기
  //이미지
  const url = useLocation();
  const img_url = 'https://ggdjang.s3.ap-northeast-2.amazonaws.com/';
  //let [farm_img,setFarm_img]=useState();
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
  const [farm_loc,setFarm_loc]=useState();
  const [farm_detailLoc,setFarm_detailLoc]=useState('');
  const [farm_zonecode,setFarm_zonecode]=useState();
  const { farm_id } = useParams();//??????
  const [weeks,setWeeks]=useState('');
  const [input, setInput] = useState({ //농장 정보
   farm_name : '',
   farm_info : '',

    farm_size : '',

    farm_farmer: '',
    farm_phone : '없음',
    farm_email: '없음',

    farm_mainItem : '',
    farm_saleItem : '',

    farm_start : '',
    farm_end : '',
    farm_contractTerm: '',
    farm_isContract : '',
    farm_saleQty: 0,
    farm_businessNum:'없음',
    
    farm_memo : '',

})

const {  
    farm_name ,farm_info  ,farm_size ,
    farm_farmer ,farm_phone ,farm_email,farm_mainItem ,farm_saleItem ,farm_start ,farm_end,
    farm_contractTerm, farm_isContract ,farm_saleQty,farm_businessNum,farm_memo ,  hours_week} = input; //농가 정보

  const handleDeleteImage = () => {
    //setImages([]);
    //setSlides([]);
  };

  const [hours, setHours] = useState({ 
    mon1 : '', mon2 : '', tue1 : '',tue2 : '',wed1 : '',wed2 : '', thu1 : '', thu2 : '', fri1 : '',fri2 : '',sat1 : '',sat2 : '',sun1 : '',sun2:'',
  })
  const { mon1 , mon2 , tue1 ,tue2 ,wed1 ,wed2 , thu1 , thu2, fri1 ,fri2, sat1 ,sat2 ,sun1 ,sun2} = hours;
  
  const handleSubmit=(e)=> { //제출
    
    
    e.preventDefault();
    if(!farm_name ) //진행상황 필수로 바꾸기 || !farm_loc  || !farm_farmer || !farm_phone ||  !farm_saleItem || !farm_start ||  !farm_isContract || !farm_saleQty
    {
      alert("필수입력란을 채워주세요");
    }
    else
    {
      let body = {
    farm_name : farm_name,
    farm_info : farm_info,
    farm_loc : farm_loc,
    farm_detailLoc : farm_detailLoc,
    farm_zonecode : farm_zonecode,
 
    farm_size : farm_size,

    farm_farmer: farm_farmer,
    farm_phone : farm_phone,
    farm_email: farm_email,

    farm_mainItem : farm_mainItem,
    farm_saleItem : farm_saleItem ,

    //farm_onSaleFor : getSale(), //합쳐서2022~2023
    farm_start : farm_start,
    farm_end: farm_end, 
    farm_contractTerm: farm_contractTerm,
    farm_isContract : farm_isContract,
    farm_saleQty: farm_saleQty,//디폴트 0
    farm_businessNum:farm_businessNum,

    //farm_img : farm_img, ////////
    farm_memo : farm_memo ,
    //운영시간
    hours_mon1 : mon1,hours_mon2 : mon2,
    hours_tue1 : tue1,hours_tue2 : tue2,
    hours_wed1 : wed1,hours_wed2 : wed2,
    hours_thu1 : thu1,hours_thu2 : thu2,
    hours_fri1 : fri1,hours_fri2 : fri2,
    hours_sat1 : sat1,hours_sat2 : sat2,
    hours_sun1 : sun1,hours_sun2 : sun2,
    hours_week: hours_week,


       };
       console.log(body);
       const config = {
        headers : {'content-type': 'multipart/form-data'}
    };
      let formData = new FormData();
      formData.append('thumbnail',thumbnail);
      formData.append('main',main);
      formData.append('detail',detail);
      
       //서버업로드
       
       if(!farm_id)
       {
         axios
         .post("http://localhost:5000/api/partner/post/farm", body)
         .then((res) => console.log(res))
         .then(alert("등록이 완료되었습니다"))
         .then(window.location.href = '/main/partner/farmRead'); //농가버전
         axios
         .post(`http://localhost:5000/api/partner/post/farm/img`, formData,config);
       }
       else{
        console.log(hours_week);
         axios
         .post(`http://localhost:5000/api/partner/farm/update/${farm_id}`, body)
         .then((res) => console.log(body))
         .then(alert("수정이 완료되었습니다"))
         .then(window.location.href = '/main/partner/farmRead'); //농가 버전
       }
      
    }
    
  }

  const getPostContent= async () => { //작성된 내용 가져오기_수정시
  
    const res = await axios.get(`http://localhost:5000/api/partner/read/farm/${farm_id}`);
    const datas= res.data;
   // console.log(datas[0].hours_week);
    
    const getData = {
        farm_name : datas[0].farm_name,
        farm_info : datas[0].farm_info,
         farm_size : datas[0].farm_size,
     
         farm_farmer: datas[0].farm_farmer,
         farm_phone : datas[0].farm_phone,
         farm_email: datas[0].farm_email,
     
         farm_mainItem : datas[0].farm_mainItem,
         farm_saleItem : datas[0].farm_saleItem ,
     
         farm_onSaleFor : datas[0].farm_onSaleFor, //합쳐서
         farm_contractTerm: datas[0].farm_contractTerm,
         farm_isContract : datas[0].farm_isContract, //------>
         farm_saleQty: datas[0].farm_saleQty,//디폴트 0
         farm_businessNum:datas[0].farm_businessNum,
         farm_start:datas[0].farm_start,
         farm_end:datas[0].farm_end,
     
         farm_memo : datas[0].farm_memo ,

         //운영시간
      
      mon1 : datas[0].hours_mon1, mon2 : datas[0].hours_mon2,
      tue1 : datas[0].hours_tue1, tue2 : datas[0].hours_tue2,
      wed1 : datas[0].hours_wed1, wed2 : datas[0].hours_wed2,
      thu1 : datas[0].hours_thu1, thu2 : datas[0].hours_thu2,
      fri1 : datas[0].hours_fri1, fri2 : datas[0].hours_fri2,
      sat1 : datas[0].hours_sat1, sat2 : datas[0].hours_sat2,
      sun1 : datas[0].hours_sun1, sun2 : datas[0].hours_sun2,
      hours_week: datas[0].hours_week,
    };
    
   
    setInput(getData);
    setHours(getData);
    setFarm_loc(datas[0].farm_loc);
    setFarm_detailLoc(datas[0].farm_detailLoc);
    setFarm_zonecode(datas[0].farm_zonecode);
    setThumbnailImage(datas[0].farm_thumbnail);
    setDetailImage(datas[0].farm_detailImg);
    setMainImage(datas[0].farm_mainImg);
    functions.setChecked( datas[0].hours_week);
  }
  useEffect(() => {
    //load();
  
    if (url.pathname.includes('update')) {
      getPostContent();
      
    }
  }, []);
  function handleClick() {
    alert("작성중인 내용이 삭제됩니다");
  window.location.href = '/main/partner/farmRead'; 
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
  const changeSelectOptionHandler = (e) =>{
    
    let name="farm_isContract";
    let value = e.target.value;
    console.log("select"+value);
    setInput({
      ...input,
      [name]:value
    });
  };
 
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
   console.log(result);
    setInput({
      ...input,
      [name]:value
  });
  
  };
  const changeHours=(e)=>{
    //const {name, value} = e.target ;// destructuring
    let name =e.target.name;
    let value =e.target.value;
    console.log(e.target.value);
    setHours({
        ...hours,
        [name]:value
    });
  }
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

    return (
      <div >
      
        {/*페이지 내용*/} 
        <div className='post'>
            
            <form  className='farm_form' onSubmit={handleSubmit}>
            <div className="formCase">
            <div className="PartnerFormLeft">
            
            <label>
              농가 이름 (필수)
              <input type="text" name="farm_name" value={farm_name} onChange={onDebounceChange} />
            </label><br/>
            <label>
              한줄 소개
              <textarea name="farm_info" value={farm_info} onChange={onDebounceChange} />
            </label><br/>
            <label>
              농가 위치 (필수)
              <MapTest loc={farm_loc} setLoc={setFarm_loc} detailLoc={farm_detailLoc} setDetailLoc={setFarm_detailLoc} zonecode={farm_zonecode} setZonecode={setFarm_zonecode}/>
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
              <input type="checkbox"name="hours_week" value={'월'} onChange={handleCheck}/>월 <input type="checkbox"name="hours_week" value={'화'}  onChange={handleCheck}/>화 
              <input type="checkbox"name="hours_week" value={'수'} onChange={handleCheck}/>수 <input type="checkbox"name="hours_week" value={'목'}  onChange={handleCheck}/>목
              <input type="checkbox"name="hours_week" value={'금'} onChange={handleCheck}/>금 <input type="checkbox"name="hours_week" value={'토'} onChange={handleCheck}/>토 
              <input type="checkbox"name="hours_week" value={'일'}  onChange={handleCheck}/>일
              
            </label><br/>
             <label>
              농가 규모
              <input type="text" name="farm_size" value={farm_size} onChange={onDebounceChange} />
            </label><br/>
            
            <div>
            <label>
              대표님 성함 (필수)
              <input type="text" name="farm_farmer" value={farm_farmer} onChange={onDebounceChange} />
            </label><br/>
            <label>
              전화번호 (필수)
              <input type="text" name="farm_phone" value={farm_phone} onChange={onDebounceChange} />
            </label><br/>
            <label>
              이메일
              <input type="text" name="farm_email" value={farm_email} onChange={onDebounceChange} />*30자제한
            </label><br/>
            <label>
              사업자 등록번호 
              <input type="text" name="farm_businessNum" value={farm_businessNum} onChange={onDebounceChange} />
            </label><br/>
            </div>
            <label>
              재배품목
              <input type="text" name="farm_mainItem" value={farm_mainItem} onChange={onDebounceChange} />
            </label><br/>
            <label>
              거래품목 (필수)
              <input type="text" name="farm_saleItem" value={farm_saleItem} onChange={onDebounceChange} />
            </label><br/>
            </div>
            <div className="PartnerFormRight">
            <h3>거래정보</h3>
            <label>
              거래기간 (필수)
              <input type="date" name="farm_start" value={farm_start} onChange={onDebounceChange} />~
              <input type="date" name="farm_end" value={farm_end} onChange={onDebounceChange} />
            </label><br/>
            <label>
              계약기간
              <input type="text" name="farm_contractTerm" value={farm_contractTerm} onChange={onDebounceChange} />
            </label><br/>
            <label>
              거래횟수
              <input type="text" name="farm_saleQty" value={farm_saleQty} onChange={onDebounceChange} />
            </label><br/>
            <label>
              거래상태 (필수)
              <select name="farm_isContract" value={farm_isContract}onChange={changeSelectOptionHandler}>
              <option value="선택하기">선택하기</option>
              <option value="협업기획중">협업기획중</option>
			        <option value="공동구매진행">공동구매진행</option>
			        <option value="미활동">미활동</option>
              </select>
            </label>
            
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
              비고
              <textarea name="farm_memo" value={farm_memo} onChange={onDebounceChange} />
            </label><br/>
            </div>
            
            </div>

          <div className="postFooter">
            <button id="backBtn" type="button" onClick={handleClick}>뒤로가기</button>
            <input id="submitBtn"  type="submit" value={ !farm_id ? '등록' : '수정'} />
          </div>

            
          </form>
          
          
        </div>
      </div>
    );
  
}
  export default Farm_post;