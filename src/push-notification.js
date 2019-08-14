// import fire from './config/fire';

// export const askForPermissioToReceiveNotifications = async () => {
//     try {
//       const messaging = fire.messaging();
//       await messaging.requestPermission();
//       const token = await messaging.getToken();
//       console.log('token do usuário:', token);
      
//       return token;
//     } catch (error) {
//       console.error(error);
//     }
//   }