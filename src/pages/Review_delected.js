import React, { useState ,useEffect} from "react";
import axios from "axios";
import ReviewList from "./ReviewList";
import searchImg from "../imgs/gdg_admin_ic/ic_search.png";
import { Link } from "react-router-dom";
//import '../CSS/MdRead.css';

function Review_delete (){
let[loading,setLoding]=useState(false);
let[ItemList,setItemList]=useState([]);
let[selectValue_search,setSelectValue_search]=useState('name');
let[selectValue_sort,setSelectValue_sort]=useState('recent');
let[md_search,setMd_search]=useState();
let[ReviewCount,setReviewCount]=useState(0);
let[deleteClicked,setDeleteClicked] =useState(false);
const [ style, setStyle ] = useState({display: 'none'});
   
  const loadItem = async () => { //정렬
    console.log(selectValue_sort);
    //let sort=selectValue_sort;
 
    axios
      .get(`http://localhost:5000/api/review/reviewDelete`)
      .then(({ data }) => {
        console.log(data);
        setLoding(true);
        setItemList(data);
        setReviewCount(data.length);
      })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시
        setLoding(false);
      });
  };

  const searchItem = async () => { //검색
    console.log("search2: "+selectValue_search+" "+md_search);
    let search=selectValue_search;
    let search_value=md_search;
 
    axios
      .get(`http://localhost:5000/api/md/${search}/${search_value}`)
      .then(( {data }) => {
        console.log(data);
        setLoding(true);
        setItemList(data); 
      })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시
        this.setState({  
          loading: false
        });
      });
  };
  useEffect(() => {
    loadItem();
  }, []);
  useEffect(()=>{
    loadItem();
   },[selectValue_sort]);


  const handleChange=(event)=>{
    
    //setMd_search(event.target.value);
    ;
  
  }
  const deleteBtn =()=>{
    console.log(deleteClicked);
    if(deleteClicked)
    {
      setDeleteClicked(!deleteClicked);
      setStyle({display: 'none'});
    }
    else
    {
      setDeleteClicked(!deleteClicked);
      setStyle({display: 'block'});
    }
   }

     // const { ItemList } = this.state;
      
    return (
        <div >
         {/*페이지 내용*/} 
         <div className="Read_container">
         <div className="readTop">
            <span className="readLeft">
              <label>
              
              <div id="search">
              <input id="searchBar" type="text" name="md_search" value={md_search} onChange={handleChange}/>
                <button id="searchBtn"onClick={searchItem}><img src={searchImg}></img></button>
              </div>
                
              </label>

 
           </span>
           <span id="readRight">
              <p>전체 {ReviewCount}개</p>
              <button  onClick={()=>deleteBtn()} >편집</button>
            </span>
            </div>
          <div className="itemComponent">
             <ReviewList Itemcard={ItemList} ReviewCount={ReviewCount} style={style}/>
          </div>
         </div>
       </div>
    );
  };

  export default Review_delete;