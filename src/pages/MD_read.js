import React from "react";
import axios from "axios";
import MDList from "./MDList";
import { Link } from "react-router-dom";
import '../CSS/MdRead.css';

class MD_read extends React.Component{

  state ={
    loading:false,
    ItemList:[],
    selectValue_search:'name',
    selectValue_sort:'recent',
    md_search:'',
    mdCount:0,
  };
  
   
  loadItem = async () => { //정렬
    let sort=this.state.selectValue_sort;
 
    axios
      .get(`http://localhost:5000/api/search/${sort}`)
      .then(({ data }) => {
        console.log(data);
        this.setState({ 
          loading: true,
          ItemList: data,
          mdCount:data.length,
        });
      })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시
        this.setState({  
          loading: false
        });
      });
  };

  searchItem = async () => { //검색
    console.log("search2: "+this.state.selectValue_search+" "+this.state.md_search);
    let search=this.state.selectValue_search;
    let search_value=this.state.md_search;
 
    axios
      .get(`http://localhost:5000/api/search/${search}/${search_value}`)
      .then(( {data }) => {
        console.log(data);
        this.setState({ 
          loading: true,
          ItemList: data
        });
        
      })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시
        this.setState({  
          loading: false
        });
      });
  };

  componentDidMount() {
    this.loadItem();  // loadItem 호출
  }

  handleChangeSelectbox = (event) =>{
    if(event.target.name=="selectValue_search")//검색
    {
      this.setState({selectValue_search:event.target.value});
    }
    else{//정렬
      this.setState({selectValue_sort: event.target.value}, () => this.loadItem()); 
    }
  }
 
  handleChange=(event)=>{
    const search = event.target.name;
    const search_value = event.target.value;
    this.setState({ [search]:search_value});
  }
  searchSubmit =()=>{
    this.searchItem();
  }

  render(){
      const { ItemList } = this.state;
      
    return (
        <div className="section">
         {/*페이지 내용*/} 
         <div className="mdRead_container">
           <div className="mdInsight">
            <div id="mdInsightLeft"><h5>진행중인 공동구매</h5>
            <h4>{this.state.mdCount}개</h4></div>
            <div id="mdInsightRight"><button>데이터 인사이트 바로가기 &gt; </button></div>
           </div>

           <div className="mdReadbar">
            <h5>진행중인 상품 리스트</h5>
            <div id="mdReadbarLeft">
              <button>전체</button>
              <button>농가</button>
              <button>스토어</button>
            </div>
            <div id="mdReadbarRight">
              <label>
              <select name="selectValue_search" value={this.state.selectValue_search} onChange={this.handleChangeSelectbox}>
                <option value="name">상품명</option>
                <option value="farm">농가</option>
                <option value="store">스토어</option>
              </select>
                <input type="text" name="md_search" value={this.state.md_search} onChange={this.handleChange}/>
              </label>
              <input type="submit" value="검색" onClick={this.searchItem}/>
              &nbsp;정렬&nbsp;
              <select name="selectValue_sort" value={this.state.selectValue_sort} onChange={this.handleChangeSelectbox}>
                <option value="recent">최근등록순</option>
                <option value="alphabet">가나다순</option>
                <option value="deadline">마감임박순</option>
                <option value="number">상품번호순</option>
                <option value="counts">조회수순</option>
                <option value="best">인기구매순</option>
              </select>
              <button >편집</button>
              <Link to="/mdPost"> <button className="addMDbtn" >추가</button></Link>
            </div>
           </div>
          <div className="itemComponent">
            <MDList Itemcard={ItemList} mdCount={this.state.mdCount}/>
          </div>
         </div>
       </div>
    );
  };
}
  export default MD_read;