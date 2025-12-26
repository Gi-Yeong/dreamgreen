// 업무 관리 시스템 JavaScript

const GITHUB_BASE_URL = "https://raw.githubusercontent.com/Gi-Yeong/dreamgreen/main/images";
// 우선순위: 일반적으로 가장 많이 사용되는 확장자 먼저 (소문자)
const IMAGE_EXTENSIONS = ['jpg', 'png', 'jpeg', 'JPG', 'PNG', 'JPEG'];

let allData = {};
let colors = {};
let currentStaff = '';
let currentImages = [];
let currentImageIndex = 0;
let currentZoom = 1;
let validImageUrls = [];
let currentIndicatorNum = null;
let currentUserEmail = ''; // 현재 로그인한 사용자 이메일

// 이미지 URL 캐시 (이미 확인한 URL은 다시 확인하지 않음)
const imageCache = new Map();

// 병렬 요청 제한 (동시에 너무 많은 요청 방지)
const MAX_CONCURRENT_REQUESTS = 6;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', async function() {
    // Firebase에서 사용자 정보 가져오기 (비동기 처리)
    await waitForAuth();
    
    // URL 파라미터에서 직원 이름 가져오기
    const params = new URLSearchParams(window.location.search);
    currentStaff = params.get('staff') || '민희진';
    
    // 데이터 로드
    await loadData();
    
    // UI 렌더링
    renderContent();
    
    // 검색 이벤트 리스너
    document.getElementById('searchInput').addEventListener('input', handleSearch);
});

// Firebase 인증 대기
async function waitForAuth() {
    return new Promise((resolve) => {
        // Firebase가 로드되고 auth 객체가 준비될 때까지 대기
        const checkAuth = setInterval(() => {
            if (window.getCurrentUser) {
                const user = window.getCurrentUser();
                if (user) {
                    currentUserEmail = user.email;
                    console.log('로그인한 사용자:', currentUserEmail);
                    clearInterval(checkAuth);
                    resolve();
                }
            }
        }, 50); // 100ms → 50ms로 단축
        
        // 2초 후에도 정보가 없으면 일단 진행
        setTimeout(() => {
            console.log('인증 타임아웃 - 현재 이메일:', currentUserEmail);
            clearInterval(checkAuth);
            resolve();
        }, 2000); // 10000 → 2000으로 단축
    });
}

// 데이터 로드
async function loadData() {
    const content = document.getElementById('content');
    
    // 로딩 표시
    content.innerHTML = `
        <div style="text-align: center; padding: 100px 20px;">
            <div style="font-size: 3em; margin-bottom: 20px;">📊</div>
            <h2>데이터를 불러오는 중입니다...</h2>
            <p style="margin-top: 10px; color: #666;">잠시만 기다려주세요.</p>
        </div>
    `;
    
    try {
        console.log(`data/${currentStaff}.json 로드 시작...`);
        
        // 개별 직원 파일 로드
        const staffResponse = await fetch(`data/${currentStaff}.json`);
        const staffData = await staffResponse.json();
        
        // allData 객체에 현재 직원 데이터 저장
        allData[currentStaff] = staffData;
        console.log(`data/${currentStaff}.json 로드 성공`);
        
        // colors.json 로드
        const colorsResponse = await fetch('colors.json');
        colors = await colorsResponse.json();
        console.log('colors.json 로드 성공');
    } catch (error) {
        console.error('데이터 로드 실패:', error);
        content.innerHTML = `
            <div style="text-align: center; padding: 100px 20px; color: #e74c3c;">
                <h2>❌ 데이터 로드 실패</h2>
                <p style="margin-top: 20px;">데이터를 불러올 수 없습니다.</p>
                <p style="margin-top: 10px; font-size: 0.9em;">오류: ${error.message}</p>
                <button onclick="location.reload()" style="margin-top: 30px; padding: 10px 30px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer;">
                    다시 시도
                </button>
            </div>
        `;
    }
}

