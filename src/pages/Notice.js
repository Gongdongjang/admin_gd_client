import {Link, Route, Routes} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";

function NoticeList() {
  const img_url = 'https://gdjang.s3.ap-northeast-2.amazonaws.com/';

  const [list, setList] = useState('');
  const [is_detail, setIsDetail] = useState([]);
  const [is_delete, setIsDelete] = useState(false);

  const handleClickDetail = (index) => {
    is_detail[index] = !is_detail[index];
    setIsDetail(is_detail);
  }

  const handleDelete = async (event, notice_id) => {
    event.preventDefault();

    if (window.confirm('정말 삭제하시겠습니까?')) {
      const res = await axios.delete('/api/notice/delete/' + notice_id);
      alert(res.data.notice_id + '를 삭제했습니다.');
    } else {
      alert('삭제를 취소했습니다.');
    }
  }

  const getNoticeList = useCallback(async () => {
    const res = await axios.get('/api/notice');
    setList(res.data.map((notice) => {
        return[
          <div key={notice.notice_id} onClick={() => handleClickDetail(notice.notice_id)}>
              <p>{notice.notice_target}</p>
              <h2>{notice.notice_title}</h2>
              <p>{notice.notice_date.split('T')[0]}</p>
              {is_detail[notice.notice_id] && notice.notice_photo && <img src={img_url + notice.notice_photo} alt={'notice photo'} />}<br />
              {is_detail[notice.notice_id] && notice.notice_context}
              {is_delete && <button onClick={(event) => handleDelete(event, notice.notice_id)}>x</button>}
              <hr />
          </div>
        ]
      })
    );
  }, [is_delete, is_detail, handleDelete, handleClickDetail])

  useEffect(() => {
    getNoticeList();
  }, [getNoticeList])

  return (
    <div>
      <Link to={'/notice/write'}>
        <button>+ 새로운 공지 등록하기</button>
      </Link>
      <button onClick={() => setIsDelete(!is_delete)}>편집</button>
      <div>
        <h1>반환 및 정책 ></h1>
        {list}
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

    if (title !== '' && context !== '' && target !== '' && type !== '') {
      let data = new FormData();
      data.append('title', title);
      data.append('context', context);
      data.append('date', date);
      data.append('target', target);
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
    <form onSubmit={handleSubmit}>
      <div onChange={handleChange}>
        <label>
          대상
          <label>
            <input type={'radio'} value={'소비자'} name={'target'}/>
            소비자
          </label>
          <label>
            <input type={'radio'} value={'스토어'} name={'target'}/>
            스토어
          </label>
          <label>
            <input type={'radio'} value={'농가'} name={'target'}/>
            농가
          </label>
        </label>
      </div>
      <div>
        <label>
          제목
          <input maxLength={20} type={'text'} placeholder={'제목을 입력하세요'} name={'title'} onChange={handleChange} value={title}/>
        </label>
      </div>
      <div>
        <label>
          업로드 날짜
          <input type={'datetime-local'} name={'date'} onChange={handleChange} value={date}/>
        </label>
      </div>
      <div onChange={handleChange}>
        <label>
          발송 유형
          <label>
            <input type={'radio'} value={'실시간'} name={'type'}/>
            실시간
          </label>
          <label>
            <input type={'radio'} value={'예약'} name={'type'}/>
            예약
          </label>
        </label>
      </div>
      <div>
        <label>
          이미지
          <input type={'file'} name={'photo'} onChange={handleFileChange}/>
        </label>
      </div>
      <div>
        <label>
          공지 텍스트
          <textarea maxLength={1000} placeholder={'추가 텍스트를 입력하세요.'} onChange={handleChange} name={'context'} value={context}/>
        </label>
      </div>
      <input type={'submit'} value={'발송 하기'} />
    </form>
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
