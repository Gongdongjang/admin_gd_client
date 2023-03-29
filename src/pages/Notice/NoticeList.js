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
        event.stopPropagation();
        const deleteIndex = event.target.value;

        if (delete_list.includes(deleteIndex)) {
            setDeleteList(delete_list.filter((index) => deleteIndex !== index));
        } else {
            setDeleteList([...delete_list, deleteIndex]);
        }
    }

    const fetchNoticeList = async () => {
        const res = await axios.get('/api/notice?aspect=admin');
        setList(res.data);
        setCount(res.data.length)
    }

    const renderNoticeList = (list) => {
        return list.map((notice) => {
            return [
                <div className="item_card" key={notice.notice_id}>
                    
                    <NavLink to={'/main/notice/' + notice.notice_id}>
                    <table>
                        <tbody>
                            <tr>
                                <th><input type={"checkbox"} value={notice.notice_id} onClick={(event) => handleClickCheckbox(event, delete_list)}/></th>
                                <th style={{width:'300px'}}>{notice.notice_title}</th>
                                <th style={{width:'300px'}}>{notice.createdAt}</th>
                                <th style={{width:'300px'}}>{notice.notice_date}</th>
                                <th style={{width:'600px'}}></th>
                            </tr>
                        </tbody>
                    </table>
                    
                    </NavLink>
                </div>
            ]
        });
    }

    useEffect(() => {
        fetchNoticeList();
    }, [])

    return (
        <div >
            <div className="Read_container">
                <div className={"readTop"}>
                <span className="readLeft"/>
                <span id="readRight">
                    <p>전체 {count}개</p>
                    <button onClick={(event) => handleDeleteClick(event, list, delete_list)}>삭제하기</button>
                </span>
                </div>
                <div className="itemComponent">
                <div  className={"itemList"}>
                <table  className="itemListTitle">
                    <thead>
                        <tr>
                        <th style={{width:'10px'}}><input type={"checkbox"}/></th>
                        <th style={{width:'200px'}}>공지 제목</th>
                        <th style={{width:'200px'}}>작성 일자</th>
                        <th style={{width:'200px'}}>공지 일정</th>
                        <th style={{width:'500px'}}></th>
                        </tr>
                    </thead>
                </table>
                <div className="list_itemview">
                {renderNoticeList(list)}
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default NoticeList;