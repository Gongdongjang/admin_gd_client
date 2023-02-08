import {Route, Routes} from "react-router-dom";
import NotificationList from "./NotificationList";

function Notification() {
    return [
        <Routes>
            <Route path={"/"} element={<NotificationList />}/>
        </Routes>
    ]
}

export default Notification;