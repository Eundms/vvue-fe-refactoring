importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js');

// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsVxPOluRWM2Yf4sSa8Ir-AmayNL2lGHY",
  authDomain: "vvue-real.firebaseapp.com",
  projectId: "vvue-real",
  storageBucket: "vvue-real.firebasestorage.app",
  messagingSenderId: "735573310351",
  appId: "1:735573310351:web:4aaf987a9d9b25687329fa",
  measurementId: "G-CK3575TSWY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification.title + " (onBackgroundMessage)";
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/images/icon-192x192.png",
  };
  console.log('백그라운드 푸시 메시지 수신:', payload);

  self.registration.showNotification(title, notificationOptions);
});