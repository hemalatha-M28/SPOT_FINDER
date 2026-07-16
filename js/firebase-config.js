/* -------------------------------------------------------------
 * SPOT FINDER - Firebase Configuration
 * Initializes Firebase App, Auth, and Firestore
 * ------------------------------------------------------------- */

const firebaseConfig = {
  apiKey: "AIzaSyAbukqrRDl6BWvzcwfbp-FMQSuv0hOltZI",
  authDomain: "spot-finder-c41a4.firebaseapp.com",
  projectId: "spot-finder-c41a4",
  storageBucket: "spot-finder-c41a4.firebasestorage.app",
  messagingSenderId: "847309356786",
  appId: "1:847309356786:web:0f5cd562010a079c255a6b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Expose globally so auth.js and other modules can use them
window.sfAuth = firebase.auth();
window.sfDb   = firebase.firestore();

console.log('[SpotFinder] Firebase initialized ✓');
