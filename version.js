// 버전 관리 스크립트
// 모든 HTML 페이지에서 VERSION.json을 로드하여 버전 정보를 표시

// 버전 정보 로드 및 표시
async function loadVersion() {
    try {
        const response = await fetch('VERSION.json');
        const versionData = await response.json();
        
        // 모든 .version 클래스를 가진 요소 찾기
        const versionElements = document.querySelectorAll('.version, .version-small');
        
        versionElements.forEach(element => {
            // 기존 텍스트 유지하면서 버전만 업데이트
            const currentText = element.textContent;
            
            if (currentText.includes('Version') || currentText.includes('v')) {
                // "Version 1.x.x" 또는 "v1.x.x" 형태로 업데이트
                if (currentText.includes('Version')) {
                    element.textContent = `Version ${versionData.current}`;
                } else {
                    element.textContent = `v${versionData.current}`;
                }
            } else {
                // 아무 텍스트가 없으면 버전만 표시
                element.textContent = `v${versionData.current}`;
            }
        });
        
        console.log(`✅ 버전 정보 로드 완료: v${versionData.current}`);
    } catch (error) {
        console.error('❌ 버전 정보 로드 실패:', error);
    }
}

// DOM 로드 완료 후 버전 정보 로드
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadVersion);
} else {
    loadVersion();
}
