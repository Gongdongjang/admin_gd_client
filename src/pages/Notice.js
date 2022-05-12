import {Link, Route, Routes} from "react-router-dom";

function NoticeList() {
  return (
    <Link to={'/notice/write'}>
      <button>+ 새로운 공지 등록하기</button>
    </Link>
  )
}

function NoticeWrite() {
  return (
    <form>
      <div>
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
          <input maxLength={20} type={'text'} placeholder={'제목을 입력하세요'}/>
        </label>
      </div>
      <div>
        <label>
          업로드 날짜
          <input type={'date'} />
        </label>
      </div>
      <div>
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
          <input type={'file'} />
        </label>
      </div>
      <div>
        <label>
          공지 텍스트
          <textarea maxLength={1000} placeholder={'추가 텍스트를 입력하세요.'} />
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