// 콘텐츠 렌더링
function renderContent() {
    const staffTitle = document.getElementById('staffTitle');
    staffTitle.textContent = `${currentStaff} 업무`;
    
    const content = document.getElementById('content');
    let staffData = allData[currentStaff];
    
        // 행정실장 업무는 kiyoung85@gmail.com만 볼 수 있음
if (currentStaff === '행정실장') {
    console.log('행정실장 페이지 접근 - 현재 이메일:', currentUserEmail);
    
    // 이메일이 비어있으면 접근 거부 (무한루프 방지)
    if (!currentUserEmail) {
        console.log('로그인 정보 없음 - 접근 거부');
        content.innerHTML = `
            <div style="text-align: center; padding: 100px 20px; color: #666;">
                <h2>⚠️ 로그인이 필요합니다</h2>
                <p style="margin-top: 20px;">이 페이지에 접근하려면 로그인이 필요합니다.</p>
                <button onclick="location.href='login.html'" style="margin-top: 30px; padding: 10px 30px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer;">
                    로그인하기
                </button>
                <button onclick="location.href='index.html'" style="margin-top: 10px; padding: 10px 30px; background: #999; color: white; border: none; border-radius: 8px; cursor: pointer;">
                    홈으로 돌아가기
                </button>
            </div>
        `;
        return;
    }
    
    // 이메일 전체 비교로 변경
    if (currentUserEmail !== 'kiyoung85@gmail.com' || '') {
        console.log('접근 거부: 이메일이 kiyoung85@gmail.com이 아님', currentUserEmail);
        content.innerHTML = `
            <div style="text-align: center; padding: 100px 20px; color: #666;">
                <h2>⚠️ 접근 권한이 없습니다</h2>
                <p style="margin-top: 20px;">이 페이지는 kiyoung85@gmail.com 사용자만 접근할 수 있습니다.</p>
                <p style="margin-top: 10px; font-size: 0.9em; color: #999;">(현재 이메일: ${currentUserEmail})</p>
                <button onclick="location.href='index.html'" style="margin-top: 30px; padding: 10px 30px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer;">
                    홈으로 돌아가기
                </button>
            </div>
        `;
        return;
    }
    console.log('접근 허용: kiyoung85@gmail.com 사용자');
}
    
    if (!staffData) {
        content.innerHTML = '<p>데이터를 찾을 수 없습니다.</p>';
        return;
    }
    
    // 범례 생성
    let html = `
        <div class="legend">
            <h2>📋 주기별 색상 범례 (클릭하여 해당 주기 업무 보기)</h2>
            <div class="legend-items">
    `;
    
    const legendItems = [
        ['매일', '연한 핑크'],
        ['주 1회', '연한 파랑'],
        ['주 2회', '연한 오렌지'],
        ['월 1회', '연한 초록'],
        ['분기별', '연한 보라'],
        ['반기별', '연한 자주'],
        ['연 1회', '연한 노랑'],
        ['수시', '연한 회색']
    ];
    
    legendItems.forEach(([cycle, desc]) => {
        const color = colors[cycle] || '#FFFFFF';
        html += `
            <div class="legend-item" onclick="showCycleTasks('${cycle}')">
                <div class="legend-color" style="background-color: ${color};">${cycle}</div>
                <span>${desc}</span>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    // 섹션 생성
    let taskId = 0;
    staffData.forEach(section => {
        if (section.title.includes('참고:')) return;
        
        const indicatorNum = extractIndicatorNumber(section.title);
        const clickable = indicatorNum ? 'clickable' : '';
        const onclick = indicatorNum ? `onclick="openImageModalWithAutoDetect('${indicatorNum}')"` : '';
        
        html += `
            <div class="section">
                <div class="section-title ${clickable}" ${onclick}>${section.title}</div>
                <table>
                    <thead>
                        <tr>
                            <th>업무 내용</th>
                            <th>비고</th>
                            <th>주기</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        section.data.forEach(item => {
            const color = colors[item.cycle] || '#FFFFFF';
            html += `
                <tr id="task-${taskId}" data-cycle="${item.cycle}" data-base-cycle="${item.baseCycle}" data-section="${section.title}">
                    <td class="task-cell">${item.task}</td>
                    <td class="note-cell">${item.note}</td>
                    <td class="cycle-cell" style="background-color: ${color};">${item.cycle}</td>
                </tr>
            `;
            taskId++;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    });
    
    content.innerHTML = html;
}

// 평가지표 번호 추출
function extractIndicatorNumber(title) {
    const match = title.match(/평가지표\s*(\d+)/);
    if (match) {
        return match[1].padStart(2, '0');
    }
    return null;
}

// 검색 처리
async function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    const searchResults = document.getElementById('searchResults');
    const searchResultsContent = document.getElementById('searchResultsContent');
    
    if (!query) {
        searchResults.style.display = 'none';
        return;
    }
    
    // 모든 직원 데이터를 로드하지 않았다면 현재 직원만 검색
    const results = [];
    const currentStaffData = allData[currentStaff];
    
    if (currentStaffData) {
        currentStaffData.forEach(section => {
            section.data.forEach((item, index) => {
                if (item.task.toLowerCase().includes(query) || 
                    item.note.toLowerCase().includes(query)) {
                    results.push({
                        staff: currentStaff,
                        section: section.title,
                        task: item.task,
                        note: item.note,
                        cycle: item.cycle
                    });
                }
            });
        });
    }
    
    if (results.length === 0) {
        searchResultsContent.innerHTML = '<div class="no-results">검색 결과가 없습니다.</div>';
    } else {
        let html = '';
        results.forEach(result => {
            html += `
                <div class="search-result-item" onclick="scrollToTask(event)">
                    <div class="search-result-task">${result.task}</div>
                    <div class="search-result-meta">
                        📍 ${result.section} | 📅 ${result.cycle}
                    </div>
                </div>
            `;
        });
        searchResultsContent.innerHTML = html;
    }
    
    searchResults.style.display = 'block';
}

// 직원 페이지로 이동
function navigateToStaff(staffName) {
    if (currentStaff !== staffName) {
        location.href = `app.html?staff=${staffName}`;
    } else {
        document.getElementById('searchResults').style.display = 'none';
        document.getElementById('searchInput').value = '';
    }
}

// 이미지 URL 생성
function generateImageUrls(indicatorNum, imageNum) {
    const folder = `metrics${indicatorNum}`;
    const baseFileName = `평가지표 ${indicatorNum}-${imageNum}`;
    
    return IMAGE_EXTENSIONS.map(ext => {
        const fileName = encodeURIComponent(`${baseFileName}.${ext}`);
        return `${GITHUB_BASE_URL}/${folder}/${fileName}`;
    });
}

// 이미지 존재 확인 (캐시 사용)
async function checkImageExists(url) {
    // 캐시 확인
    if (imageCache.has(url)) {
        return imageCache.get(url);
    }
    
    try {
        // 타임아웃 설정 (2초)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        const response = await fetch(url, { 
            method: 'HEAD',
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        const exists = response.ok;
        imageCache.set(url, exists);
        return exists;
    } catch {
        imageCache.set(url, false);
        return false;
    }
}

// 존재하는 이미지 찾기 (병렬 처리)
async function findExistingImage(indicatorNum, imageNum) {
    const urls = generateImageUrls(indicatorNum, imageNum);
    
    // 병렬로 모든 확장자 확인 (더 빠름)
    const checks = urls.map(url => 
        checkImageExists(url).then(exists => ({ url, exists }))
    );
    
    const results = await Promise.all(checks);
    
    // 첫 번째로 존재하는 URL 반환
    const found = results.find(r => r.exists);
    return found ? found.url : null;
}

// 모든 이미지 자동 감지 (병렬 처리 및 조기 종료)
async function detectAllImages(indicatorNum) {
    const detectedUrls = [];
    const maxAttempts = 20;
    
    // 배치 단위로 처리 (6개씩)
    for (let batch = 0; batch < Math.ceil(maxAttempts / MAX_CONCURRENT_REQUESTS); batch++) {
        const startIdx = batch * MAX_CONCURRENT_REQUESTS + 1;
        const endIdx = Math.min(startIdx + MAX_CONCURRENT_REQUESTS - 1, maxAttempts);
        
        // 현재 배치의 이미지들을 병렬로 검색
        const batchPromises = [];
        for (let i = startIdx; i <= endIdx; i++) {
            batchPromises.push(
                findExistingImage(indicatorNum, i).then(url => ({ index: i, url }))
            );
        }
        
        const batchResults = await Promise.all(batchPromises);
        
        // 결과 처리
        let foundInBatch = false;
        for (const result of batchResults.sort((a, b) => a.index - b.index)) {
            if (result.url) {
                detectedUrls.push(result.url);
                foundInBatch = true;
            }
        }
        
        // 이번 배치에서 아무것도 못 찾았으면 종료
        if (!foundInBatch && detectedUrls.length > 0) {
            break;
        }
        
        // 첫 번째 배치에서 아무것도 없으면 종료
        if (!foundInBatch && batch === 0) {
            break;
        }
    }
    
    return detectedUrls;
}

// 이미지 모달 열기
async function openImageModalWithAutoDetect(indicatorNum) {
    currentIndicatorNum = indicatorNum;
    const modal = document.getElementById('imageModal');
    const loading = document.getElementById('loading');
    const imageError = document.getElementById('imageError');
    const modalImg = document.getElementById('modalImage');
    
    modal.style.display = "block";
    loading.style.display = "block";
    loading.textContent = "이미지 검색 중... (jpg, jpeg, png 지원)";
    modalImg.style.display = "none";
    imageError.style.display = "none";
    
    currentImages = await detectAllImages(indicatorNum);
    validImageUrls = [...currentImages];
    
    if (currentImages.length === 0) {
        loading.style.display = "none";
        imageError.textContent = "평가지표 이미지를 찾을 수 없습니다.\n(지원 확장자: jpg, jpeg, png)";
        imageError.style.display = "block";
        return;
    }
    
    currentImageIndex = 0;
    currentZoom = 1;
    
    // 첫 번째 이미지 로드
    loadImage(0);
    
    // 나머지 이미지들을 백그라운드에서 미리 로드
    preloadImages();
}

// 이미지 미리 로드 (백그라운드)
function preloadImages() {
    // 첫 번째는 이미 로드했으므로 2번째부터
    for (let i = 1; i < currentImages.length; i++) {
        const img = new Image();
        img.src = currentImages[i];
    }
}

function showDownloadStatus(message, type, showProgress = false) {
    const status = document.getElementById('downloadStatus');
    const statusText = document.getElementById('downloadStatusText');
    const progressBar = document.getElementById('progressBar');
    
    statusText.textContent = message;
    status.className = 'download-status ' + type;
    progressBar.style.display = showProgress ? 'block' : 'none';
    status.style.display = 'block';
    
    if (!showProgress) {
        setTimeout(() => {
            status.style.display = 'none';
        }, 3000);
    }
}

function updateProgress(current, total) {
    const progressFill = document.getElementById('progressFill');
    const percent = (current / total) * 100;
    progressFill.style.width = percent + '%';
    
    const statusText = document.getElementById('downloadStatusText');
    statusText.textContent = `다운로드 중... (${current}/${total})`;
}

async function loadImage(index) {
    const modalImg = document.getElementById('modalImage');
    const loading = document.getElementById('loading');
    const imageError = document.getElementById('imageError');
    
    loading.style.display = "block";
    loading.textContent = "이미지 로딩 중...";
    modalImg.style.display = "none";
    imageError.style.display = "none";
    
    modalImg.src = currentImages[index];
    currentZoom = 1;
    modalImg.style.transform = 'scale(1)';
    
    modalImg.onload = function() {
        loading.style.display = "none";
        modalImg.style.display = "block";
        updateCounter();
        updateDownloadAllButton();
    };
    
    modalImg.onerror = function() {
        loading.style.display = "none";
        imageError.style.display = "block";
    };
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = currentImages.length - 1;
    } else if (currentImageIndex >= currentImages.length) {
        currentImageIndex = 0;
    }
    
    loadImage(currentImageIndex);
}

