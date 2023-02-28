import {NavLink, Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import NotificationList from "./NotificationList";
import NotificationDetail from "./NotificationDetail";
import NotificationWrite from "./NotificationWrite";
import '../../CSS/Notification.css';

function Notification() {
    let[menu,setMenu] = useState(0);
    return (
        <div>
            <ul className="tab">
                <li className={`${menu === 0? 'tabBtnActive': 'tabBtn'}`} onClick={() => setMenu(0)}><NavLink to={'/main/notification'} end>알림 내역</NavLink></li>
                <li className={`${menu === 1? 'tabBtnActive': 'tabBtn'}`} onClick={() => setMenu(1)}><NavLink  to={'/main/notification/write'}>알림 작성하기</NavLink></li>
            </ul>
            
            <Routes>
                <Route path={"/"} element={<NotificationList />}/>
                <Route path={'/:notificationId'} element={<NotificationDetail />} />
                <Route path={'/write'} element={<NotificationWrite />} />
            </Routes>
        </div>
    )
}

export default Notification;