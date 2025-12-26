# 🔧 Firebase 설정 완료 가이드

## ⚠️ 중요: Firebase 설정 정보 입력 필요!

Firebase Console에서 받은 설정 정보를 다음 파일들에 넣어야 합니다:

### 수정할 파일 (총 3개):

#### 1. login.html
```javascript
// 약 55번째 줄 근처
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",  ← 여기를
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

↓↓↓ 복사한 실제 값으로 교체 ↓↓↓

const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};
```

#### 2. index.html
```javascript
// 약 9번째 줄 근처 (똑같이 교체)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",  ← 실제 값으로
    ...
};
```

#### 3. app.html
```javascript
// 약 15번째 줄 근처 (똑같이 교체)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",  ← 실제 값으로
    ...
};
```

---

## ✅ 설정 후 확인사항

### 1. 로그인 테스트
```
1. https://your-site.com/login.html 접속
2. Firebase에서 만든 계정으로 로그인
3. 성공 시 → index.html로 자동 이동
```

### 2. 보안 확인
```
1. 로그인 없이 index.html 직접 접속 시도
2. → 자동으로 login.html로 리다이렉트되어야 함
```

### 3. 로그아웃 확인
```
1. index.html 우측 상단 "로그아웃" 버튼 클릭
2. → login.html로 이동
```

---

## 🎯 현재 상태

### 완료된 것:
- ✅ login.html (로그인 페이지)
- ✅ index.html (메인 페이지 보호 + 로그아웃 버튼)
- ✅ app.html (업무 페이지 보호 + 로그아웃 버튼)

### 작동 방식:
```
사용자 접속
    ↓
로그인 확인
    ↓
    ├─ 로그인 안 됨 → login.html로 리다이렉트
    └─ 로그인 됨 → 페이지 표시
```

---

## 📝 Firebase 설정 정보 찾는 법

1. Firebase Console 접속
2. 프로젝트 설정 (⚙️) 클릭
3. 아래로 스크롤
4. "내 앱" 섹션에서 웹 앱 선택
5. SDK 설정 및 구성 → 구성 선택
6. firebaseConfig 전체 복사

---

## 💡 문제 해결

### "로그인이 안 돼요"
→ 브라우저 콘솔(F12) 확인
→ Firebase 설정이 올바른지 확인

### "계속 login.html로 돌아가요"
→ Firebase 설정 정보가 잘못됨
→ 모든 파일에 동일한 설정을 넣었는지 확인

### "로그아웃 버튼이 안 보여요"
→ 로그인 후에만 표시됨
→ 브라우저 새로고침 (Ctrl+F5)