function updateCounter() {
    document.getElementById('imageCounter').textContent = 
        `${currentImageIndex + 1} / ${currentImages.length}`;
}

function updateDownloadAllButton() {
    const btn = document.getElementById('downloadAllBtn');
    if (validImageUrls.length > 1) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
}

function zoomIn() {
    currentZoom += 0.2;
    if (currentZoom > 3) currentZoom = 3;
    document.getElementById('modalImage').style.transform = `scale(${currentZoom})`;
}

function zoomOut() {
    currentZoom -= 0.2;
    if (currentZoom < 0.5) currentZoom = 0.5;
    document.getElementById('modalImage').style.transform = `scale(${currentZoom})`;
}

function resetZoom() {
    currentZoom = 1;
    document.getElementById('modalImage').style.transform = 'scale(1)';
}

async function downloadCurrentImage() {
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.disabled = true;
    downloadBtn.textContent = '다운로드 중...';
    
    try {
        const imageUrl = currentImages[currentImageIndex];
        await downloadSingleImage(imageUrl);
        showDownloadStatus('✅ 이미지 다운로드 완료!', 'success');
    } catch (error) {
        console.error('다운로드 오류:', error);
        showDownloadStatus('❌ 다운로드 실패', 'error');
        window.open(currentImages[currentImageIndex], '_blank');
    } finally {
        downloadBtn.disabled = false;
        downloadBtn.textContent = '⬇ 현재 이미지';
    }
}

