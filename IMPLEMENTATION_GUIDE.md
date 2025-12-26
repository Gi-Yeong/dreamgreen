# 🚀 Firebase 구현 단계별 실행 가이드

## 📌 전체 프로세스 요약

```
1. Firebase Console에서 설정 (10분)
   ↓
2. Firebase 설정 정보 복사 (2분)
   ↓
3. 코드에 설정 정보 붙여넣기 (5분)
   ↓
4. 테스트 (3분)
   ↓
5. 완료! 🎉
```

---

## ✅ STEP 1: Firebase Console 설정 (10분)

### 해야 할 일:
1. https://console.firebase.google.com 접속
2. 프로젝트 생성
3. Authentication 활성화
4. 사용자 계정 생성

### 상세 가이드:
→ FIREBASE_SETUP_GUIDE.md 파일 참고!

### 완료 후 확인:
- ✅ 프로젝트 이름: 시흥꿈에그린요양원
- ✅ Authentication 활성화됨
- ✅ 직원 계정 4개 생성됨

---

## ✅ STEP 2: Firebase 설정 정보 복사 (2분)

### 위치:
```
Firebase Console
→ 프로젝트 설정 (⚙️)
→ 내 앱
→ 웹 앱 추가
→ firebaseConfig 복사
```

### 복사할 정보 예시:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### 중요:
📋 이 정보를 **메모장에 저장**하세요!

---

## ✅ STEP 3: 코드에 설정 정보 붙여넣기 (5분)

### 수정할 파일 2개:

#### 1) login.html
```javascript
// 찾기: const firebaseConfig = {
// 바꾸기: 복사한 설정 정보로 전체 교체

수정 전:
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    ...
};

수정 후:
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXX",  ← 실제 값
    authDomain: "your-project.firebaseapp.com",  ← 실제 값
    ...
};
```

#### 2) auth.js
```javascript
// 똑같이 firebaseConfig 부분 교체
// login.html과 동일한 설정 정보 사용
```

### 수정 방법:
1. 텍스트 에디터로 파일 열기
2. `const firebaseConfig = {` 부분 찾기
3. 중괄호 {} 안의 내용 전체를 복사한 정보로 교체
4. 저장

---

## ✅ STEP 4: GitHub에 업로드 (5분)

### 업로드할 파일:
```
신규 파일:
- login.html (로그인 페이지)
- auth.js (인증 체크 스크립트)

기존 파일은 그대로 유지
```

### GitHub 업로드:
```
1. GitHub 저장소 접속
2. Add file → Upload files
3. login.html, auth.js 드래그 앤 드롭
4. Commit changes
```

---

## ✅ STEP 5: 테스트 (3분)

### 테스트 순서:

#### 1) 로그인 페이지 접속
```
https://your-username.github.io/your-repo/login.html
```

#### 2) 로그인 시도
```
이메일: minhee@dreamgreen.com
비밀번호: (Firebase에서 설정한 비밀번호)
```

#### 3) 성공 확인
```
✅ 로그인 성공 시 → index.html로 자동 이동
❌ 실패 시 → 에러 메시지 표시
```

---

## 🔧 다음 단계: 기존 페이지 보호하기

로그인이 작동하면 다음 작업:

### 1) index.html 보호
```html
<!-- index.html 상단에 추가 -->
<script type="module" src="auth.js"></script>
```

### 2) 로그아웃 버튼 추가
```html
<!-- index.html 헤더에 추가 -->
<div id="userInfo"></div>
```

### 3) 자료실 페이지 생성
```
library.html 생성 (다음 단계에서 진행)
```

---

## 📝 체크리스트

### Firebase Console 설정:
- [ ] 프로젝트 생성 완료
- [ ] Authentication 활성화 완료
- [ ] 이메일/비밀번호 로그인 활성화
- [ ] 직원 계정 4개 생성
- [ ] Firebase 설정 정보 복사

### 코드 수정:
- [ ] login.html에 설정 정보 붙여넣기
- [ ] auth.js에 설정 정보 붙여넣기
- [ ] GitHub에 업로드

### 테스트:
- [ ] 로그인 페이지 접속 확인
- [ ] 로그인 성공 확인
- [ ] 에러 처리 확인

---

## 💡 문제 해결

### 로그인이 안 돼요!
```
1. Firebase 설정 정보가 올바른지 확인
2. 브라우저 콘솔(F12)에서 에러 확인
3. 이메일/비밀번호가 정확한지 확인
4. Firebase Console에서 계정이 생성됐는지 확인
```

### "Invalid API key" 에러
```
→ firebaseConfig의 apiKey가 잘못됨
→ Firebase Console에서 다시 복사
```

### "User not found" 에러
```
→ Firebase Console에서 해당 이메일 계정 생성 필요
```

### 로그인 후 바로 로그인 페이지로 돌아가요
```
→ auth.js가 제대로 로드되지 않음
→ 파일 경로 확인
```

---

## 🎯 현재 진행 상황

### 완료된 것:
- ✅ login.html 생성 (로그인 페이지)
- ✅ auth.js 생성 (인증 체크)
- ✅ Firebase 설정 가이드

### 다음에 할 것:
1. Firebase Console 설정
2. 설정 정보 붙여넣기
3. 테스트
4. 기존 페이지에 보안 추가
5. 자료실 페이지 생성

---

## 📞 도움이 필요하면

각 단계에서 막히는 부분이 있으면:
1. 어느 단계인지
2. 어떤 에러가 나는지
3. 스크린샷 (가능하면)

알려주세요! 🙋‍♂️
