// 업무 관리 어드민 JavaScript (읽기 전용)

let allStaffData = {};
let missingTasksData = {};

// 직원 목록
const staffList = [
    '민희진',
    '최선웅',
    '물리치료사',
    '간호조무사',
    '행정실장'
];

// 데이터 로드
async function loadAllData() {
    console.log('📂 전체 데이터 로드 시작...');
    
    try {
        // 직원 데이터 로드
        for (const staff of staffList) {
            try {
                const response = await fetch(`data/${staff}.json`);
                if (response.ok) {
                    allStaffData[staff] = await response.json();
                    console.log(`✅ ${staff} 데이터 로드 완료`);
                } else {
                    console.error(`❌ ${staff} 데이터 로드 실패`);
                    allStaffData[staff] = [];
                }
            } catch (error) {
                console.error(`❌ ${staff} 로드 오류:`, error);
                allStaffData[staff] = [];
            }
        }
        
        // 누락 업무 데이터 로드
        try {
            const missingResponse = await fetch('missing-tasks.json');
            if (missingResponse.ok) {
                missingTasksData = await missingResponse.json();
                console.log('✅ 누락 업무 데이터 로드 완료');
                loadMissingTasks();
            } else {
                console.error('❌ 누락 업무 데이터 로드 실패');
            }
        } catch (error) {
            console.error('❌ 누락 업무 로드 오류:', error);
        }
        
        // UI 업데이트
        updateOverview();
        updateStaffSelects();
        
        console.log('✅ 전체 데이터 로드 완료');
    } catch (error) {
        console.error('❌ 데이터 로드 중 오류:', error);
        alert('데이터를 불러오는데 실패했습니다.');
    }
}

// 전체 개요 업데이트
function updateOverview() {
    const loading = document.getElementById('overviewLoading');
    const content = document.getElementById('overviewContent');
    
    loading.style.display = 'none';
    content.style.display = 'block';
    
    let html = '<div class="staff-grid">';
    
    for (const staff of staffList) {
        const data = allStaffData[staff] || [];
        let taskCount = 0;
        
        data.forEach(section => {
            taskCount += section.data.length;
        });
        
        html += `
            <div class="staff-card">
                <div class="staff-name">${staff}</div>
                <div class="staff-count">📋 ${taskCount}개 업무</div>
            </div>
        `;
    }
    
    html += '</div>';
    content.innerHTML = html;
}

// 직원 선택 업데이트
function updateStaffSelects() {
    const select = document.getElementById('viewStaffSelect');
    
    if (select) {
        staffList.forEach(staff => {
            const option = document.createElement('option');
            option.value = staff;
            option.textContent = staff;
            select.appendChild(option);
        });
    }
}

// 직원 업무 보기 로드
function loadStaffView() {
    const staff = document.getElementById('viewStaffSelect').value;
    const container = document.getElementById('viewContent');
    
    if (!staff) {
        container.innerHTML = '';
        return;
    }
    
    let data = allStaffData[staff] || [];
    
    if (data.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <p>등록된 업무가 없습니다.</p>
            </div>
        `;
        return;
    }
    
    // 평가지표 번호 추출
    const extractIndicatorNumber = (title) => {
        const match = title.match(/평가지표\s*(\d+)/);
        return match ? match[1] : null;
    };
    
    // 평가지표 오름차순 정렬
    data.sort((a, b) => {
        const numA = extractIndicatorNumber(a.title);
        const numB = extractIndicatorNumber(b.title);
        
        if (!numA && !numB) return 0;
        if (!numA) return 1;
        if (!numB) return -1;
        
        return parseInt(numA) - parseInt(numB);
    });
    
    let html = '';
    
    data.forEach(section => {
        html += `
            <div class="task-section">
                <div class="task-section-title">${section.title}</div>
        `;
        
        section.data.forEach(task => {
            html += `
                <div class="task-item">
                    <div class="task-title">${task.task}</div>
                    <div class="task-meta">
                        ${task.note ? `📌 ${task.note} | ` : ''}
                        🔄 ${task.cycle}
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
    });
    
    container.innerHTML = html;
}

// 누락 업무 로드
function loadMissingTasks() {
    const loading = document.getElementById('missingLoading');
    const content = document.getElementById('missingContent');
    
    if (!loading || !content) return;
    
    loading.style.display = 'none';
    content.style.display = 'block';
    
    let html = '';
    let totalTasks = 0;
    
    // 각 직원별 누락 업무 표시
    for (const [staffName, sections] of Object.entries(missingTasksData)) {
        const taskCount = sections.reduce((sum, section) => sum + section.data.length, 0);
        totalTasks += taskCount;
        
        html += `
            <div class="missing-staff-section">
                <div class="missing-staff-header">
                    <div class="missing-staff-name">${staffName}</div>
                    <div class="missing-count">${taskCount}개 업무</div>
                </div>
        `;
        
        sections.forEach((section) => {
            section.data.forEach((task) => {
                html += `
                    <div class="missing-task-item">
                        <div class="missing-task-title">${task.task}</div>
                        <div class="missing-task-meta">
                            ${task.note ? `📌 ${task.note} | ` : ''}
                            🔄 ${task.cycle}
                        </div>
                    </div>
                `;
            });
        });
        
        html += '</div>';
    }
    
    if (totalTasks === 0) {
        html = `
            <div class="empty-state">
                <div class="empty-icon">✅</div>
                <p>누락된 업무가 없습니다!</p>
            </div>
        `;
    }
    
    content.innerHTML = html;
}

// 탭 전환
function switchTab(event, tabName) {
    // 모든 탭 버튼 비활성화
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 모든 탭 콘텐츠 숨김
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // 선택된 탭 활성화
    event.target.classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
}
