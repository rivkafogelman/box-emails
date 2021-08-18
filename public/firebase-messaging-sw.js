
importScripts
    ("https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js")

importScripts
    ("https://www.gstatic.com/firebasejs/8.2.3/firebase-messaging.js")

let config = {
    apiKey: "AIzaSyBlebSJv0uYkshPJRb-YTO6AQnVwcchSsI",
    authDomain: "accounts-445eb.firebaseapp.com",
    projectId: "accounts-445eb",
    storageBucket: "accounts-445eb.appspot.com",
    messagingSenderId: "299859834462",
    appId: "1:299859834462:web:3de8f745251c76002fa6cf",
    measurementId: "G-035RVSJW15"
}



firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;;
    const notificationOptions = {
        title: payload.notification.title ?
            payload.notification.title : 'Leader',
        body: payload.notification.body ?
            payload.notification.body : 'new conversation from leadersending now',
        icon: payload.notification.icon ?
            payload.notification.icon : 'leaderNew.png'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});
