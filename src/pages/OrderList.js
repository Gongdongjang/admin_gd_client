import React,{useEffect,useState} from "react";
import axios from "axios";
import { Link ,useLocation} from "react-router-dom";
import '../CSS/OrderList.css';
import  CSVDownload from 'react-json-to-csv';

function OrderList() {
    
    const md_id = useLocation().state.md_id;
    const headers = [
      { label: "주문번호", key: "order_id" },
      { label: "유저이름", key: "user_name" },
      { label: "입금자이름", key: "order_name" },
      { label: "주문 수량", key: "order_select_qty" },
      { label: "수령일", key: "order_pu_date" },
      { label: "주문일", key: "order_date" },
      { label: "주문상태", key: "order_md_status" },
      { label: "수령시간", key: "order_pu_time" },
      { label: "유저번호", key: "user_id" },
      { label: "상품번호", key: "md_id" },
      { label: "상점번호", key: "store_id" },
];
    let[pickupList,setPickupList] = useState();
    useEffect(() => { // 상품 구매자 리스트
    
    axios
      .get(`http://localhost:5000/api/md/pickup/${md_id}`)
      .then(({data }) => {
        console.log(data);
        setPickupList( data);
      })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시
      });
  }, []);
     

    return (
      <div className="partnerSection">
        <CSVDownload //엑셀파일 아직 완벽 X
          // data : object 또는 object의 배열
          data={pickupList}
          headers={headers} 
          // filename : 파일이름
          filename={'픽업리스트_'+md_id+'.csv'}
          />
          
         <table className="orderList_table">
            <thead>
              <tr>
                <th>픽업자ID</th>
                <th>닉네임</th>
                <th>입금자이름</th>
                <th>픽업상태</th>
                <th>개수</th>
                <th>날짜</th>
                <th>시간</th>
              </tr>
            </thead>
            <tbody>
              {pickupList && pickupList.map((itemdata) => (
                <tr>
                  <th>{itemdata.user_id}</th>
                  <th>{itemdata.user_name}</th>
                  <th>{itemdata.order_name}</th>
                  <th>{itemdata.order_md_status}</th>
                  <th>{itemdata.order_select_qty}</th>
                  <th>{itemdata.order_pu_date}</th>
                  <th>{itemdata.order_pu_time}</th>
                </tr>
              ))}
            </tbody>
              </table>
              </div>
     
      
    );
  }
  export default OrderList;