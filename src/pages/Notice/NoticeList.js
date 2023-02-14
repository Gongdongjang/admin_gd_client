import {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import axios from "axios";

function NoticeList() {
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
                <div className={"Notice-detail"} key={notice.notice_id}>
                    <NavLink className={"Notice-detailRow"} to={'/notice/' + notice.notice_id}>
                        <input type={"checkbox"} value={notice.notice_id} onClick={(event) => handleClickCheckbox(event, delete_list)}/>
                        <p>{notice.notice_title}</p>
                        <p>{notice.createdAt}</p>
                        <p>{notice.notice_date}</p>
                    </NavLink>
                </div>
            ]
        });
    }

    useEffect(() => {
        fetchNoticeList();
    }, [])

    return (
        <div className={"Notice-container"}>
            <div className={"Notice-content"}>
                <div className={"Notice-row"}>
                    <p>전체 {count}개</p>
                    <button onClick={(event) => handleDeleteClick(event, list, delete_list)}>삭제하기</button>
                </div>
                <div className={"Notice-detailRow"}>
                    <input type={"checkbox"}/>
                    <p>공지 제목</p>
                    <p>작성 일자</p>
                    <p>공지 일정</p>
                </div>
                {renderNoticeList(list)}
            </div>
        </div>
    )
}

export default NoticeList;