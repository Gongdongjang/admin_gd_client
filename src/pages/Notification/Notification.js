import {Route, Routes} from "react-router-dom";
import NotificationList from "./NotificationList";
import NotificationDetail from "./NotificationDetail";

function Notification() {
    return (
        <Routes>
            <Route path={"/"} element={<NotificationList />}/>
            <Route path={'/:notificationId'} element={<NotificationDetail />} />
        </Routes>
    )
}

export default Notification;