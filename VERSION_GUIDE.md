# 버전 관리 가이드

## 📌 현재 버전: 1.1.0

## 🔢 버전 번호 체계 (Semantic Versioning)

```
MAJOR.MINOR.PATCH
  1  .  1  .  0
  
예: 1.1.0
```

### Major Version (X.0.0)
**큰 변경, 호환성 문제 가능**

예시:
- 전체 시스템 재구축
- 데이터 구조 대폭 변경
- 주요 기능 추가 (새로운 모듈)
- 기존 기능 제거
- API 변경으로 인한 호환성 깨짐

업데이트 예:
- 1.5.3 → 2.0.0

### Minor Version (1.X.0)
**새로운 기능, 하위 호환 유지**

예시:
- 새로운 페이지 추가
- 검색 기능 추가
- UI/UX 개선
- 성능 최적화
- 새로운 설정 옵션
- 디자인 변경

업데이트 예:
- 1.1.5 → 1.2.0

### Patch Version (1.1.X)
**버그 수정, 작은 개선**

예시:
- 오타 수정
- 작은 버그 수정
- CSS 미세 조정
- 링크 수정
- 색상 미세 조정
- 간격 조정 (매우 작은 변경)

업데이트 예:
- 1.1.0 → 1.1.1

---

## 📋 버전 업데이트 시 수정할 파일

### 필수 수정 파일
1. **VERSION.json** - 버전 정보 및 히스토리
2. **index.html** - 메인 페이지 버전 배지
3. **app.html** - 업무 페이지 헤더 버전
4. **README.html** - 가이드 페이지 버전
5. **README.md** - 마크다운 문서 버전
6. **CHANGELOG.md** - 상세 변경 내역

### 버전 위치
```
index.html:
  <div class="version">Version X.X.X</div>

app.html:
  <span class="version-small">vX.X.X</span>

README.html:
  <div class="version-badge">Version X.X.X</div>

README.md:
  **Version X.X.X** - YYYY년 MM월 DD일
```

---

## 🔄 버전 업데이트 프로세스

### 1. 변경 사항 확인
```
- 무엇이 변경되었나?
- 새로운 기능인가? 버그 수정인가? UI 개선인가?
- 호환성에 영향을 주는가?
```

### 2. 버전 번호 결정
```
Major: 호환성 깨지는 큰 변경
Minor: 새 기능 추가, UI/UX 개선
Patch: 버그 수정, 작은 조정
```

### 3. VERSION.json 업데이트
```json
{
  "current": "1.2.0",
  "history": [
    {
      "version": "1.2.0",
      "date": "2025-12-27",
      "type": "minor",
      "changes": [
        "변경 사항 1",
        "변경 사항 2"
      ]
    },
    ...
  ]
}
```

### 4. 모든 HTML 파일 버전 업데이트
- index.html
- app.html
- README.html

### 5. 문서 업데이트
- README.md
- CHANGELOG.md

### 6. 테스트
- 모든 페이지 정상 작동 확인
- 버전 표시 확인
- 링크 동작 확인

---

## 📊 버전 히스토리 예시

### Version 1.2.0 (가상)
**Type:** Minor
**Changes:**
- 다크 모드 추가
- 인쇄 최적화
- 모바일 반응형 개선

### Version 1.1.1 (가상)
**Type:** Patch
**Changes:**
- 공지사항 페이지 오타 수정
- 버튼 색상 미세 조정

### Version 1.1.0 (실제)
**Type:** Minor
**Changes:**
- 버전 배지와 직원 카드 간격 조정
- 로고 대체 아이콘 확인

### Version 1.0.0 (실제)
**Type:** Major
**Changes:**
- 초기 릴리즈
- 모든 기본 기능 구현

---

## 🎯 빠른 참조

| 변경 유형 | 버전 증가 | 예시 |
|-----------|-----------|------|
| 대규모 시스템 변경 | Major | 1.5.0 → 2.0.0 |
| 새 페이지/기능 추가 | Minor | 1.1.0 → 1.2.0 |
| 디자인 개선 | Minor | 1.1.0 → 1.2.0 |
| 성능 최적화 | Minor | 1.1.0 → 1.2.0 |
| 버그 수정 | Patch | 1.1.0 → 1.1.1 |
| 오타 수정 | Patch | 1.1.0 → 1.1.1 |
| 미세한 CSS 조정 | Patch | 1.1.0 → 1.1.1 |

---

## 💡 팁

1. **의심스러우면 Minor로**: Patch vs Minor 고민된다면 Minor 선택
2. **문서화 필수**: 모든 변경 사항은 반드시 CHANGELOG.md에 기록
3. **일관성 유지**: 모든 파일의 버전 번호가 동일해야 함
4. **날짜 기록**: VERSION.json에 항상 날짜 포함
5. **테스트**: 버전 업데이트 후 반드시 모든 페이지 확인

---

## 📝 체크리스트

버전 업데이트 시 확인사항:

- [ ] VERSION.json 업데이트
- [ ] index.html 버전 수정
- [ ] app.html 버전 수정
- [ ] README.html 버전 수정
- [ ] README.md 버전 및 히스토리 수정
- [ ] CHANGELOG.md 변경 내역 추가
- [ ] 모든 페이지 정상 작동 확인
- [ ] 버전 번호 일치 확인
- [ ] GitHub 업로드

---

**현재 버전: 1.1.0**
**마지막 업데이트: 2025-12-26**
