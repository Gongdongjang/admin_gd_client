import {useEffect, useState} from "react";
import axios from "axios";
import '../../CSS/Notification.css';
import * as Loader from "react-loader-spinner";

function Loading() {
    return (
        <Loader.TailSpin color={"#05D287"} />
    )
}

function NotificationWrite() {
    const [users, setUsers] = useState([]);
    const [type, setType] = useState('이벤트');
    const [target, setTarget] = useState('소비자');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [pushType, setPushType] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState(null);
    const [userIds, setUserIds] = useState([]);

    const [loading, setLoading] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await axios.get('/api/notification/user');

        if (res.data.msg === 'USER_READ_SUCCESS') setUsers(res.data.data);
        else alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }

    const renderUsers = (users) => {
        const userList = users.map((user) => {
            return (
                <div className={"Notification-leftRow"}>
                    <input type={"checkbox"} value={user.user_no} onChange={(event) => handleCheckUser(event, userIds)}/>
                    <p>{user.user_id}({user.user_name})</p>
                </div>
            )
        })

        return (
            <div id={"Notification-userList"}>
                {userList}
            </div>
        )
    }

    const handleCheckUser = (event, userIds) => {
        const userId = event.target.value;

        if (userIds.includes(userId)) setUserIds(userIds.filter((id) => userId !== id));
        else setUserIds([...userIds, userId]);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        switch (name) {
            case 'type': setType(value); break;
            case 'target': setTarget(value); break;
            case 'title': setTitle(value); break;
            case 'content': setContent(value); break;
            case 'pushType': setPushType(value); break;
            case 'date': setDate(value); break;
            default: setImage(event.target.files[0]); break;
        }
    }

    const handleSubmit = async (event, userIds) => {
        event.preventDefault();
        setLoading(true);

        const submitter = event.nativeEvent.submitter.name;
        if (submitter === 'cancel') {
            if (window.confirm('작성을 취소하시겠습니까? 작성된 내용은 저장되지 않습니다.')) document.location.replace('/notification');
        }

        const body = new FormData();
        body.append('title', title);
        body.append('content', content);
        body.append('target', target);
        body.append('type', type);
        body.append('pushType', pushType);
        body.append('date', date);
        body.append('image', image);

        let msg;
        if (target === '소비자') {
            body.append('topic', 'userTopic');

            const res = await axios.post('/api/notification/topic', body);
            msg = res.data.msg;
        } else if (target === '개인') {
            if (userIds.length === 0) {
                alert('알림을 보낼 사용자를 한 명 이상 선택해주세요.');
            } else {
                body.append('userIds', userIds);

                const res = await axios.post('/api/notification/token', body);
                msg = res.data.msg;
            }
        }

        setLoading(false);
        if (msg === 'NOTIFICATION_SEND_SUCCESS') {
            alert('알림이 성공적으로 전송됐습니다.');
            document.location.replace('/notification');
        } else if (msg === 'NOTIFICATION_RESERVE_SUCCESS') {
            alert('알림이 성공적으로 예약됐습니다.');
            document.location.replace('/notification');
        }
    }

    return (
        <form className={"Notification-container Notification-content"} onSubmit={(event) => handleSubmit(event, userIds)}>
            {loading ? <Loading /> : ""}
            <div className={"Notification-content"}>
                <div className={"Notification-inputPlace"}>
                    <div>
                        <p className={"Notification-inputTitle"}>알림 분류</p>
                        <select className={"Notification-category"} name={'type'} onChange={handleChange}>
                            <option value={'이벤트'}>이벤트</option>
                            <option value={'기타'}>기타</option>
                        </select>
                    </div>
                    <div>
                        <p className={"Notification-inputTitle"}>대상자</p>
                        <select className={"Notification-category"} name={'target'} onChange={handleChange}>
                            <option value={'소비자'}>소비자 전체</option>
                            <option value={'개인'}>소비자 개별</option>
                            <option value={'스토어'}>스토어</option>
                        </select>
                        { target === '개인' && renderUsers(users) }
                    </div>
                    <div>
                        <p className={"Notification-inputTitle"}>알림 제목</p>
                        <input className={"Notification-input"} type={"text"} name={"title"} value={title} onChange={handleChange} placeholder={"제목을 입력하세요."} />
                    </div>
                    <div>
                        <p className={"Notification-inputTitle"}>알림 제목</p>
                        <textarea className={"Notification-input"} name={"content"} value={content} onChange={handleChange} placeholder={"내용을 입력하세요."} />
                    </div>
                    <div>
                        <p className={"Notification-inputTitle"}>발행 유형</p>
                        <div className={"Notification-leftRow"}>
                            <p>실시간</p>
                            <input type={"radio"} name={'pushType'} value={'실시간'} onChange={handleChange}/>
                            <p>예약</p>
                            <input type={"radio"} name={'pushType'} value={'예약'} onChange={handleChange}/>
                        </div>
                    </div>
                    <div>
                        <p className={"Notification-inputTitle"}>발송 일자</p>
                        <input type={"datetime-local"} name={"date"} value={date} onChange={handleChange} />
                    </div>
                    <div>
                        <p className={"Notification-inputTitle"}>참고 이미지</p>
                        <input type={"file"} name={"image"} onChange={handleChange}/>
                    </div>
                </div>
                <div className={"Notification-btnPlace"}>
                    <input className={"Notification-writeBtn"} type={"submit"} name={"submit"} value={"보내기"}/>
                    <input className={"Notification-btn"} type={"submit"} name={"cancel"} value={"취소"}/>
                </div>
            </div>
        </form>
    )
}

export default NotificationWrite;