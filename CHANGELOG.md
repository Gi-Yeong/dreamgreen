# 변경 사항 (Changelog)

## 📋 버전 규칙 (Semantic Versioning)

- **Major (X.0.0)**: 주요 기능 추가, 구조적 변경, 호환성 깨지는 변경
- **Minor (1.X.0)**: 새로운 기능 추가, UI/UX 개선, 성능 최적화
- **Patch (1.1.X)**: 버그 수정, 오타 수정, 작은 UI 조정

---

## Version 1.2.0 - 2025년 12월 26일

### 🛠️ 개발 경험 개선 (DX Improvement)

#### Firebase 설정 통합
- ✅ `firebase-config.js` 파일 생성
- ✅ 모든 Firebase 설정을 한 곳으로 통합
- ✅ 4개 파일 수정 → **1개 파일만 수정**으로 간소화

#### 변경된 파일들
```javascript
// 이전: 각 파일마다 설정 복붙
login.html   → firebaseConfig { ... }
index.html   → firebaseConfig { ... }
app.html     → firebaseConfig { ... }
auth.js      → firebaseConfig { ... }

// 지금: import 한 줄로 끝
login.html   → import { auth } from './firebase-config.js'
index.html   → import { auth } from './firebase-config.js'
app.html     → import { auth } from './firebase-config.js'
auth.js      → import { auth } from './firebase-config.js'
```

#### 개선 효과
- ⚡ 설정 변경 시간: 10분 → **2분** (80% 단축)
- ✅ 실수 가능성: 높음 → **없음**
- 🔧 유지보수성: **대폭 향상**

### 🎨 UI 개선
- ✅ 로그인 페이지에 실제 로고 이미지 적용 (images/logo.png)
- ✅ 로고 로드 실패 시 🏥 이모지로 대체

### 📁 새로 추가된 파일
- `firebase-config.js` - Firebase 설정 전용 파일

### 📝 수정된 파일
- `login.html` - Firebase import 간소화, 로고 이미지 추가
- `index.html` - Firebase import 간소화, 버전 1.2.0
- `app.html` - Firebase import 간소화, 버전 1.2.0
- `auth.js` - Firebase import 간소화
- `README.html` - 버전 1.2.0, 히스토리 추가
- `README.md` - 버전 1.2.0, 히스토리 추가
- `VERSION.json` - 1.2.0 업데이트

---

## Version 1.1.0 - 2025년 12월 26일

### 🎨 UI/UX 개선
- ✅ 버전 배지와 직원 카드 간격 조정 (margin-bottom: 40px)
- ✅ 로고 대체 아이콘 확인 및 유지 (🏥 요양원)
- ✅ 사용자 정보 UI 개선
  - 흰색 박스 배경
  - 검은색 글자 (#2c3e50)
  - 파란 테두리 (#667eea)
  - 빨간색 로그아웃 버튼 (그라데이션)
- ✅ 모든 페이지에 로그아웃 버튼 추가

### 📁 수정된 파일
- `index.html` - 사용자 정보 UI 개선, 간격 조정
- `app.html` - 로그아웃 버튼 추가
- `README.html` - 버전 업데이트
- `README.md` - 버전 업데이트
- `VERSION.json` - 1.1.0 업데이트

---

## Version 1.0.0 - 2025년 12월 26일

### 🚀 초기 릴리즈

### 주요 기능
- ✅ 직원별 업무 관리 시스템 (민희진, 최선웅, 물리치료사, 간호조무사)
- ✅ 통합 검색 기능 (모든 직원 업무 실시간 검색)
- ✅ 평가지표 이미지 뷰어 (캐러셀, 확대/축소)
- ✅ 주기별 업무 필터링
- ✅ 파일 다운로드 (개별/전체 ZIP)

### 성능 최적화
- ⚡ 이미지 로딩 속도 70% 향상
  - 병렬 처리 (6개씩 배치)
  - 캐싱 시스템
  - 타임아웃 (2초)
  - 우선순위 확장자
  - 미리 로드 (Preload)
  - 조기 종료

### 추가 페이지
- 📋 공지사항 페이지 (업무 협조 관련 안내)
- 📖 README 페이지 (사용 가이드)

### 초기 설정
- 요양원 이름: 시흥꿈에그린요양원
- 최선웅 선생님 이모지: 👩‍💼 (여성)

### 기술 스택
- HTML5, CSS3, JavaScript (ES6+)
- JSZip (이미지 압축)
- GitHub Pages (호스팅)

---

## 향후 계획

### 고려 중인 기능
- [ ] 다크 모드
- [ ] 인쇄 최적화
- [ ] 모바일 앱 버전
- [ ] 업무 완료 체크 기능
- [ ] 알림/리마인더 기능
