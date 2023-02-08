import {Route, Routes} from "react-router-dom";
import NotificationList from "./NotificationList";
import NotificationDetail from "./NotificationDetail";
import NotificationWrite from "./NotificationWrite";

function Notification() {
    return (
        <Routes>
            <Route path={"/"} element={<NotificationList />}/>
            <Route path={'/:notificationId'} element={<NotificationDetail />} />
            <Route path={'/write'} element={<NotificationWrite />} />
        </Routes>
    )
}

export default Notification;