async function downloadSingleImage(imageUrl) {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Failed to fetch');
    
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    const urlParts = imageUrl.split('/');
    const encodedFilename = urlParts[urlParts.length - 1];
    const filename = decodeURIComponent(encodedFilename);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
}

async function downloadAllImages() {
    const downloadAllBtn = document.getElementById('downloadAllBtn');
    downloadAllBtn.disabled = true;
    downloadAllBtn.textContent = '압축 중...';
    
    try {
        showDownloadStatus('ZIP 파일 생성 중...', 'progress', true);
        
        const zip = new JSZip();
        const total = validImageUrls.length;
        
        for (let i = 0; i < validImageUrls.length; i++) {
            const imageUrl = validImageUrls[i];
            updateProgress(i + 1, total);
            
            try {
                const response = await fetch(imageUrl);
                if (!response.ok) continue;
                
                const blob = await response.blob();
                const urlParts = imageUrl.split('/');
                const encodedFilename = urlParts[urlParts.length - 1];
                const filename = decodeURIComponent(encodedFilename);
                
                zip.file(filename, blob);
            } catch (error) {
                console.error(`이미지 ${i + 1} 다운로드 실패:`, error);
            }
        }
        
        showDownloadStatus('ZIP 파일 생성 중...', 'progress', false);
        
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const zipUrl = window.URL.createObjectURL(zipBlob);
        
        const zipFilename = `평가지표_${currentIndicatorNum}_전체.zip`;
        
        const link = document.createElement('a');
        link.href = zipUrl;
        link.download = zipFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(zipUrl);
        
        showDownloadStatus(`✅ ${validImageUrls.length}개 이미지 다운로드 완료!`, 'success');
    } catch (error) {
        console.error('전체 다운로드 오류:', error);
        showDownloadStatus('❌ 다운로드 실패', 'error');
    } finally {
        downloadAllBtn.disabled = false;
        downloadAllBtn.textContent = '📦 전체 다운로드';
    }
}

