// Firebase 설정 파일
// 이 파일 하나만 수정하면 모든 페이지에 적용됩니다!

// ⚠️ Firebase Console에서 받은 설정 정보를 여기에 한 번만 입력하세요!
export const firebaseConfig = {
  apiKey: "AIzaSyAtZ8rS9UMwU9sww6hSwwk1ISxyAK5vZwI",
  authDomain: "dreamgreen-f720d.firebaseapp.com",
  projectId: "dreamgreen-f720d",
  storageBucket: "dreamgreen-f720d.firebasestorage.app",
  messagingSenderId: "313272641024",
  appId: "1:313272641024:web:d742a19bc5c3ced58c5ae5",
  measurementId: "G-2BS154H6F5"
};

// Firebase 초기화 (자동)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
export const app = initializeApp(firebaseConfig);

// Auth 초기화 (자동)
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
export const auth = getAuth(app);
