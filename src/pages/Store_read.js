import React, { useState ,useEffect} from "react";
import axios from "axios";
import StoreList from "./StoreList";
import searchImg from "../imgs/gdg_admin_ic/ic_search.png";
import { Link } from "react-router-dom";
import '../CSS/MdRead.css';

function Store_read (){
let[loading,setLoding]=useState(false);
let[ItemList,setItemList]=useState([]);
let[selectValue_search,setSelectValue_search]=useState('name');
let[selectValue_sort,setSelectValue_sort]=useState('recent');
let[store_search,setStore_search]=useState();//
let[storeCount,setStoreCount]=useState(0);//
let[deleteClicked,setDeleteClicked] =useState(false);
const [ style, setStyle ] = useState({display: 'none'});
   
  const loadItem = async () => { //정렬
    //console.log(selectValue_sort);
    //let sort=selectValue_sort;
 
    axios
      .get(`http://localhost:5000/api/partner/${"store"}/${selectValue_sort}`)
      .then(({ data }) => {
        //console.log(data);
        setLoding(true);
        setItemList(data);
        setStoreCount(data.length);
      })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시
        setLoding(false);
      });
  };

  const searchItem = async () => { //검색
    console.log("search2: "+selectValue_search+" "+store_search);
    let search=selectValue_search;
    let search_value=store_search;
 
    axios
      .get(`http://localhost:5000/api/partner/${"store"}/${search}/${search_value}`)
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

  const handleChangeSelectbox = (event) =>{
    if(event.target.name=="selectValue_search")//검색
    {
      setSelectValue_search(event.target.value);
    }
    else{//정렬
      setSelectValue_sort(event.target.value); 
    }
  }

  const handleChange=(event)=>{
    
    setStore_search(event.target.value);
  
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
                <option value="name">스토어명</option>
                <option value="owner">가게주</option>
              </select>
              <div id="search">
                <input id="searchBar"type="text" name="store_search" value={store_search} onChange={handleChange}/>
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
              <p>전체 {storeCount}개</p>
            </span>
            </div>
              

            
           </div>

          <div className="itemComponent">
            <StoreList Itemcard={ItemList} storeCount={storeCount} style={style}/>
          </div>
         </div>
       
    );
  };

  export default Store_read;