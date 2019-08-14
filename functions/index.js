// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp(); //functions.config().firebase - was inside brackets

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
//  exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
//  });

// exports.sendMessage = functions.database.ref("Requests").onCreate(event => {
  	
//     const sender = "shivani";

//     console.log("requestId", requestId);
//     console.log("hello from me");

//     const payload = {
//         data: {
//             title: `New ride request from ${sender}`,
//             body: "hey u have a new request"
//         },
//         topic: "will work"
//     };

//     return admin.messaging().send(topicname,payload);
    
// });