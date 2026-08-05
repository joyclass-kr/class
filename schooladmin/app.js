document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const schoolNameTitle = document.getElementById('schoolNameTitle');
    const signOutButton = document.getElementById('signOutButton');
    
    // Tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Dashboard Tab
    const dashboardDate = document.getElementById('dashboardDate');
    const prevDateBtn = document.getElementById('prevDateBtn');
    const nextDateBtn = document.getElementById('nextDateBtn');
    const refreshDashboardBtn = document.getElementById('refreshDashboardBtn');
    const dashboardLoading = document.getElementById('dashboardLoading');
    const dashboardError = document.getElementById('dashboardError');
    const dashboardContent = document.getElementById('dashboardContent');
    const dashboardTableBody = document.getElementById('dashboardTableBody');
    const dashboardTableFoot = document.getElementById('dashboardTableFoot');
    
    const countTotal = document.getElementById('totalStudentsCount');
    const countAbsence = document.getElementById('totalAbsenceCount');
    const countTardy = document.getElementById('totalTardyCount');
    const countEarly = document.getElementById('totalEarlyCount');

    // Roster Tab
    const rosterSearch = document.getElementById('rosterSearch');
    const rosterLoading = document.getElementById('rosterLoading');
    const rosterError = document.getElementById('rosterError');
    const rosterContent = document.getElementById('rosterContent');
    const rosterTableBody = document.getElementById('rosterTableBody');

    // Annual Schedules Tab
    const addAnnualScheduleForm = document.getElementById('addAnnualScheduleForm');
    const annualDateInput = document.getElementById('annualDateInput');
    const annualTitleInput = document.getElementById('annualTitleInput');
    const annualCategorySelect = document.getElementById('annualCategorySelect');
    const annualTargetScopeSelect = document.getElementById('annualTargetScopeSelect');
    const gradeSelectionRow = document.getElementById('gradeSelectionRow');
    const annualDetailsInput = document.getElementById('annualDetailsInput');
    const annualSearchInput = document.getElementById('annualSearchInput');
    const annualYearSelect = document.getElementById('annualYearSelect');
    const annualLoading = document.getElementById('annualLoading');
    const annualError = document.getElementById('annualError');
    const annualContent = document.getElementById('annualContent');
    const annualTableBody = document.getElementById('annualTableBody');

    // State
    let currentDate = new Date();
    let rosterData = [];
    let annualSchedulesData = [];

    // --- Initialization ---
    function init() {
        dashboardDate.value = formatDate(currentDate);
        if (annualDateInput) annualDateInput.value = formatDate(currentDate);
        
        // Event Listeners
        signOutButton.addEventListener('click', () => {
            if (window.google?.accounts?.id) {
                window.google.accounts.id.disableAutoSelect();
            }
            api('/api/auth/signout', { method: 'POST' }).then(() => {
                location.href = '/';
            });
        });

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => switchTab(btn.dataset.tab));
        });

        prevDateBtn.addEventListener('click', () => changeDate(-1));
        nextDateBtn.addEventListener('click', () => changeDate(1));
        dashboardDate.addEventListener('change', (e) => {
            currentDate = new Date(e.target.value);
            loadDashboard();
        });
        refreshDashboardBtn.addEventListener('click', loadDashboard);

        rosterSearch.addEventListener('input', renderRosterTable);

        // Annual Schedule Listeners
        if (annualTargetScopeSelect) {
            annualTargetScopeSelect.addEventListener('change', (e) => {
                gradeSelectionRow.hidden = e.target.value !== 'GRADE';
            });
        }
        if (addAnnualScheduleForm) {
            addAnnualScheduleForm.addEventListener('submit', handleAddAnnualSchedule);
        }
        if (annualSearchInput) {
            annualSearchInput.addEventListener('input', renderAnnualSchedulesTable);
        }
        if (annualYearSelect) {
            annualYearSelect.addEventListener('change', loadAnnualSchedules);
        }

        // Initial Load
        loadDashboard();
    }

    // --- Tab Logic ---
    function switchTab(tabId) {
        tabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
        tabContents.forEach(content => {
            content.hidden = content.id !== `${tabId}Tab`;
        });

        if (tabId === 'roster' && rosterData.length === 0) {
            loadRoster();
        } else if (tabId === 'annual' && annualSchedulesData.length === 0) {
            loadAnnualSchedules();
        }
    }

    // --- Annual Schedule Logic ---
    async function loadAnnualSchedules() {
        if (!annualLoading) return;
        annualLoading.hidden = false;
        annualError.hidden = true;
        annualContent.hidden = true;

        try {
            const year = annualYearSelect ? annualYearSelect.value : new Date().getFullYear();
            const res = await api(`/api/school-admin/annual-schedules?academicYear=${year}`);
            annualSchedulesData = res.schedules || [];
            renderAnnualSchedulesTable();
            annualLoading.hidden = true;
            annualContent.hidden = false;
        } catch (error) {
            annualLoading.hidden = true;
            annualError.textContent = error.message || '학사일정을 불러오지 못했습니다.';
            annualError.hidden = false;
        }
    }

    function renderAnnualSchedulesTable() {
        if (!annualTableBody) return;
        const query = (annualSearchInput ? annualSearchInput.value : '').trim().toLowerCase();

        const filtered = annualSchedulesData.filter(item => {
            if (!query) return true;
            return item.title.toLowerCase().includes(query) ||
                   item.event_date.includes(query) ||
                   (item.details && item.details.toLowerCase().includes(query));
        });

        annualTableBody.innerHTML = '';

        const categoryLabels = {
            EVENT: '🏫 일반 행사',
            HOLIDAY: '🔴 휴업/공휴일',
            TRIP: '🚌 체험/수련',
            EXAM: '📝 평가/시험'
        };

        filtered.forEach(item => {
            const tr = document.createElement('tr');
            let targetText = '🏢 전교 공통';
            if (item.target_scope === 'GRADE') {
                const grades = Array.isArray(item.target_grades) ? item.target_grades.sort().join(', ') : '';
                targetText = `🏫 ${grades}학년`;
            }

            tr.innerHTML = `
                <td style="font-weight:600;">${item.event_date}</td>
                <td><span class="badge category-${item.category.toLowerCase()}">${categoryLabels[item.category] || item.category}</span></td>
                <td><span class="badge scope-${item.target_scope.toLowerCase()}">${targetText}</span></td>
                <td style="font-weight:600;">${escapeHtml(item.title)}</td>
                <td>${escapeHtml(item.details || '-')}</td>
                <td>
                    <button class="delete-schedule-btn text-button danger" data-id="${item.id}">삭제</button>
                </td>
            `;
            annualTableBody.appendChild(tr);
        });

        if (filtered.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="6">등록된 학사일정이 없습니다.</td>`;
            annualTableBody.appendChild(tr);
        }

        // Attach delete listeners
        annualTableBody.querySelectorAll('.delete-schedule-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteAnnualSchedule(btn.dataset.id));
        });
    }

    async function handleAddAnnualSchedule(e) {
        e.preventDefault();
        const date = annualDateInput.value;
        const title = annualTitleInput.value.trim();
        const category = annualCategorySelect.value;
        const targetScope = annualTargetScopeSelect.value;
        const details = annualDetailsInput.value.trim();
        const academicYear = Number(annualYearSelect ? annualYearSelect.value : new Date().getFullYear());

        let targetGrades = [];
        if (targetScope === 'GRADE') {
            const checkboxes = addAnnualScheduleForm.querySelectorAll('input[name="targetGrade"]:checked');
            targetGrades = Array.from(checkboxes).map(cb => Number(cb.value));
            if (targetGrades.length === 0) {
                alert('적용 대상 학년을 최소 1개 이상 선택해 주세요.');
                return;
            }
        }

        try {
            await api('/api/school-admin/annual-schedules', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    academicYear,
                    date,
                    title,
                    category,
                    targetScope,
                    targetGrades,
                    details
                })
            });

            annualTitleInput.value = '';
            annualDetailsInput.value = '';
            await loadAnnualSchedules();
        } catch (error) {
            alert(error.message || '일정을 등록하지 못했습니다.');
        }
    }

    async function deleteAnnualSchedule(scheduleId) {
        if (!confirm('정말 이 학사일정을 삭제하시겠습니까?')) return;
        try {
            await api(`/api/school-admin/annual-schedules/${scheduleId}`, { method: 'DELETE' });
            await loadAnnualSchedules();
        } catch (error) {
            alert(error.message || '일정을 삭제하지 못했습니다.');
        }
    }

    function escapeHtml(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    // --- Date Helpers ---
    function formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    function changeDate(days) {
        currentDate.setDate(currentDate.getDate() + days);
        dashboardDate.value = formatDate(currentDate);
        loadDashboard();
    }

    // --- Dashboard Logic ---
    async function loadDashboard() {
        dashboardLoading.hidden = false;
        dashboardError.hidden = true;
        dashboardContent.hidden = true;

        try {
            const dateStr = dashboardDate.value;
            const res = await api(`/api/school-admin/dashboard?date=${dateStr}`);
            
            schoolNameTitle.textContent = res.schoolName + " 관리자";
            renderDashboard(res.roster, res.notices, res.formalNotes);
            
            dashboardLoading.hidden = true;
            dashboardContent.hidden = false;
        } catch (error) {
            dashboardLoading.hidden = true;
            dashboardError.textContent = error.message;
            dashboardError.hidden = false;
            
            if (error.status === 401 || error.status === 403) {
                setTimeout(() => location.href = '/', 2000);
            }
        }
    }

    function renderDashboard(roster, notices, formalNotes) {
        dashboardTableBody.innerHTML = '';
        
        let sumTotal = 0, sumPresent = 0, sumAbsence = 0, sumTardy = 0, sumEarly = 0;

        // Group data by grade-class
        const classMap = new Map();

        roster.forEach(r => {
            const key = `${r.grade}-${r.class_number}`;
            classMap.set(key, {
                grade: r.grade,
                classNum: r.class_number,
                total: parseInt(r.total_students, 10),
                absence: 0,
                tardy: 0,
                early: 0
            });
        });

        // Add absence notices
        notices.forEach(n => {
            const key = `${n.grade}-${n.class_number}`;
            if (!classMap.has(key)) return;
            const c = classMap.get(key);
            const count = parseInt(n.count, 10);
            if (n.notice_type === '결석') c.absence += count;
            else if (n.notice_type === '지각') c.tardy += count;
            else if (n.notice_type === '조퇴') c.early += count;
        });

        // Add formal absence notes (long term absences)
        formalNotes.forEach(f => {
            const key = `${f.grade}-${f.class_number}`;
            if (!classMap.has(key)) return;
            const c = classMap.get(key);
            c.absence += parseInt(f.count, 10);
        });

        // Render rows
        const sortedKeys = Array.from(classMap.keys()).sort((a, b) => {
            const [gA, cA] = a.split('-').map(Number);
            const [gB, cB] = b.split('-').map(Number);
            if (gA !== gB) return gA - gB;
            return cA - cB;
        });

        sortedKeys.forEach(key => {
            const c = classMap.get(key);
            const present = c.total - c.absence;
            
            sumTotal += c.total;
            sumPresent += present;
            sumAbsence += c.absence;
            sumTardy += c.tardy;
            sumEarly += c.early;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${c.grade}학년 ${c.classNum}반</td>
                <td>${c.total}</td>
                <td>${present}</td>
                <td class="${c.absence > 0 ? 'status-warning' : 'status-normal'}">${c.absence}</td>
                <td class="${c.tardy > 0 ? 'status-info' : 'status-normal'}">${c.tardy}</td>
                <td class="${c.early > 0 ? 'status-info' : 'status-normal'}">${c.early}</td>
            `;
            dashboardTableBody.appendChild(tr);
        });

        if (sortedKeys.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="6">등록된 학급이 없습니다.</td>`;
            dashboardTableBody.appendChild(tr);
        }

        // Render Footer (Totals)
        dashboardTableFoot.innerHTML = `
            <tr>
                <td>총계</td>
                <td>${sumTotal}</td>
                <td>${sumPresent}</td>
                <td class="${sumAbsence > 0 ? 'status-warning' : ''}">${sumAbsence}</td>
                <td class="${sumTardy > 0 ? 'status-info' : ''}">${sumTardy}</td>
                <td class="${sumEarly > 0 ? 'status-info' : ''}">${sumEarly}</td>
            </tr>
        `;

        // Render Summary Cards
        countTotal.textContent = sumTotal;
        countAbsence.textContent = sumAbsence;
        countTardy.textContent = sumTardy;
        countEarly.textContent = sumEarly;
    }

    // --- Roster Logic ---
    async function loadRoster() {
        rosterLoading.hidden = false;
        rosterError.hidden = true;
        rosterContent.hidden = true;

        try {
            const res = await api('/api/school-admin/students');
            rosterData = res.students;
            renderRosterTable();
            
            rosterLoading.hidden = true;
            rosterContent.hidden = false;
        } catch (error) {
            rosterLoading.hidden = true;
            rosterError.textContent = error.message;
            rosterError.hidden = false;
        }
    }

    function renderRosterTable() {
        const query = rosterSearch.value.trim().toLowerCase();
        
        const filtered = rosterData.filter(s => {
            if (!query) return true;
            return s.name.toLowerCase().includes(query) || 
                   `${s.grade}학년`.includes(query) ||
                   `${s.class_number}반`.includes(query);
        });

        rosterTableBody.innerHTML = '';
        
        filtered.forEach(s => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${s.grade}</td>
                <td>${s.class_number}</td>
                <td>${s.student_number}</td>
                <td style="font-weight: 600;">${s.name}</td>
            `;
            rosterTableBody.appendChild(tr);
        });

        if (filtered.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="4">검색 결과가 없습니다.</td>`;
            rosterTableBody.appendChild(tr);
        }
    }

    // Start
    init();
});
