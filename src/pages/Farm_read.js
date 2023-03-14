import React, { useState ,useEffect} from "react";
import axios from "axios";
import FarmList from "./FarmList";
import { Link } from "react-router-dom";
import searchImg from "../imgs/gdg_admin_ic/ic_search.png";
import '../CSS/MdRead.css';

function Farm_read (){
let[loading,setLoding]=useState(false);
let[ItemList,setItemList]=useState([]);
let[selectValue_search,setSelectValue_search]=useState('name');
let[selectValue_sort,setSelectValue_sort]=useState('recent');
let[farm_search,setFarm_search]=useState();//
let[farmCount,setFarmCount]=useState(0);//
let[deleteClicked,setDeleteClicked] =useState(false);
const [ style, setStyle ] = useState({display: 'none'});
   
  const loadItem = async () => { //정렬
    //console.log(selectValue_sort);
    //let sort=selectValue_sort;
 
    axios
      .get(`http://localhost:5000/api/partner/${"farm"}/${selectValue_sort}`)
      .then(({ data }) => {
        console.log(data);
        setLoding(true);
        setItemList(data);
        setFarmCount(data.length);
      })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시
        setLoding(false);
      });
  };

  const searchItem = async () => { //검색
   console.log("search2: "+selectValue_search+" "+farm_search);
    let search=selectValue_search;
    let search_value=farm_search;
 
    axios
      .get(`http://localhost:5000/api/partner/${"farm"}/${search}/${search_value}`)
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
  //useEffect(() => {
  //  loadItem();
 // }, []); //디폴트
  useEffect(()=>{
    loadItem();
   },[selectValue_sort]);

  const handleChangeSelectbox = (event) =>{
    if(event.target.name=="selectValue_search")//검색
    {
      setSelectValue_search(event.target.value);
    }
    else{//정렬
      console.log(event.target.value);
      setSelectValue_sort(event.target.value); 
    }
  }

  const handleChange=(event)=>{
    
    setFarm_search(event.target.value);
  
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
        <div>
         {/*페이지 내용*/} 
         <div className="Read_container">
           <div className="readTop">
            <span className="readLeft">
            <select id="select" name="selectValue_search" value={selectValue_search} onChange={handleChangeSelectbox}>
                <option value="name">농가명</option>
                <option value="owner">농장주</option>
                <option value="item">주거래품목</option>
              </select>
              <div id="search">
                <input id="searchBar"type="text" name="farm_search" value={farm_search} onChange={handleChange}/>
                <button id="searchBtn"onClick={searchItem}><img src={searchImg}></img></button>
              </div>
              <select id="select" name="selectValue_sort"  value={selectValue_sort} onChange={handleChangeSelectbox}>
                <option value="recent">등록순</option>
                <option value="building">협업기획중</option>
                <option value="proceeding">공동구매진행중</option>
                <option value="keep">미활동</option>
              </select>
           </span>
           <span id="readRight">
              <p>전체 {farmCount}개</p>
             
            </span>
            </div>
              

            
           </div>

          <div className="itemComponent">
            <FarmList Itemcard={ItemList} farmCount={farmCount} style={style}/>
          </div>
         </div>
       
    );
  };

  export default Farm_read;