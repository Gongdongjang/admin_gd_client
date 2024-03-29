import React ,{useState,useEffect,useCallback}from "react";
import axios from "axios";
import { Link ,useLocation,useParams, useNavigate} from "react-router-dom";
import '../CSS/MdPost.css';

function MD_post() {
  let navigate = useNavigate();
  const url = useLocation();
  const img_url = 'https://ggdjang.s3.ap-northeast-2.amazonaws.com/';
  const { md_id } = useParams();
  const [input, setInput] = useState({ //상품 정보
    
    md_name : '',
    md_type : '',
    md_start : '',
    md_end : '',
    
    pay_price :'',
    pay_dc : '',
    pay_comp : '',
    md_isFridge :'',
    
    farm_name : '',
    stk_goal : '',
    stk_confirm :'공동구매 진행전',
    store_name : '',
    pu_start : '',
    pu_end : '',
    pu_waybill : '',
})

const [photos,setPhotos] = useState({ //상품별 이미지
  thumbnail : '',
  slide01 : '',
  slide02 : '',
  slide03 : '', 
  slide04 : '', 
  slide05 : '', 
  detail : '',

})

const [thumbImage, setThumbImage] = useState({
  image_file: "",
  preview_URL: "",
});
const [detailImage, setDetailImage] = useState({
  image_file: "",
  preview_URL: "",
});
const [images, setImages] = useState([]);
const [slides,setSlides]=useState([]);
let [search, setSearch] = useState([]); //농가,가게 검색
let [search_farm, setSearch_farm] = useState([]);
let [search_store, setSearch_Store] = useState([]);
  
const {  
  md_name ,md_type ,md_start ,md_end , pay_price , pay_dc ,pay_comp ,md_isFridge,
  farm_name ,stk_goal ,stk_confirm ,store_name ,pu_start ,pu_end , pu_waybill, pu_timeStart,pu_timeEnd} = input; //상품 정보

const{ thumbnail,  detail,} = photos; //이미지 정보

const debounce = (callback,delay)=>{ //api 호출 빈도 줄이기
  let timer;
  return (...args)=>{
    clearTimeout(timer); //실행한 함수(setTimeout)를 취소
    timer = setTimeout(()=>callback(...args),delay);//딜레이가 지나면 콜백함수 실행
  };
}

const load=()=>{ //등록된 농가,상점 load
  
  axios
    .get(`/api/md/all/farm`)
    .then(({ data }) => {
      setSearch_farm(data);
    })

    axios
    .get(`/api/md/all/store`)
    .then(({ data }) => {
      setSearch_Store(data);
    })
}
const getPostContent= async () => { //작성된 내용 가져오기_수정시
  
  const res = await axios.get(`/api/read/${md_id}`);
  const datas= res.data;
  console.log(datas);
  const res2 = await axios.get(`/api/read/name/${md_id}`);
  const data_names= res2.data;
  console.log(data_names);
  axios.get(`/api/md/imgs/${md_id}`)
  .then(({data }) => {
    console.log(data);
   //console.log(data[0].mdimg_thumbnail.toString());
    setThumbImage(data[0].mdimg_thumbnail);
    
    setDetailImage(data[0].mdImg_detail);
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
  const getData = {
    md_name : datas[0].md_name,
    md_type : datas[0].md_type,
    md_start : datas[0].md_start.substr(0, 10),
    md_end : datas[0].md_end.substr(0, 10),
    
    pay_price :datas[0].pay_price,
    pay_dc : datas[0].pay_dc,
    pay_comp : datas[0].pay_comp,
    md_isFridge : datas[0].md_isFridge,
    
    farm_name : data_names.farm_name,
    stk_goal : datas[0].stk_goal,
    stk_confirm : datas[0].stk_confirm,
    store_name : data_names.store_name,
    pu_start : datas[0].pu_start.substr(0, 10),
    pu_end : datas[0].pu_end.substr(0, 10),
    pu_waybill :datas[0].pu_waybill,
    pu_timeStart :datas[0].pu_timeStart,
    pu_timeEnd :datas[0].pu_timeEnd,
  };
  console.log(getData);
 
  setInput(getData);
}
const loadImage=(arr)=>
  {
    
    let imageLists=arr;
    let imageUrlLists = [...images];

    for (let i = 0; i < imageLists.length; i++) {
      imageUrlLists.push(imageLists[i]);
    }
    setImages(imageUrlLists);


  }
useEffect(() => {
  load();

  if (url.pathname.includes('update')) {
    getPostContent();
  }
}, []);

function handleClick() {
  alert("작성중인 내용이 삭제됩니다");
  window.location.href = '/main/mdPost'; 
 // navigate(-1)
}
const handleChange = (e) => { //기존 input 함수_호출빈도 줄이기 전
    const {name, value} = e.target ;// destructuring
    //console.log(value);
    setInput({
        ...input,
        [name]:value
    });
}
const handleRadio = (e)=>{ //냉장보관 필요 유무

    let name="md_isFridge";
    let value = e.target.value;
    console.log("select"+value);
    setInput({
      ...input,
      [name]:value
  });
}

const searchResult = (name,value) => { //농가 상점 선택
  setInput({
      ...input,
      [name]:value
  });
  setSearch([]);
}
const onDebounceChange = e => { //새 input 함수_호출빈도 down
  const {name, value} = e.target ;
    setInput({
        ...input,
        [name]:value
    });
    
    printValue(name,value,search_farm,search_store);
   
};
const printValue = useCallback( //농가 상점 검색
  debounce((name,value,search_farm,search_store)=>{
    if(name=='farm_name'||name=='store_name')
      updateChange(name,value,search_farm,search_store);
  },500),[]
);
const updateChange = (name,value,search_farm,search_store) => {
  let data = value;
  let filterData;
 
  if(name=='farm_name'){
    filterData = search_farm.filter((i) => i.farm_name.includes(data));
  }
  else {
    filterData = search_store.filter((i) => i.store_name.includes(data));
  }

  if (data.length === 0) {
      filterData = [];
    }
 
    setSearch(filterData);
};
const changeSelectOptionHandler = (e) =>{
  let name="stk_confirm";
  let value = e.target.value;
  console.log("select"+value);
  setInput({
    ...input,
    [name]:value
  });
};

const  getDateDiff = (d1, d2) => { //d-day
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    
    const diffDate = date1.getTime() - date2.getTime();
    return Math.abs(diffDate / (1000 * 3600 * 24)+1);
  }

  const handleSubmit=(e)=> { //제출
    let today = new Date();
    
    e.preventDefault();
    if(!md_name || !md_start || !md_end  || !pay_price  || !farm_name 
      || !stk_goal ||  !store_name || !pu_start ||  !pu_end)
    {
      alert("필수입력란을 채워주세요");
    }
    else
    {
      console.log(today);
      let body = {
        mdName : md_name,
        mdDate : today.toLocaleString(),
        type : md_type,
        start : md_start,
        end : md_end,
        dd : getDateDiff(md_end,md_start),
        
        price :pay_price,
        dc : pay_dc,
        comp : pay_comp,
        isFridge :md_isFridge,
        
        farmName : farm_name,
        goal : stk_goal,
        stkConfirm : stk_confirm,
        storeName : store_name,
        puStart : pu_start,
        puEnd : pu_end,
        puWaybill : pu_waybill,
        puTimeStart : pu_timeStart,
        puTimeEnd : pu_timeEnd,
       };
       console.log(body);
       const config = {
        headers : {'content-type': 'multipart/form-data'}
    };
       let formData = new FormData();
       formData.append('thumbnail', thumbnail);
       for(let i=0;i<5;i++)
       {
         formData.append('slides',slides[i]);
          //console.log(slides[i]);
       }
       
       formData.append('detail', detail);

       if(!md_id)
       {
         axios
         .post("/api/md/post", body)
         .then((res) => console.log(res))
         .then(alert("등록이 완료되었습니다"))
         .then(window.location.href = '/main/mdPost');

         axios
         .post(`/api/md/post/imgs`, formData,config) ;
         
       }
       else{
         axios
         .post(`/api/md/update/${md_id}`, body)
         .then((res) => console.log(res))
         .then(alert("수정이 완료되었습니다"))
         .then(window.location.href = '/main/mdPost');
       }
      //
    }
    
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
        setThumbImage(
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
      
  }


  const handleImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...images];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }

    setImages(imageUrlLists);

    setSlides(imageLists);
    //console.log(imageLists);
    
  };
  const handleDeleteImage = () => {
    setImages([]);
    setSlides([]);
  };
  useEffect(() => {
    //console.log(photos);
  },[photos]);
  useEffect(() => {
    //console.log(slides);
  },[slides]);
    return (
      <div className="section">
       
        {/*페이지 내용*/} 
        <div className='post'>  
            <form  className='md_form' onSubmit={handleSubmit}>
            <div className="MDformCase">
              <div className="MDFormLeft">
              <label>
              제품명 (필수)<br/>
              <input type="text"id="longText" name="md_name" value={md_name} onChange={onDebounceChange} />
            </label><br/>
            
            <div className="postLabel"id="dateLabel">
            <label >
              진행시작일 (필수)<br/>
              <input type="date" name="md_start" value={md_start} onChange={onDebounceChange} />
            </label></div>
            <div className="postLabel"id="dateLabel">
            <label>
              진행마감일 (필수)<br/>
              <input type="date" name="md_end" value={md_end} onChange={onDebounceChange} />
            </label></div>
            <div className="postLabel"id="dateLabel">
            <label>
              픽업날짜 (필수)<br/>
              <input type="date" name="pu_start" value={pu_start} onChange={onDebounceChange} /> ~  <input type="date" name="pu_end" value={pu_end} onChange={onDebounceChange} />
            </label>
            
            </div>
            <div className="postLabel"id="dateLabel">
              <label>
              픽업 시간<br/>
              <input type="time" name="pu_timeStart" value={pu_timeStart} onChange={onDebounceChange} /> ~ <input type="time" name="pu_timeEnd" value={pu_timeEnd} onChange={onDebounceChange} />
            </label></div><br/><br/><br/>
            
            <div id="postRadio">
            
            <label>
              냉장고 필요 여부 (필수)
              <label htmlFor="radio01"className="label_radio">
              <input id="radio01"className="inputRadio"type="radio" value="냉장" checked ={md_isFridge=="냉장"} onChange={handleRadio}/>냉장
              </label>
              <label htmlFor="radio02"className="label_radio">
              <input id="radio02"className="inputRadio"type="radio" value="냉동" checked ={md_isFridge=="냉동"} onChange={handleRadio}/>냉동
              </label>
              <label htmlFor="radio03"className="label_radio">
              <input id="radio03"className="inputRadio"type="radio" value="없음" checked ={md_isFridge=="없음"} onChange={handleRadio}/>없음
              </label>
            </label><br/><br/>
            </div>
            <div className="postLabel"id="dateLabel">
            <label>
              진행농가 (필수)
              <span>
              <input type="text"  id="shortText" name="farm_name" value={farm_name}  onChange={(e) => (onDebounceChange(e))}/>
              <div className="search_box">
              {search.map((item) => {
                if(item.farm_name){
                  return (
                  <div className="search_case">
                    <div className="search_result" onClick={(e)=>(searchResult('farm_name',item.farm_name))}>
                      {item.farm_name}
                    </div>
                  </div>
                  );
                }
              })}
              </div>
              </span>
            </label>
            </div>
            <div className="postLabel"id="dateLabel">
            <label>
              가게이름 (필수)
              <input type="text" id="shortText"name="store_name" value={store_name} onChange={onDebounceChange} />
              <div className="search_box">
              {search.map((item) => {
                if(item.store_name){
                  return (
                    <div className="search_case">
                      <div className="search_result" onClick={(e)=>(searchResult('store_name',item.store_name))}>
                        {item.store_name}
                      </div>
                    </div>
                    );
                }
                
              })}
              </div>
            </label>
            </div>
            <div className="postLabel"id="dateLabel">
            <label>
              목표수량 (필수)<br/>
              <input type="text" id="shortText"name="stk_goal" value={stk_goal} onChange={onDebounceChange} />세트
            </label></div>
            <div className="postLabel"id="dateLabel">
            <label>
              상품종류<br/>
              <input type="text" id="shortText"name="md_type" value={md_type} onChange={onDebounceChange} />
            </label></div>

              </div>

              <div className="MDFormRight">
              
              <label>
              상품구성<br/>
              <input type="text"id="longText" name="pay_comp" value={pay_comp} onChange={onDebounceChange} />
            </label><br/>
            


            <label>
              상품가격 (필수)<br/>
              <input type="text"  id="shortText"name="pay_price" value={pay_price} onChange={onDebounceChange} />원
            </label><br/>
            
            <label>
              할인정보<br/>
              <textarea id="longText"name="pay_dc" value={pay_dc} onChange={onDebounceChange} />
            </label><br/>
            
            <label>
              운송장 번호 <br/>
              <input type="text" id="shortText" name="pu_waybill" value={pu_waybill} onChange={onDebounceChange} />
            </label>
            <br/>
            <label>
              진행상태
              <select name="stk_confirm" value={stk_confirm} onChange={changeSelectOptionHandler}>
			          <option value="선택하기">선택하기</option>
			          <option value="공동구매 진행중">공동구매 진행중</option>
                <option value="공동구매 종료">공동구매 종료</option>
			          <option value="상품 준비중">상품 준비중</option>
                <option value="상품 배송중">상품 배송중</option>
			          <option value="스토어 도착">스토어 도착</option>
                <option value="픽업완료">픽업완료</option>
                
		          </select>
            </label>
            <br/><br/>
            <label className="postImgs">
              썸네일 (필수)
              <div>
                <img className={thumbnail ? 'selectedImg' : 'noneImg'} alt="이미지 없음" src={thumbImage.preview_URL || img_url+thumbImage}style={{width:'200px',height:'200px'}}/>
                <input type="file" name="thumbnail"  accept='image/*' onChange={handleFileChange} />
              </div>
            </label><br/>
            <label className="postImgs">
              메인 이미지 (최소 1장,최대5장) <button type="button" className="deleteImg" value ="전체삭제"onClick={handleDeleteImage} >전체삭제</button>
              <div className="multipleImgs">
              <input type="file" name="slide01" multiple accept='image/*' onChange={handleImages} />
              {
                  images.map((image, id) => (
                    <div  className="imgbox" key={id}>
                      
                      <img className="selectedImg" src={url.pathname.includes('update')?img_url+image:image} style={{width:'200px',height:'200px',float:'left'}}/>
                    </div>
                  ))
              }
              </div>
              
            </label><br/>
              <div>
            <label className="postImgs">
              본문이미지 (필수)
              <div>
                <img className={detail ? 'selectedImg' : 'noneImg'}  alt="이미지 없음" src={detailImage.preview_URL|| img_url+detailImage}style={{width:'200px',height:'400px'}}/>
                <input type="file" name="detail"  accept='image/*' onChange={handleFileChange} />
              </div>
            </label></div><br/>
              </div>
            
            </div>
            
            <div className="postFooter">
            <button id="backBtn" type="button" onClick={handleClick}>뒤로가기</button>
            <input id="submitBtn" type="submit" value={ !md_id ? '등록' : '수정'} />
            </div>
            
          </form>
        
        </div>
      </div>
    );
  
}
  export default MD_post;