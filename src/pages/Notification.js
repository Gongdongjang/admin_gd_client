import {Route, Routes} from "react-router-dom";

function NotificationList() {
    return (
        <div className={"Notification-container"}>
            <p>hello Word</p>
        </div>
    )
}

function Notification() {
    return [
        <Routes>
            <Route path={"/"} element={<NotificationList />}/>
        </Routes>
    ]
}

export default Notification;