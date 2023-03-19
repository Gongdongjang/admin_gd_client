import React, { useState ,useEffect} from "react";
import axios from "axios";
import ReviewList from "./ReviewList";
import searchImg from "../imgs/gdg_admin_ic/ic_search.png";
import { Link } from "react-router-dom";
//import '../CSS/MdRead.css';

function Review_read (){
let[loading,setLoding]=useState(false);
let[ItemList,setItemList]=useState([]);
let[selectValue_search,setSelectValue_search]=useState('name');
let[selectValue_sort,setSelectValue_sort]=useState('recent');
let[md_search,setMd_search]=useState();
let[ReviewCount,setReviewCount]=useState(0);
let[deleteClicked,setDeleteClicked] =useState(false);
const [ style, setStyle ] = useState({display: 'none'});
   
const [list, setList] = useState([]);

  const loadItem = async () => { //정렬
    console.log(selectValue_sort);
    //let sort=selectValue_sort;
 
    axios
      .get(`/api/review`)
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
      .get(`/api/md/${search}/${search_value}`)
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

   const [delete_list, setDeleteList] = useState([]);

   const handleClickCheckbox = async (event, delete_list) => {
     const deleteIndex = event.target.value;
 
     if (delete_list.includes(deleteIndex)) {
         setDeleteList(delete_list.filter((index) => deleteIndex !== index));
     } else {
         setDeleteList([...delete_list, deleteIndex]);
     }
 
     console.log(delete_list);
 }
 
 const handleDeleteClick = async (event, list, delete_list) => {
   event.preventDefault();
 
   let body = []
   delete_list.forEach(id => {
       body.push({
           id: id
       })
   })
 
   if (window.confirm('정말 삭제하시겠습니까?')) {
       const res = await axios.post('/api/review/delete', {
           rvw_ids: body
       });
       alert(res.data.rvw_id + '를 삭제했습니다.');
       window.location.reload();
   } else {
       alert('삭제를 취소했습니다.');
   }
 }
      
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
              <button  onClick={(event) => handleDeleteClick(event, list, delete_list)} >편집</button>
            </span>
            </div>
          <div className="itemComponent">
             <ReviewList Itemcard={ItemList} ReviewCount={ReviewCount} style={style} handleClickCheckbox={handleClickCheckbox} delete_list={delete_list} />
          </div>
         </div>
       </div>
    );
  };

  export default Review_read;