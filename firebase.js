// firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyD1IrYGF6w1wO5_A1-TYZ2WrSazVJm2mHM",
    authDomain: "sync-monitor.firebaseapp.com",
    projectId: "sync-monitor",
    storageBucket: "sync-monitor.firebasestorage.app",
    messagingSenderId: "1085828001992",
    appId: "1:1085828001992:web:de487f4a35461537adb5fd",
    measurementId: "G-3HMTFYL23Y"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

