import React, { useState } from 'react';
import ReactDom from 'react-dom';
import DaumPostcode from "react-daum-postcode";

const MapTest = (props) => {
	// 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    //const [loc,setLoc]=useState();
    //const [detailLoc,setDetailLoc]=useState();
   //const [zonecode,setZonecode]=useState();
    const getMapData = (loc,zonecode) => {
        props.setLoc(loc);
        props.setZonecode(zonecode);
      }
	// 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
 
	// 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }
    const handleChange = (e) => { //기존 input 함수_호출빈도 줄이기 전
        props.setDetailLoc(e.target.value);
    }
    return(
        <div>
        	<input type='text'id="shortText" name="loc" value={props.loc}/>
            <input type='text'id="shortText" name="detailLoc" value={props.detailLoc} onChange={handleChange} placeholder="상세주소"/>
            <input type='text'id="shortText" name="zonecode" value={props.zonecode}/>
            <button type='button' onClick={openPostCode}>우편번호 검색</button>
            
            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <PopupPostCode onClose={closePostCode} getMapData={getMapData} />
                    </PopupDom>
                )}
            </div>
        </div>
    )

}
const PopupDom = ({ children }) => {
    const el = document.getElementById('popupDom');
    return ReactDom.createPortal(children, el);
};

 
const PopupPostCode = (props) => {
	// 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
       
        props.getMapData(fullAddress,data.zonecode);
        console.log(data)
        console.log(fullAddress)//주소
        console.log(data.zonecode)//우편벙호
        props.onClose()
    }
 
    const postCodeStyle = { //검색창 디자인
        display: "block",
        position: "absolute",
        top: "15%",
        width: "600px",
        height: "600px",
        padding: "7px",
      };
 
    return(
        <div>
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
            <button type='button' onClick={() => {props.onClose()}} className='postCode_btn'>닫기</button>
        </div>
    )
}

export default MapTest;