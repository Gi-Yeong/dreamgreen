// 공통 인증 체크 스크립트
// 모든 보호된 페이지에서 사용

import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// 🔒 뒤로가기 감지 및 인증 재확인
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // 브라우저 캐시에서 페이지가 로드된 경우 (뒤로가기)
        console.log('페이지 캐시에서 로드됨 - 인증 재확인');
        location.reload();
    }
});

// 🔒 전역 변수로 사용자 정보 저장
window.currentAuthUser = null;

window.getCurrentUser = function() {
    return window.currentAuthUser;
};

// 로그인 확인
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // 로그인 안 됨 → 로그인 페이지로
        console.log('로그인 필요 - login.html로 이동');
        window.location.replace('login.html');
    } else {
        // 로그인 됨
        console.log('✅ 로그인된 사용자:', user.email);
        window.currentAuthUser = user;
        
        // DOM이 준비될 때까지 대기 후 페이지 초기화
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initializePage(user);
            });
        } else {
            // DOM이 이미 로드된 경우 즉시 실행
            initializePage(user);
        }
    }
});

// 페이지 초기화 함수
function initializePage(user) {
    console.log('페이지 초기화 시작:', user.email);
    
    // 페이지별 커스텀 초기화 함수가 있으면 실행
    if (typeof window.pageInit === 'function') {
        console.log('pageInit 함수 실행');
        window.pageInit(user);
    } else {
        console.log('pageInit 함수 없음 - 기본 초기화 실행');
        // 기본 초기화 (페이지별 함수가 없을 경우)
        defaultPageInit(user);
    }
}

// 기본 페이지 초기화
function defaultPageInit(user) {
    const username = user.email.split('@')[0];
    
    // 사용자 정보 표시 (있다면)
    const userInfo = document.getElementById('userInfo');
    if (userInfo) {
        userInfo.innerHTML = `
            <div class="user-info-box">
                <span class="user-name">👤 ${username}님</span>
                <button class="logout-btn" onclick="handleLogout()">
                    로그아웃
                </button>
            </div>
        `;
    }
}

// 로그아웃 함수
window.handleLogout = async function() {
    if (confirm('로그아웃 하시겠습니까?')) {
        try {
            await signOut(auth);
            console.log('로그아웃 성공');
            window.location.replace('login.html');
        } catch (error) {
            console.error('로그아웃 실패:', error);
            alert('로그아웃에 실패했습니다.');
        }
    }
};
