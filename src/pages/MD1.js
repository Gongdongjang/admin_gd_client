import React from "react";
import axios from "axios";
import MD2 from "./MD2";
import { Link } from "react-router-dom";
import '../CSS/MdRead.css';

class MD1 extends React.Component{

  state ={
    loading:false,
    ItemList:[]
  };
  loadItem = async () => {
    console.log("함수 입성");
    axios
      .get("http://localhost:5000/api/read")
      .then(({ data }) => {
        this.setState({ 
          loading: true,
          ItemList: data
        });
        console.log(data);
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

  

    render(){
      const { ItemList } = this.state;
      console.log(ItemList);
    return (
        <div className="section">
        {/*카테고리 별 nav*/} 
         <div className='side'>
           <nav>
             <ul>
              <li><Link to="/MD">상품 등록 / 수정</Link></li>
              <li><Link to="/MD1">진행중인 상품리스트</Link></li>
             </ul>
           </nav>
         </div>
         {/*페이지 내용*/} 
         <div className="md_container">
          <h1>진행중인 상품 리스트</h1>
          <div>
            <label>검색<input type="text" name="md_search"  /></label>
            <input type="submit" value="검색" />
            <Link to="/md"> <button className="addMDbtn" type="button">추가하기</button></Link>
          </div>
          <div>
            <MD2 Itemcard={ItemList}/>
          </div>
         </div>
       </div>
    );
  };
}
  export default MD1;