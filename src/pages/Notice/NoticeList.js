import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
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
                <div className={"Notice-detail"} key={notice.notice_id} onClick={() => handleClickDetail(notice.notice_id)}>
                    <input type={"checkbox"} value={notice.notice_id} onClick={(event) => handleClickCheckbox(event, delete_list)}/>
                    <p>{notice.notice_title}</p>
                    <p>{notice.notice_target}</p>
                    <p>{notice.notice_date.split('T')[0]}</p>
                </div>
            ]
        });
    }

    useEffect(() => {
        fetchNoticeList();
    }, [])

    return (
        <div className={"Notice-container"}>
            <Link to={'/notice/write'}>
                <button className={"Notice-menuBtn"}>공지 작성하기</button>
            </Link>
            <p>{count} 개</p>
            <button onClick={(event) => handleDeleteClick(event, list, delete_list)}>편집</button>
            <div className={"Notice-content"}>
                {renderNoticeList(list)}
            </div>
        </div>
    )
}

export default NoticeList;