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
            <div >
            <div className='farmPage_container'>
                <div className="farmPageContent">
                    <div className='page_title'>
                    <p className="partner_name">알림 상세보기</p>
                    </div>
                    <table className="partnerPage_table">
                    <tbody>
                    <tr><th>알림제목</th><th>{detail.notification_title}</th></tr>
                    <tr><th>알림분류</th><th>{detail.notification_type}</th></tr>
                    <tr><th>대상자</th><th>{detail.notification_target}</th></tr>
                    <tr><th>작성일자</th><th>{detail.createdAt}</th></tr>
                    <tr><th>발송일정</th><th>{detail.notification_date}</th></tr>
                    <tr><th>알림내용</th><th>{detail.notification_content}</th></tr>
                    <tr><th>이미지</th><th>{detail.notification_img}</th></tr>
                    
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
           
        )
    }

    return (
        <div className="partnerSection">
           {renderNotificationDetail(detail)}
        </div>
    )
}

export default NotificationDetail;