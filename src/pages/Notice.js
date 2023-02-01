import {Link, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import "../CSS/Notice.css";

function NoticeList() {
  const img_url = 'https://gdjang.s3.ap-northeast-2.amazonaws.com/';

  const [list, setList] = useState([]);
  const [delete_list, setDeleteList] = useState([]);
  const [is_detail, setIsDetail] = useState([]);
  const [count, setCount] = useState(0);

  const handleClickDetail = (index) => {
    is_detail[index] = !is_detail[index];
    setIsDetail(is_detail);
  }

  const handleDeleteClick = async (event, list, delete_list) => {
    event.preventDefault();

    let body = []
    delete_list.forEach(id => {
      body.push({
        id: id
      })
    })

    if (window.confirm('정말 삭제하시겠습니까?')) {
      const res = await axios.post('/api/notice/delete/', {
        notice_ids: body
      });
      alert(res.data.notice_id + '를 삭제했습니다.');
      window.location.reload();
    } else {
      alert('삭제를 취소했습니다.');
    }
  }

  const handleClickCheckbox = async (event, delete_list) => {
    const deleteIndex = event.target.value;

    if (delete_list.includes(deleteIndex)) {
      setDeleteList(delete_list.filter((index) => deleteIndex !== index));
    } else {
      setDeleteList([...delete_list, deleteIndex]);
    }

    console.log(delete_list);
  }

  const fetchNoticeList = async () => {
    const res = await axios.get('/api/notice');
    setList(res.data);
    setCount(res.data.length)
  }

  const renderNoticeList = (list) => {
    return list.map((notice) => {
      return [
        <div className={"Notice-detail"} key={notice.notice_id} onClick={() => handleClickDetail(notice.notice_id)}>
          <input type={"checkbox"} value={notice.notice_id} onClick={(event) => handleClickCheckbox(event, delete_list)}/>
          <p>{notice.notice_title}</p>
          <p>{notice.notice_target}</p>
          <p>{notice.notice_date.split('T')[0]}</p>
        </div>
      ]
    });
  }

  useEffect(() => {
    fetchNoticeList();
  }, [])

  return (
    <div className={"Notice-container"}>
      <Link to={'/notice/write'}>
        <button className={"Notice-menuBtn"}>공지 작성하기</button>
      </Link>
      <p>{count} 개</p>
      <button onClick={(event) => handleDeleteClick(event, list, delete_list)}>편집</button>
      <div className={"Notice-content"}>
        {renderNoticeList(list)}
      </div>
    </div>
  )
}

function NoticeWrite() {
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [date, setDate] = useState(new Date(Date.now()).toISOString().split('.')[0]);
  const [target, setTarget] = useState('');
  const [type, setType] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'title') setTitle(value);
    else if (name === 'context') setContext(value);
    else if (name === 'target') setTarget(value);
    else if (name === 'type') setType(value);
    else setDate(value);
  }

  const handleFileChange = (event) => {
    setPhoto(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title !== '' && context !== '' && type !== '') {
      let data = new FormData();
      data.append('title', title);
      data.append('context', context);
      data.append('date', date);
      data.append('type', type);
      data.append('photo', photo);

      const res = await axios.post('/api/notice', data);
      document.location.replace('/notice/' + res.data.id);
      for (let value of data.values()) {
        console.log(value);
      }
    } else {
      alert('모든 정보를 입력하세요.');
    }
  }

  return (
      <div className={"Notice-content"}>
        <form className={"Notice-inputPlace"} onSubmit={handleSubmit}>
          <div>
            <p className={"Notice-inputTitle"}>제목</p>
            <input className={"Notice-input"} maxLength={20} type={'text'} placeholder={'제목을 입력하세요'} name={'title'} onChange={handleChange} value={title}/>
          </div>
          <div onChange={handleChange}>
            <p className={"Notice-inputTitle"}>발송 유형</p>
            <label className={"Notice-inputTitle"}>
              <input type={'radio'} value={'실시간'} name={'type'}/>
              실시간
            </label>
            <label className={"Notice-inputTitle"}>
              <input type={'radio'} value={'예약'} name={'type'}/>
              예약
            </label>
          </div>
          <div>
            <p className={"Notice-inputTitle"}>업로드 날짜</p>
            <input className={"Notice-input"} type={'datetime-local'} name={'date'} onChange={handleChange} value={date}/>
          </div>
          <div>
            <p className={"Notice-inputTitle"}>이미지</p>
            <input type={'file'} name={'photo'} onChange={handleFileChange}/>
          </div>
          <div>
            <p className={"Notice-inputTitle"}>공지 텍스트</p>
            <textarea className={"Notice-input"} maxLength={1000} placeholder={'추가 텍스트를 입력하세요.'} onChange={handleChange} name={'context'} value={context}/>
          </div>
          <div className={"Notice-btnPlace"}>
            <input className={"Notice-writeBtn"} type={'submit'} value={'발송 하기'} />
          </div>
        </form>
      </div>
  )
}

function Notice() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<NoticeList />}/>
        <Route path='/write' element={<NoticeWrite />}/>
      </Routes>
    </div>
  )
}

export default Notice;
