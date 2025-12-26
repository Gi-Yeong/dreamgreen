// Firebase 인증 체크 스크립트
// 모든 보호된 페이지에 포함시킬 파일

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtZ8rS9UMwU9sww6hSwwk1ISxyAK5vZwI",
  authDomain: "dreamgreen-f720d.firebaseapp.com",
  projectId: "dreamgreen-f720d",
  storageBucket: "dreamgreen-f720d.firebasestorage.app",
  messagingSenderId: "313272641024",
  appId: "1:313272641024:web:d742a19bc5c3ced58c5ae5",
  measurementId: "G-2BS154H6F5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 현재 사용자 정보
let currentUser = null;

// 인증 상태 확인
onAuthStateChanged(auth, (user) => {
    if (user) {
        // 로그인됨
        currentUser = user;
        console.log('로그인 상태:', user.email);
        
        // 사용자 정보 UI 업데이트
        updateUserUI(user);
    } else {
        // 로그아웃됨 → 로그인 페이지로 리다이렉트
        console.log('로그인 필요');
        window.location.href = 'login.html';
    }
});

// 로그아웃 함수
async function logout() {
    try {
        await signOut(auth);
        console.log('로그아웃 성공');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('로그아웃 실패:', error);
        alert('로그아웃에 실패했습니다.');
    }
}

// 사용자 정보 UI 업데이트
function updateUserUI(user) {
    // 이메일에서 이름 추출 (예: minhee@dreamgreen.com → minhee)
    const username = user.email.split('@')[0];
    
    // 사용자 정보 표시 요소가 있으면 업데이트
    const userInfoElement = document.getElementById('userInfo');
    if (userInfoElement) {
        userInfoElement.innerHTML = `
            <span style="margin-right: 10px;">👤 ${username}님</span>
            <button onclick="logout()" class="logout-btn">로그아웃</button>
        `;
    }
}

// 전역 함수로 노출
window.logout = logout;
window.getCurrentUser = () => currentUser;

export { auth, currentUser, logout };
