import {useEffect, useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import '../../CSS/Notification.css';

function NotificationList() {
    const [list, setList] = useState([]);
    const [count, setCount] = useState(0);
    const [filter, setFilter] = useState('등록순');

    useEffect(() => {
        fetchNotificationList(filter);
    }, [filter]);

    const fetchNotificationList = async (filter) => {
        let url = '/api/notification';
        if (filter !== '등록순') url += '?filter=' + filter;

        const res = await axios.get(url);

        if (res.data.msg === 'NOTIFICATION_READ_SUCCESS') {
            setList(res.data.data);
            setCount(res.data.data.length);
        }
        else alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }

    const renderNotificationList = (list) => {
        return list.map((notification) => {
            return [
                <div className="item_card">
                    <NavLink  to={'/main/notification/' + notification.notification_id}>
                    <table>
                        <tbody>
                            <tr>
                            <th style={{width:'300px'}}>{notification.notification_title}</th>
                            <th style={{width:'250px'}}>{notification.notification_target}</th>
                            <th style={{width:'250px'}}>{notification.notification_type}</th>
                            <th style={{width:'300px'}}>{notification.createdAt}</th>
                            <th style={{width:'300px'}}>{notification.notification_date}</th>
                            </tr>
                        </tbody>
                    </table>
                        
                    </NavLink>
                </div>
            ]
        })
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'filter') setFilter(value);
    }

    return (
        <div className="partnerSection">
            <div className={"readTop"}>
            <span className="readLeft">
                <select id="select"name={'filter'} onChange={handleChange}>
                    <option value={'등록순'}>등록순</option>
                    <option value={'소비자'}>소비자 전체</option>
                    <option value={'개인'}>소비자 개별</option>
                    <option value={'스토어'}>스토어</option>
                </select>
            </span>
                
                <span id="readRight">
                <p className={"Notification-count"}>전체 {count}개</p>
                </span>
               
            </div>
            <div className="itemComponent">
            <div className={"itemList"}>
            <table  className="itemListTitle">
                <thead>
                    <tr>
                    <th  style={{width:'250px'}}>알림 제목</th>
                    <th style={{width:'150px'}}>대상자</th>
                    <th style={{width:'150px'}}>분류</th>
                    <th style={{width:'300px'}}>작성 일자</th>
                    <th style={{width:'300px'}}>공지 일정</th>
                    </tr>
                </thead>
            </table>
            <div className="list_itemview">
            {renderNotificationList(list)}
            </div>
            
            </div>
            </div>
            
            
        </div>
    )
}

export default NotificationList;