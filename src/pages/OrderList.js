import React,{useEffect,useState} from "react";
import axios from "axios";
import { Link ,useLocation} from "react-router-dom";
import '../CSS/OrderList.css';
import CsvDownload from 'react-json-to-csv';

function OrderList() {
    
    const md_id = useLocation().state.md_id;
    let[pickupList,setPickupList] = useState();
    useEffect(() => { // 상품 구매자 리스트
    
    axios
      .get(`http://localhost:5000/api/read/pickup/${md_id}`)
      .then(({data }) => {
        console.log(data);
        setPickupList( data);
      })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시
      });
  }, []);
     

    return (
      <div className="orderListContainer">
        <CsvDownload //엑셀파일 아직 완벽 X
          // data : object 또는 object의 배열
          data={pickupList}
          // filename : 파일이름
          filename='픽업리스트'
          />
         <table>
            <thead>
              <tr>
                <th>픽업자ID</th>
                <th>상태</th>
                <th>개수</th>
                <th>날짜</th>
                <th>시간</th>
              </tr>
            </thead>
            <tbody>
              {pickupList && pickupList.map((itemdata) => (
                <tr>
                  <th>{itemdata.user_id}</th>
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