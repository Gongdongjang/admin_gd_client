import {useParams} from "react-router-dom";

function NotificationDetail() {
    const {notificationId} = useParams();

    return (
        <div className={"Notification-container"}>
            <p>{notificationId}</p>
        </div>
    )
}

export default NotificationDetail;