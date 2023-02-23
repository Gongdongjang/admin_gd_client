import React from "react";

import { firebaseApp } from "./firebase";
import { getMessaging, getToken, onMessage  } from "firebase/messaging";

const messaging = getMessaging(firebaseApp);
Notification.requestPermission()
.then(function(permission) {
  if (permission === 'granted') {
    console.log('알림 권한이 부여되었습니다.');//알림권한 부여성공
  } else {
    console.log('알림 권한을 얻을 수 없습니다.');
  }
})
getToken(messaging, { vapidKey: 'BNmtxfMAvPXu7tY1YK1A50ncKeh1Hc358tAlU6_jSbBtNRx3x62tm0oFucZSzuRgqIV_u_A8ikn-sNe3v99r4GU' })
.then((currentToken) => {
  if (currentToken) {
    //console.log(currentToken)
  } else {
    // Show permission request UI
    console.log('사용 가능한 등록 토큰이 없습니다. 생성 권한을 요청합니다.');
    // ...
  }
}).catch((err) => {
  console.log('토큰을 검색하는 동안 오류가 발생했습니다. ', err);
  // ...
});

//알림 메세지 받기 콘솔에 찍음
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});
  function PushMsg() {
    return (
      <div >
        <h1>FCM TEST</h1>
      </div>
    );
  }
  
  export default PushMsg;
