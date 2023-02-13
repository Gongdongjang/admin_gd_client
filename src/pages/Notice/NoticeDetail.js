import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function NoticeDetail() {
    const {noticeId} = useParams();

    const [detail, setDetail] = useState({});
    const img_url = 'https://ggdjang.s3.ap-northeast-2.amazonaws.com/';


    const fetchNoticeDetail = async () => {
        const res = await axios.get(`/api/notice/${noticeId}`);
        console.log(res.data);

        if (res.data.msg === 'NOTICE_READ_SUCCESS') setDetail(res.data.data);
        else alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }

    const renderDetail = (detail) => {
        return (
            <div>
                <div className={"Notice-detailRow"}>
                    <p className={"Notice-inputTitle"}>공지 제목</p>
                    <p>{detail.notice_title}</p>
                </div>
                <div className={"Notice-detailRow"}>
                    <p className={"Notice-inputTitle"}>공지 일정</p>
                    <p>{detail.notice_date}</p>
                </div>
                <div className={"Notice-detailRow"}>
                    <p className={"Notice-inputTitle"}>이미지</p>
                    <img src={img_url + detail.notice_photo} />
                </div>
                <div className={"Notice-detailRow"}>
                    <p className={"Notice-inputTitle"}>공지 내용</p>
                    <p>{detail.notice_context}</p>
                </div>
            </div>
        )
    }

    useEffect(() => {
        fetchNoticeDetail();
    }, []);

    return (
        <div className={"Notice-container"}>
            <h1>공지사항 상세보기</h1>
            {renderDetail(detail)}
        </div>
    )
}

export default NoticeDetail;