function closeImageModal() {
    document.getElementById('imageModal').style.display = "none";
}

function scrollToTask(taskId) {
    closeCycleModal();
    const taskRow = document.getElementById(taskId);
    if (taskRow) {
        taskRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        taskRow.classList.add('highlighted');
        setTimeout(() => taskRow.classList.remove('highlighted'), 2000);
    }
}

function showCycleTasks(cycle) {
    const modal = document.getElementById('cycleModal');
    const title = document.getElementById('cycleModalTitle');
    const badge = document.getElementById('cycleBadge');
    const taskList = document.getElementById('cycleTaskList');
    
    title.textContent = '업무 목록';
    badge.textContent = cycle;
    badge.style.backgroundColor = colors[cycle] || '#F0F0F0';
    
    const tasks = [];
    document.querySelectorAll('tr[data-base-cycle]').forEach(row => {
        const baseCycle = row.getAttribute('data-base-cycle');
        const fullCycle = row.getAttribute('data-cycle');
        
        if (baseCycle === cycle || fullCycle === cycle) {
            const task = row.querySelector('.task-cell').innerHTML;
            const note = row.querySelector('.note-cell').textContent;
            const section = row.getAttribute('data-section');
            const taskId = row.id;
            tasks.push({ task, note, section, taskId });
        }
    });
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<p style="text-align: center; color: #999;">해당 주기의 업무가 없습니다.</p>';
    } else {
        taskList.innerHTML = tasks.map(t => `
            <div class="cycle-task-item" onclick="scrollToTask('${t.taskId}')">
                <div class="cycle-task-title">${t.task}</div>
                <div class="cycle-task-note">${t.note}</div>
                <div class="cycle-task-section">📍 ${t.section}</div>
            </div>
        `).join('');
    }
    
    modal.style.display = "block";
}

function closeCycleModal() {
    document.getElementById('cycleModal').style.display = "none";
}

// 키보드 이벤트
document.addEventListener('keydown', function(event) {
    const imageModal = document.getElementById('imageModal');
    
    if (imageModal.style.display === 'block') {
        if (event.key === 'Escape') {
            closeImageModal();
        } else if (event.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (event.key === 'ArrowRight') {
            changeImage(1);
        } else if (event.key === '+' || event.key === '=') {
            zoomIn();
        } else if (event.key === '-' || event.key === '_') {
            zoomOut();
        }
    } else if (event.key === 'Escape') {
        closeCycleModal();
    }
});

// 클릭 이벤트
window.onclick = function(event) {
    const imageModal = document.getElementById('imageModal');
    const cycleModal = document.getElementById('cycleModal');
    if (event.target === imageModal) closeImageModal();
    if (event.target === cycleModal) closeCycleModal();
}