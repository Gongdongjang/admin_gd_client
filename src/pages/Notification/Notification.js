import {NavLink, Route, Routes} from "react-router-dom";
import NotificationList from "./NotificationList";
import NotificationDetail from "./NotificationDetail";
import NotificationWrite from "./NotificationWrite";
import '../../CSS/Notification.css';

function Notification() {
    return (
        <div>
            <NavLink className={"Notification-menuBtn"} to={'/notification'} end>알림 내역</NavLink>
            <NavLink className={"Notification-menuBtn"} to={'/notification/write'}>알림 작성하기</NavLink>
            <Routes>
                <Route path={"/"} element={<NotificationList />}/>
                <Route path={'/:notificationId'} element={<NotificationDetail />} />
                <Route path={'/write'} element={<NotificationWrite />} />
            </Routes>
        </div>
    )
}

export default Notification;