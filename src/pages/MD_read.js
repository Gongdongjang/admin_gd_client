import React from "react";
import axios from "axios";
import MDList from "./MDList";
import { Link } from "react-router-dom";
import '../CSS/MdRead.css';

class MD_read extends React.Component{

  state ={
    loading:false,
    ItemList:[],
  };
  loadItem = async () => {
    
    axios
      .get("http://localhost:5000/api/read")
      .then(({ data }) => {
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

  handleChangeSelectbox = (event) =>
  this.setState({selectValue: event.target.value});

    render(){
      const { ItemList } = this.state;
      
      //console.log(ItemList);
    return (
        <div className="section">
         {/*페이지 내용*/} 
         <div className="mdRead_container">
           <div className="mdInsight">
            <div id="mdInsightLeft"><h5>진행중인 공동구매</h5>
            <h4>455개</h4></div>
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
              <select value={this.state.selectValue} onChange={this.handleChangeSelectbox}>
                <option value="전체">전체</option>
                <option value="상품명">상품명</option>
                <option value="농가">농가</option>
                <option value="스토어">스토어</option>
              </select>
                <input type="text" name="md_search"  />
              </label>
              <input type="submit" value="검색" />
              <button >편집</button>
              <Link to="/mdPost"> <button className="addMDbtn" >추가</button></Link>
            </div>
           </div>
          <div className="itemComponent">
            <MDList Itemcard={ItemList}/>
          </div>
         </div>
       </div>
    );
  };
}
  export default MD_read;