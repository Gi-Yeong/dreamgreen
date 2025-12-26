# 🔥 Firebase Authentication 설정 가이드

## 📋 목차
1. Firebase 프로젝트 생성
2. Authentication 활성화
3. 사용자 계정 생성
4. 설정 정보 복사
5. 코드 구현

---

## 1단계: Firebase 프로젝트 생성 (5분)

### 1-1. Firebase Console 접속
```
1. 웹브라우저 열기
2. https://console.firebase.google.com 접속
3. Google 계정으로 로그인
```

### 1-2. 새 프로젝트 만들기
```
1. "프로젝트 추가" 또는 "Add project" 클릭
2. 프로젝트 이름 입력: "시흥꿈에그린요양원" (또는 원하는 이름)
3. "계속" 클릭
```

### 1-3. Google 애널리틱스 설정 (선택사항)
```
1. "이 프로젝트에 Google 애널리틱스 사용 설정" 
   → 필요 없으면 끄기 (권장)
2. "프로젝트 만들기" 클릭
3. 프로젝트 준비 완료될 때까지 대기 (30초~1분)
4. "계속" 클릭
```

---

## 2단계: Authentication 활성화 (3분)

### 2-1. Authentication 메뉴 접속
```
1. 왼쪽 메뉴에서 "빌드" 또는 "Build" 클릭
2. "Authentication" 클릭
3. "시작하기" 또는 "Get started" 클릭
```

### 2-2. 로그인 방법 설정
```
1. "Sign-in method" 탭 클릭
2. "이메일/비밀번호" 또는 "Email/Password" 클릭
3. 첫 번째 옵션 "사용 설정" → 켜기 (ON)
4. "저장" 클릭
```

✅ **완료!** 이제 이메일/비밀번호 로그인 사용 가능!

---

## 3단계: 사용자 계정 생성 (5분)

### 3-1. Users 탭으로 이동
```
1. "Users" 탭 클릭
2. "사용자 추가" 또는 "Add user" 클릭
```

### 3-2. 직원 계정 생성
**각 직원마다 아래 작업 반복:**

```
민희진:
- 이메일: minhee@dreamgreen.com
- 비밀번호: (임시 비밀번호 설정, 예: Dream2025!)
- "사용자 추가" 클릭

최선웅:
- 이메일: sunwoong@dreamgreen.com
- 비밀번호: Dream2025!
- "사용자 추가" 클릭

물리치료사:
- 이메일: pt@dreamgreen.com
- 비밀번호: Dream2025!
- "사용자 추가" 클릭

간호조무사:
- 이메일: nurse@dreamgreen.com
- 비밀번호: Dream2025!
- "사용자 추가" 클릭
```

💡 **팁:**
- 임시 비밀번호는 나중에 각자 변경 가능
- 실제로는 각 직원 이름 이메일 사용 권장
- 예: minhee.kim@dreamgreen.com

---

## 4단계: Firebase 설정 정보 복사 (2분)

### 4-1. 프로젝트 설정으로 이동
```
1. 왼쪽 상단 톱니바퀴 ⚙️ 클릭
2. "프로젝트 설정" 클릭
```

### 4-2. 웹 앱 추가
```
1. 아래로 스크롤
2. "내 앱" 섹션에서 웹 아이콘 </> 클릭
3. 앱 닉네임: "업무관리시스템" 입력
4. "Firebase Hosting 설정" 체크 안 함
5. "앱 등록" 클릭
```

### 4-3. 설정 정보 복사
```
화면에 나타나는 firebaseConfig 정보를 복사합니다.

다음과 같이 생겼을 겁니다:

const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};

→ 이 정보를 메모장에 복사해 두세요!
```

✅ **중요:** 이 정보는 나중에 코드에 붙여넣을 거예요!

---

## 5단계: 준비 완료! ✅

이제 Firebase 설정이 완료되었습니다!

### 확인 사항 체크리스트:
- ✅ Firebase 프로젝트 생성됨
- ✅ Authentication 활성화됨
- ✅ 이메일/비밀번호 로그인 켜짐
- ✅ 직원 계정 4개 생성됨
- ✅ Firebase 설정 정보 복사됨

---

## 다음 단계:

위 설정이 모두 완료되면:
1. Firebase 설정 정보를 제공해 주세요
2. 로그인 페이지와 보안 코드를 만들어 드리겠습니다!

---

## 💡 자주 묻는 질문

**Q: Firebase는 무료인가요?**
A: 네! 요양원 규모에서는 100% 무료입니다.
   (월 10,000명까지 무료, 실제 사용: ~10명)

**Q: 퇴사자는 어떻게 차단하나요?**
A: Firebase Console → Authentication → Users 
   → 해당 사용자 클릭 → "사용자 사용 중지" 클릭

**Q: 비밀번호를 잊어버리면?**
A: 로그인 페이지에서 "비밀번호 재설정" 기능 제공 예정
   (이메일로 재설정 링크 전송)

**Q: 보안은 안전한가요?**
A: 네! Firebase는 Google의 보안 시스템을 사용합니다.
   은행 앱에서도 사용하는 수준의 보안입니다.

---

## 🎯 다음 할 일

Firebase 설정이 완료되면 알려주세요!
그러면 다음을 만들어 드리겠습니다:

1. ✅ 로그인 페이지 (login.html)
2. ✅ 자료실 페이지 (library.html)
3. ✅ 모든 페이지에 보안 추가
4. ✅ 로그아웃 버튼 추가

준비되셨나요? 🚀
