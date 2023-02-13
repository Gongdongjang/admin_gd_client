import {useState} from "react";
import axios from "axios";

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
            </form>
            <div className={"Notice-btnPlace"}>
                <input className={"Notice-writeBtn"} type={'submit'} value={'발송 하기'} />
            </div>
        </div>
    )
}

export default NoticeWrite;