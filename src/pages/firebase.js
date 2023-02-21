import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyBbidoouSzPG-RUbxcvWNsrPXyN05thyqk",
  authDomain: "gdjang-acc7f.firebaseapp.com",
  projectId: "gdjang-acc7f",
  storageBucket: "gdjang-acc7f.appspot.com",
  messagingSenderId: "564181649315",
  appId: "1:564181649315:web:0e5f31c930591b34cfbc16",
  measurementId: "G-QZ3VEV8ZLL"
};
export const firebaseApp =initializeApp(firebaseConfig);

/*
import React from "react";
import  firebaseApp  from "./firebaseAPP";
import 'firebase/messaging'; 
import 'firebase/compat/messaging';

const firebaseMessaging = firebaseApp.messaging();
/*
firebaseMessaging
  .requestPermission()
  .then(() => {
    return firebaseMessaging.getToken(); //등록 토큰 받기
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

function firebase() {
  return (
    <div className="App">
      <h1>FCM TEST</h1>
    </div>
  );
}

export default firebase;
*/