import axios from "axios";
//자주쓰는 함수 모음

//상품 삭제 버튼
export const  removeMD = async function(mdId) {

    if(window.confirm('해당 게시물을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.')) {
     
        axios
        .delete(`http://localhost:5000/api/md/delete/${mdId}`,  {params: {md_id: mdId}})
        .then((res) => console.log(res));
  
        alert('게시물이 삭제되었습니다.');
        //새로고침
        return window.location.href = '/mdRead'
      }
}

//기간 나타내기 ex.2022.07.11~2022.08.11
export const duration=(start,end)=>{ 
    return start.substr(0, 10)+'~'+end.substr(0, 10);
  }
export const getWeek = (checkedList)=>{ //selectbox 선택된 요일 추출
  // eslint-disable-next-line
    const reg = '/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi';
    
    
   
    return(checkedList.toString().replace(reg,''));
  }

export const setChecked=(selecteds)=>{ //선택된 사항 체크하기
  // 선택된 목록 가져오기
  const arr3 = selecteds.split(" "); //하나씩 추출
  
 for(var i=0;i<arr3.length;i++)
 {
   let query = 'input[value="'+arr3[i].replace(/\s/gi, "")+'"]';
   document.querySelector(query).checked=true;
 }
}
export const debounce = (callback,delay)=>{ //api 호출 빈도 줄이기
  let timer;
  return (...args)=>{
    clearTimeout(timer); //실행한 함수(setTimeout)를 취소
    timer = setTimeout(()=>callback(...args),delay);//딜레이가 지나면 콜백함수 실행
  };
}


