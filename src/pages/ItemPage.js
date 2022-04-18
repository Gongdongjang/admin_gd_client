import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../CSS/MdRead.css';

class ItemPage extends React.Component{
    state = { id: '', board: [], }; 
    
    loadItem = async () => {
    
        const { id } = this.props.match.params; 
        
        axios
          .get("http://localhost:5000/api/read")
          .then(({ data }) => {
            this.setState({ 
              loading: true,
              board: data
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
        const { loadingData } = this;
        this.loadItem();  // loadItem 호출
      }
    render(){
        const { board } = this.state; 
      return (
        <div className="section">
            <div className='mdPage_container'>
                <h1>상품 상세페이지</h1>
                <div className="pageContent">
                <p>상품이름 </p>
                <p>상품가격</p>
                <p>상품중량</p>
                <p>상품구성</p>
                <p>진행농가</p>
                <p>구매제한</p>
                <p>할인정보</p>
                <p>결제예정일</p>
                <p>진행일</p>
                <p>목표수량</p>
                <p>최대확보수량</p>
                <p>가게이름</p>
                <p>픽업일</p>
                </div>
                
                <div className="pageBtn">
                  <div className='ud_btn'>
                    <button className='btn1'>수정</button>
                    <button className='btn1'>삭제</button>
                  </div>
                  <div className='return_btn'>
                    <Link to="/mdRead"><button>목록으로 돌아가기</button></Link>
                  </div>
                </div>
                
            
            </div>
        </div>
      );
    };
}
export default ItemPage;