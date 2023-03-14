import {useState} from "react";
import axios from "axios";

function NoticeWrite() {
    const [title, setTitle] = useState('');
    const [context, setContext] = useState('');
    const [date, setDate] = useState(new Date(Date.now()).toISOString().split('.')[0]);
    const [target, setTarget] = useState('');
    const [type, setType] = useState('실시간');
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
    function handleClick() {
        alert("작성중인 내용이 삭제됩니다");
      window.location.href = '/main/notice'; 
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
            document.location.replace('/main/notice/' + res.data.id);
            for (let value of data.values()) {
                console.log(value);
            }
        } else {
            alert('모든 정보를 입력하세요.');
        }
    }

    return (
        <div >
            
            <form  onSubmit={handleSubmit}>
            <div className={"MDformCase"}>
                <div className={"Notice-inputPlace"} >
                <div onChange={handleChange}>
                    <p className={"Notice-inputTitle"}>업로드 유형</p>
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
                    <p className={"Notice-inputTitle"}>공지 일정</p>
                    <input className={"Notice-input"} type={'datetime-local'} name={'date'} onChange={handleChange} value={date}/>
                </div>
                <div>
                    <p className={"Notice-inputTitle"}>공지 제목</p>
                    <input className={"Notice-input"} maxLength={20} type={'text'} placeholder={'제목을 입력하세요'} name={'title'} onChange={handleChange} value={title}/>
                </div>
                <div>
                    <p className={"Notice-inputTitle"}>공지 내용</p>
                    <textarea className={"Notice-input"} maxLength={1000} placeholder={'내용을 입력하세요.'} onChange={handleChange} name={'context'} value={context}/>
                </div>
                <div>
                    <p className={"Notice-inputTitle"}>이미지</p>
                    <input type={'file'} name={'photo'} onChange={handleFileChange}/>
                </div>
                </div>
                </div>
                <div className="postFooter">
                <button id="backBtn" type="button" onClick={handleClick}>뒤로가기</button>
                <input  id="submitBtn" type={'submit'} value={'게시'} />
            </div>
            </form>
            
        </div>
    )
}

export default NoticeWrite;