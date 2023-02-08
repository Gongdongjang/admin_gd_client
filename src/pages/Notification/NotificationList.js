import {useEffect, useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

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
                <div className={"Notification-detail"}>
                    <NavLink to={'/notification/' + notification.notification_id}>
                        <p>{notification.notification_title}</p>
                        <p>{notification.notification_target}</p>
                        <p>{notification.notification_type}</p>
                        <p>{notification.createdAt}</p>
                        <p>{notification.notification_date}</p>
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
        <div className={"Notification-container"}>
            <p>전체 {count}개</p>
            <select className={"Notification-category"} name={'filter'} onChange={handleChange}>
                <option value={'등록순'}>등록순</option>
                <option value={'소비자'}>소비자 전체</option>
                <option value={'개인'}>소비자 개별</option>
                <option value={'스토어'}>스토어</option>
            </select>
            {renderNotificationList(list)}
        </div>
    )
}

export default NotificationList;