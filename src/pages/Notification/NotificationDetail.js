import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

function NotificationDetail() {
    const {notificationId} = useParams();

    const [detail, setDetail] = useState({});

    useEffect(() => {
        fetchNotificationDetail();
    }, [])

    const fetchNotificationDetail = async () => {
        const res = await axios.get(`/api/notification/${notificationId}`);

        if (res.data.msg === 'NOTIFICATION_READ_SUCCESS') setDetail(res.data.data);
        else alert('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }

    const renderNotificationDetail = (detail) => {
        return (
            <div className={'Notification-container'}>
                <div>
                    <p>알림 제목</p>
                    <p>{detail.notification_title}</p>
                </div>
                <div>
                    <p>알림 분류</p>
                    <p>{detail.notification_type}</p>
                </div>
                <div>
                    <p>대상자</p>
                    <p>{detail.notification_target}</p>
                </div>
                <div>
                    <p>작성 일자</p>
                    <p>{detail.createdAt}</p>
                </div>
                <div>
                    <p>발송 일자</p>
                    <p>{detail.notification_date}</p>
                </div>
                <div>
                    <p>알림 내용</p>
                    <p>{detail.notification_content}</p>
                </div>
                <div>
                    <p>이미지</p>
                    <p>{detail.notification_img}</p>
                </div>
            </div>
        )
    }

    return (
        <div className={"Notification-container"}>
            <h3>알림 상세보기</h3>
            <p>{renderNotificationDetail(detail)}</p>
        </div>
    )
}

export default NotificationDetail;