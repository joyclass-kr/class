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

    // State
    let currentDate = new Date();
    let rosterData = [];

    // --- Initialization ---
    function init() {
        dashboardDate.value = formatDate(currentDate);
        
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
        }
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
