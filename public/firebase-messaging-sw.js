//import firebase from 'firebase'
importScripts('https://www.gstatic.com/firebasejs/5.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.10.0/firebase-messaging.js');  

const config = {
  apiKey: "AIzaSyBnE0owuEH598Qd_bvJ6xTLHVY-EqXKs4M",
  authDomain: "carpool-d3255.firebaseapp.com",
  databaseURL: "https://carpool-d3255.firebaseio.com",
  projectId: "carpool-d3255",
  storageBucket: "carpool-d3255.appspot.com",
  messagingSenderId: "13033149059"
};

const fire = firebase.initializeApp(config);
//const messaging=firebase.messaging();

// messaging.setBackgroundMessageHandler(function(payload) {
//   const promiseChain = clients
//     .matchAll({
//       type: "window",
//       includeUncontrolled: true
//     })
//     .then(windowClients => {
//       for (let i = 0; i < windowClients.length; i++) {
//         const windowClient = windowClients[i];
//         windowClient.postMessage(payload);
//       }
//     })
//     .then(() => {
//       return registration.showNotification("my notification title");
//     });
//   return promiseChain;
// });
// self.addEventListener('notificationclick', function(event) {
//   // do what you want
//   // ...
//   return admin.messaging().send(payload);
// });


 //we need to check if messaging is supported by the browser
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
}


export {
  messaging
};

//export const inicializarFirebase = () => {
  //  firebase.initializeApp({
    //  messagingSenderId: '13033149059'
    //});
  //} 

  