import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../CSS/MdPost.css';

class MD_post extends React.Component{


  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

   getDateDiff = (d1, d2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    
    const diffDate = date1.getTime() - date2.getTime();
    return Math.abs(diffDate / (1000 * 3600 * 24)+1);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value =  target.value;
    
    this.setState({
       [name]: value
      });
  }

  handleSubmit(event) {
    
    event.preventDefault();
    
    let body = {
     mdName : this.state.md_name,
     weight : this.state.md_weight,
     start : this.state.md_start,
     end : this.state.md_end,
     dd : this.getDateDiff(this.state.md_end,this.state.md_start),
     maxqty : this.state.md_maxqty,
     price :this.state.pay_price,
     dc : this.state.pay_dc,
     comp : this.state.pay_comp,
     paySchedule : this.state.pay_schedule,
     farmName : this.state.farm_name,
     goal : this.state.stk_goal,
     stkMax : this.state.stk_max,
     storeName : this.state.store_name,
     puStart : this.state.pu_start,
     puEnd : this.state.pu_end,
    };
    alert('작성 완료');
    console.log(body);
    axios
      .post("http://localhost:5000/api/post/md", body)
      .then((res) => console.log(res));
  };
  

 
  render(){
    return (
      <div className="section">
       
        {/*페이지 내용*/} 
        <div className='mdPost_container'>
            <h1>상품 등록/수정하기</h1>
            <form  className='md_form' onSubmit={this.handleSubmit}>
            <div className="formContent">
            <h3>상품 정보</h3>
            <label>
              상품이름
              <input type="text" name="md_name" value={this.state.md_name} onChange={this.handleChange} />
            </label><br/>
            <label>
              상품가격
              <input type="text" name="pay_price" value={this.state.pay_price} onChange={this.handleChange} />
            </label>원<br/>
            <label>
              상품중량 
              <input type="text" name="md_weight" value={this.state.md_weight} onChange={this.handleChange} placeholder="ex.1세트 300g"/>
            </label><br/>
            <label>
              상품구성
              <textarea name="pay_comp" value={this.state.pay_comp} onChange={this.handleChange} placeholder="ex.사과 4~7개"/>
            </label><br/>
            <label>
              진행농가
              <input type="text" name="farm_name" value={this.state.farm_name} onChange={this.handleChange} />
            </label><br/>
            <label>
              구매제한
              <input type="text" name="md_maxqty" value={this.state.md_maxqty} onChange={this.handleChange} />
            </label>세트<br/>
            <label>
              할인정보
              <textarea name="pay_dc" value={this.state.pay_dc} onChange={this.handleChange} />
            </label><br/>
            <label>
              결제예정일
              <input type="date" name="pay_schedule" value={this.state.pay_schedule} onChange={this.handleChange} />
            </label><br/>
            <div>
            <label>
              진행시작일
              <input type="date" name="md_start" value={this.state.md_start} onChange={this.handleChange} />
            </label>
            <label>
              진행마감일
              <input type="date" name="md_end" value={this.state.md_end} onChange={this.handleChange} />
            </label><br/>
            </div>

            <h3>재고 정보</h3>
            <label>
              목표수량
              <input type="text" name="stk_goal" value={this.state.stk_goal} onChange={this.handleChange} placeholder="ex.최소 수량"/>
            </label>세트<br/>
            <label>
            최대확보수량
              <input type="text" name="stk_max" value={this.state.stk_max} onChange={this.handleChange} />
            </label>세트<br/>
            
            <h3>픽업정보</h3>
            <label>
              가게이름
              <input type="text" name="store_name" value={this.state.store_name} onChange={this.handleChange} />
            </label><br/>
            <label>
              픽업시작일
              <input type="date" name="pu_start" value={this.state.pu_start} onChange={this.handleChange} />
            </label>
            <label>
              픽업마감일
              <input type="date" name="pu_end" value={this.state.pu_end} onChange={this.handleChange} />
            </label>
            </div>
            <div className="mdSubmit">
              <Link to={'/mdPost/ok'}><input type="submit" value="등록하기" /></Link>
            </div>
          </form>
        </div>
      </div>
    );
  };
}
  export default MD_post;