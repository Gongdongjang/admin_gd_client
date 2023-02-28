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
            <div >
                <div >
                    <div className="farmPageContent">
                        <div className='page_title'>
                        <p className="partner_name">공지사항 상세보기</p>
                        <p className="updateBtn">수정하기</p>
                        </div>
                        <table className="partnerPage_table">
                        <tbody>
                        <tr><th>공지제목</th><th>{detail.notice_title}</th></tr>
                        <tr><th>작성일자</th><th>{detail.createdAt}</th></tr>
                        <tr><th>공지일정</th><th>{detail.notice_date}</th></tr>
                        <tr><th>이미지</th><th><img src={img_url + detail.notice_photo} alt={"공지사항 이미지"}/></th></tr>
                        
                        </tbody>
                        </table>
                    </div>
                    <div className="noticePageTXT">
                    공지내용
                    <div id="rvw_txt">{detail.notice_context}</div>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        fetchNoticeDetail();
    }, []);

    return (
        <div >
            {renderDetail(detail)}
        </div>
    )
}

export default NoticeDetail;