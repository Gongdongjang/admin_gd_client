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

  
  //미완성
  const getName = async (farm_id,store_id) => {
    const res2 = await axios.get(`http://localhost:5000/api/read/name/${farm_id}/${store_id}`)
    .then(({ data }) => {
      //console.log(data);
      this.setState({ 
        //loading: true,
        //ItemList: data
      });
    })
    const data_names= res2.data;
   
    let arr=[data_names.farm_name,data_names.store_name];

    return arr;
    
  }