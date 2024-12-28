importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js');

const firebaseConfig = {
  //   apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  //   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  //   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  //   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  //   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  //   appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  //   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
  apiKey: 'AIzaSyCJ-02cYaKK5EG4RhI6jSdY8xUeq8Ij8lg',
  authDomain: 'vvue-399103.firebaseapp.com',
  projectId: 'vvue-399103',
  storageBucket: 'vvue-399103.appspot.com',
  messagingSenderId: '542595759178',
  appId: '1:542595759178:web:1b30263024b123a2b3fab3',
  measurementId: 'G-JRRREW15PE',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
