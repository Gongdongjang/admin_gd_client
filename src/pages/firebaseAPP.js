/*import React from "react";
import { firebaseApp } from "./firebase";

const firebaseMessaging = firebaseApp.messaging();
firebaseMessaging
  .requestPermission()   //알림 권한을 요청
  .then(() => {
    return firebaseMessaging.getToken(); // 등록 토큰 받기
  })
  .then(function (token) {
    console.log(token); //토큰 출력
  })
  .catch(function (error) {
    console.log("FCM Error : ", error);
  });


  firebaseMessaging.onMessage((payload) => {
    console.log(payload.notification.title);
    console.log(payload.notification.body);
  });
  
  function App() {
    return (
      <div className="App">
        <h1>FCM TEST</h1>
      </div>
    );
  }
  
  export default App;
// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//export default firebaseApp;
//-----------------------------------
/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDuqi7EO3ruPFzRHCvc2GJtnEmfyvbAwPQ",
  authDomain: "gdjang-e879c.firebaseapp.com",
  projectId: "gdjang-e879c",
  storageBucket: "gdjang-e879c.appspot.com",
  messagingSenderId: "881607072221",
  appId: "1:881607072221:web:75c05fdc206b721bd7fe34"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const authService = getAuth();
export default firebaseApp;*/