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

    // Annual Calendar Tab
    const calculatedSchoolDaysVal = document.getElementById('calculatedSchoolDaysVal');
    const schoolDaysStatusBadge = document.getElementById('schoolDaysStatusBadge');
    const totalHolidaysVal = document.getElementById('totalHolidaysVal');
    const totalEventsVal = document.getElementById('totalEventsVal');

    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    const calendarMonthTitle = document.getElementById('calendarMonthTitle');
    const annualCalendarGrid = document.getElementById('annualCalendarGrid');

    const addAnnualScheduleForm = document.getElementById('addAnnualScheduleForm');
    const annualDateInput = document.getElementById('annualDateInput');
    const annualTitleInput = document.getElementById('annualTitleInput');
    const annualCategorySelect = document.getElementById('annualCategorySelect');
    const annualTargetScopeSelect = document.getElementById('annualTargetScopeSelect');
    const gradeSelectionRow = document.getElementById('gradeSelectionRow');
    const annualDetailsInput = document.getElementById('annualDetailsInput');
    const annualYearSelect = document.getElementById('annualYearSelect');
    const annualLoading = document.getElementById('annualLoading');
    const annualError = document.getElementById('annualError');
    const annualContent = document.getElementById('annualContent');
    const annualTableBody = document.getElementById('annualTableBody');

    // Curriculum Hours Tab
    const curriculumGradeSelect = document.getElementById('curriculumGradeSelect');
    const curriculumTableBody = document.getElementById('curriculumTableBody');
    const curriculumTableFoot = document.getElementById('curriculumTableFoot');
    const saveCurriculumBtn = document.getElementById('saveCurriculumBtn');

    // Master Timetable Grid Tab
    const timetableGradeSelect = document.getElementById('timetableGradeSelect');
    const subjectPalette = document.getElementById('subjectPalette');
    const timetableMatrixBody = document.getElementById('timetableMatrixBody');
    const saveTimetableBtn = document.getElementById('saveTimetableBtn');

    // State
    let currentDate = new Date();
    let selectedAcademicYear = 2026;
    let currentCalYear = 2026;
    let currentCalMonth = 3; // March start for Academic Year
    let rosterData = [];
    let annualSchedulesData = [];
    let activePaletteSubject = '국어';

    const DEFAULT_SUBJECTS = [
        { name: '국어', weekly: 6, annual: 204, category: 'SUBJECT' },
        { name: '수학', weekly: 4, annual: 136, category: 'SUBJECT' },
        { name: '사회', weekly: 3, annual: 102, category: 'SUBJECT' },
        { name: '과학', weekly: 3, annual: 102, category: 'SUBJECT' },
        { name: '도덕', weekly: 1, annual: 34, category: 'SUBJECT' },
        { name: '체육', weekly: 3, annual: 102, category: 'SUBJECT' },
        { name: '음악', weekly: 2, annual: 68, category: 'SUBJECT' },
        { name: '미술', weekly: 2, annual: 68, category: 'SUBJECT' },
        { name: '영어', weekly: 2, annual: 68, category: 'SUBJECT' },
        { name: '창체(자율)', weekly: 1, annual: 34, category: 'CHANGTAE' },
        { name: '창체(동아리)', weekly: 1, annual: 34, category: 'CHANGTAE' },
        { name: '창체(봉사)', weekly: 1, annual: 10, category: 'CHANGTAE' },
        { name: '창체(진로)', weekly: 1, annual: 24, category: 'CHANGTAE' }
    ];

    const PALETTE_SUBJECTS = ['국어', '수학', '사회', '과학', '도덕', '체육', '음악', '미술', '영어', '창체', '자율', '동아리', '수업없음'];

    // Timetable grid state: { "day_period": "국어" }
    let timetableMatrixData = {};

    // --- Initialization ---
    function init() {
        dashboardDate.value = formatDate(currentDate);
        if (annualDateInput) annualDateInput.value = formatDate(currentDate);

        // Sign Out
        signOutButton.addEventListener('click', () => {
            if (window.google?.accounts?.id) {
                window.google.accounts.id.disableAutoSelect();
            }
            api('/api/auth/signout', { method: 'POST' }).then(() => {
                location.href = '/';
            });
        });

        // Tab Switching
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => switchTab(btn.dataset.tab));
        });

        // Dashboard Listeners
        prevDateBtn.addEventListener('click', () => changeDate(-1));
        nextDateBtn.addEventListener('click', () => changeDate(1));
        dashboardDate.addEventListener('change', (e) => {
            currentDate = new Date(e.target.value);
            loadDashboard();
        });
        refreshDashboardBtn.addEventListener('click', loadDashboard);

        // Roster Search
        if (rosterSearch) rosterSearch.addEventListener('input', renderRosterTable);

        // Annual Calendar & Schedules Listeners
        if (prevMonthBtn) prevMonthBtn.addEventListener('click', () => changeMonth(-1));
        if (nextMonthBtn) nextMonthBtn.addEventListener('click', () => changeMonth(1));
        if (annualYearSelect) {
            annualYearSelect.addEventListener('change', (e) => {
                selectedAcademicYear = Number(e.target.value);
                currentCalYear = selectedAcademicYear;
                currentCalMonth = 3;
                loadAnnualSchedules();
            });
        }
        if (annualTargetScopeSelect) {
            annualTargetScopeSelect.addEventListener('change', (e) => {
                gradeSelectionRow.hidden = e.target.value !== 'GRADE';
            });
        }
        if (addAnnualScheduleForm) {
            addAnnualScheduleForm.addEventListener('submit', handleAddAnnualSchedule);
        }

        // Curriculum Hours Listeners
        if (curriculumGradeSelect) curriculumGradeSelect.addEventListener('change', loadCurriculumHours);
        if (saveCurriculumBtn) saveCurriculumBtn.addEventListener('click', saveCurriculumHours);

        // Timetable Grid Listeners
        if (timetableGradeSelect) timetableGradeSelect.addEventListener('change', loadMasterTimetable);
        if (saveTimetableBtn) saveTimetableBtn.addEventListener('click', saveMasterTimetable);

        renderSubjectPalette();

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
        } else if (tabId === 'annual') {
            loadAnnualSchedules();
        } else if (tabId === 'curriculum') {
            loadCurriculumHours();
        } else if (tabId === 'timetable') {
            loadMasterTimetable();
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
            
            schoolNameTitle.textContent = res.schoolName + " 관리자 & 교육과정 포털";
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
        const classMap = new Map();

        roster.forEach(r => {
            const key = `${r.grade}-${r.class_number}`;
            classMap.set(key, {
                grade: r.grade,
                classNum: r.class_number,
                total: parseInt(r.total_students, 10),
                absence: 0, tardy: 0, early: 0
            });
        });

        notices.forEach(n => {
            const key = `${n.grade}-${n.class_number}`;
            if (!classMap.has(key)) return;
            const c = classMap.get(key);
            if (n.notice_type === '결석') c.absence += parseInt(n.count, 10);
            else if (n.notice_type === '지각') c.tardy += parseInt(n.count, 10);
            else if (n.notice_type === '조퇴') c.early += parseInt(n.count, 10);
        });

        formalNotes.forEach(fn => {
            const key = `${fn.grade}-${fn.class_number}`;
            if (!classMap.has(key)) return;
            const c = classMap.get(key);
            c.absence += parseInt(fn.count, 10);
        });

        const sortedClasses = Array.from(classMap.values()).sort((a, b) => {
            if (a.grade !== b.grade) return a.grade - b.grade;
            return a.classNum - b.classNum;
        });

        sortedClasses.forEach(c => {
            const present = Math.max(0, c.total - c.absence);
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

        countTotal.textContent = sumTotal;
        countAbsence.textContent = sumAbsence;
        countTardy.textContent = sumTardy;
        countEarly.textContent = sumEarly;
    }

    // --- Annual Calendar & Schedules Logic ---
    function changeMonth(delta) {
        currentCalMonth += delta;
        if (currentCalMonth > 12) {
            currentCalMonth = 1;
            currentCalYear += 1;
        } else if (currentCalMonth < 1) {
            currentCalMonth = 12;
            currentCalYear -= 1;
        }
        renderCalendarGrid();
    }

    async function loadAnnualSchedules() {
        if (!annualLoading) return;
        annualLoading.hidden = false;
        annualError.hidden = true;
        annualContent.hidden = true;

        try {
            const res = await api(`/api/school-admin/annual-schedules?academicYear=${selectedAcademicYear}`);
            annualSchedulesData = res.schedules || [];
            
            renderCalendarGrid();
            renderAnnualSchedulesTable();
            calculateSchoolDaysAudit();

            annualLoading.hidden = true;
            annualContent.hidden = false;
        } catch (error) {
            annualLoading.hidden = true;
            annualError.textContent = error.message || '학사일정을 불러오지 못했습니다.';
            annualError.hidden = false;
        }
    }

    function renderCalendarGrid() {
        if (!annualCalendarGrid) return;

        const isSecondSemester = currentCalMonth >= 8 || currentCalMonth <= 2;
        const semesterLabel = currentCalMonth >= 3 && currentCalMonth <= 7 ? '1학기' : '2학기';
        calendarMonthTitle.textContent = `${currentCalYear}년 ${currentCalMonth}월 (${semesterLabel})`;

        annualCalendarGrid.innerHTML = '';

        const firstDay = new Date(currentCalYear, currentCalMonth - 1, 1);
        const lastDay = new Date(currentCalYear, currentCalMonth, 0);
        const startDayOfWeek = firstDay.getDay(); // 0: Sun, 6: Sat
        const totalDays = lastDay.getDate();

        // Prev month padding
        const prevMonthLastDay = new Date(currentCalYear, currentCalMonth - 1, 0).getDate();
        for (let i = startDayOfWeek - 1; i >= 0; i--) {
            const cell = document.createElement('div');
            cell.className = 'cal-day-cell other-month';
            cell.innerHTML = `<div class="cal-day-num">${prevMonthLastDay - i}</div>`;
            annualCalendarGrid.appendChild(cell);
        }

        // Current month days
        const eventMap = new Map();
        annualSchedulesData.forEach(item => {
            eventMap.set(item.event_date, item);
        });

        for (let d = 1; d <= totalDays; d++) {
            const monthStr = currentCalMonth < 10 ? `0${currentCalMonth}` : `${currentCalMonth}`;
            const dayStr = d < 10 ? `0${d}` : `${d}`;
            const dateKey = `${currentCalYear}-${monthStr}-${dayStr}`;

            const dateObj = new Date(currentCalYear, currentCalMonth - 1, d);
            const dayOfWeek = dateObj.getDay();

            const cell = document.createElement('div');
            cell.className = 'cal-day-cell';
            if (dayOfWeek === 0) cell.classList.add('sun');
            if (dayOfWeek === 6) cell.classList.add('sat');

            const eventItem = eventMap.get(dateKey);
            if (eventItem && eventItem.category === 'HOLIDAY') {
                cell.classList.add('holiday');
            }

            let eventsHtml = '';
            if (eventItem) {
                const catClass = eventItem.category.toLowerCase();
                const scopeBadge = eventItem.target_scope === 'GRADE' ? `[${eventItem.target_grades.join(',')}학년]` : '';
                eventsHtml = `<div class="cal-event-pill ${catClass}">${scopeBadge} ${escapeHtml(eventItem.title)}</div>`;
            }

            cell.innerHTML = `
                <div class="cal-day-header">
                    <span class="cal-day-num">${d}</span>
                </div>
                <div class="cal-day-events">${eventsHtml}</div>
            `;

            // Click cell to fill form date
            cell.addEventListener('click', () => {
                annualDateInput.value = dateKey;
                annualTitleInput.focus();
            });

            annualCalendarGrid.appendChild(cell);
        }
    }

    const targetSchoolDaysInput = document.getElementById('targetSchoolDaysInput');
    if (targetSchoolDaysInput) {
        targetSchoolDaysInput.addEventListener('input', calculateSchoolDaysAudit);
    }

    function calculateSchoolDaysAudit() {
        const targetDays = Number(targetSchoolDaysInput ? targetSchoolDaysInput.value : 190);
        let totalSchoolDays = 192;
        let totalHolidays = 115;
        let totalEvents = annualSchedulesData.length;

        annualSchedulesData.forEach(item => {
            if (item.category === 'HOLIDAY') {
                totalSchoolDays -= 1;
                totalHolidays += 1;
            }
        });

        if (calculatedSchoolDaysVal) calculatedSchoolDaysVal.textContent = `${totalSchoolDays}일`;
        if (totalHolidaysVal) totalHolidaysVal.textContent = `${totalHolidays}일`;
        if (totalEventsVal) totalEventsVal.textContent = `${totalEvents}일`;

        if (schoolDaysStatusBadge) {
            if (totalSchoolDays >= targetDays) {
                schoolDaysStatusBadge.textContent = `✅ 목표 (${targetDays}일) 충족`;
                schoolDaysStatusBadge.className = 'audit-status status-ok';
            } else {
                schoolDaysStatusBadge.textContent = `⚠️ 목표 대비 ${targetDays - totalSchoolDays}일 부족!`;
                schoolDaysStatusBadge.className = 'audit-status status-warn';
            }
        }
    }

    function renderAnnualSchedulesTable() {
        if (!annualTableBody) return;

        annualTableBody.innerHTML = '';
        const categoryLabels = {
            EVENT: '🏫 일반 행사',
            HOLIDAY: '🔴 휴업/공휴일',
            TRIP: '🚌 체험/수련',
            EXAM: '📝 평가/시험'
        };

        annualSchedulesData.forEach(item => {
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

        if (annualSchedulesData.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="6">등록된 학사일정이 없습니다.</td>`;
            annualTableBody.appendChild(tr);
        }

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
                    academicYear: selectedAcademicYear,
                    date, title, category, targetScope, targetGrades, details
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

    // --- Curriculum Hours Allocation Logic ---
    async function loadCurriculumHours() {
        if (!curriculumTableBody) return;
        const grade = curriculumGradeSelect.value;

        try {
            const res = await api(`/api/school-admin/curriculum-hours?academicYear=${selectedAcademicYear}&grade=${grade}`);
            const savedHours = res.hours || [];
            
            // Merge with defaults
            const hourMap = new Map(savedHours.map(h => [h.subject_name, h]));
            const rowsData = DEFAULT_SUBJECTS.map(def => {
                const saved = hourMap.get(def.name);
                return {
                    name: def.name,
                    weekly: saved ? saved.weekly_hours : def.weekly,
                    annual: saved ? saved.annual_required_hours : def.annual,
                    category: def.category
                };
            });

            renderCurriculumTable(rowsData);
        } catch (error) {
            renderCurriculumTable(DEFAULT_SUBJECTS);
        }
    }

    function renderCurriculumTable(rowsData) {
        curriculumTableBody.innerHTML = '';
        let totalWeekly = 0;
        let totalAnnual = 0;
        let totalCalculated = 0;

        rowsData.forEach(row => {
            const calcAnnual = row.weekly * 34; // 34 weeks per academic year
            const diff = calcAnnual - row.annual;
            totalWeekly += row.weekly;
            totalAnnual += row.annual;
            totalCalculated += calcAnnual;

            let diffClass = 'diff-zero';
            let diffStr = '0 (적정)';
            if (diff > 0) {
                diffClass = 'diff-positive';
                diffStr = `+${diff}시간 (충족)`;
            } else if (diff < 0) {
                diffClass = 'diff-negative';
                diffStr = `${diff}시간 (부족)`;
            }

            const categoryText = row.category === 'CHANGTAE' ? '🎒 창체' : '📖 교과';

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${categoryText}</td>
                <td style="font-weight:700;">${row.name}</td>
                <td><input type="number" class="weekly-input" data-subject="${row.name}" data-category="${row.category}" value="${row.weekly}" min="0" max="20"></td>
                <td><input type="number" class="annual-input" data-subject="${row.name}" data-category="${row.category}" value="${row.annual}" min="0" max="500"></td>
                <td style="font-weight:700;">${calcAnnual}시간</td>
                <td class="${diffClass}">${diffStr}</td>
            `;
            curriculumTableBody.appendChild(tr);
        });

        const totalDiff = totalCalculated - totalAnnual;
        let totalDiffStr = totalDiff >= 0 ? `+${totalDiff}시간` : `${totalDiff}시간`;

        curriculumTableFoot.innerHTML = `
            <tr>
                <td colspan="2">합계</td>
                <td>${totalWeekly}시간/주</td>
                <td>${totalAnnual}시간/년</td>
                <td>${totalCalculated}시간/년</td>
                <td class="${totalDiff >= 0 ? 'diff-positive' : 'diff-negative'}">${totalDiffStr}</td>
            </tr>
        `;

        // Attach live input change handler
        curriculumTableBody.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                const currentData = Array.from(curriculumTableBody.querySelectorAll('tr')).map(tr => {
                    const wInput = tr.querySelector('.weekly-input');
                    const aInput = tr.querySelector('.annual-input');
                    return {
                        name: wInput.dataset.subject,
                        weekly: Number(wInput.value || 0),
                        annual: Number(aInput.value || 0),
                        category: wInput.dataset.category
                    };
                });
                renderCurriculumTable(currentData);
            });
        });
    }

    async function saveCurriculumHours() {
        const grade = curriculumGradeSelect.value;
        const rows = Array.from(curriculumTableBody.querySelectorAll('tr')).map(tr => {
            const wInput = tr.querySelector('.weekly-input');
            const aInput = tr.querySelector('.annual-input');
            return {
                subjectName: wInput.dataset.subject,
                weeklyHours: Number(wInput.value || 0),
                annualRequiredHours: Number(aInput.value || 0),
                category: wInput.dataset.category
            };
        });

        try {
            await api('/api/school-admin/curriculum-hours', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    academicYear: selectedAcademicYear,
                    grade,
                    hours: rows
                })
            });
            alert(`${grade}학년 교과/창체 시수 편제표가 성공적으로 저장되었습니다!`);
        } catch (error) {
            alert(error.message || '시수 편제표를 저장하지 못했습니다.');
        }
    }

    // --- Master Timetable Grid Logic ---
    function renderSubjectPalette() {
        if (!subjectPalette) return;
        subjectPalette.innerHTML = '';

        PALETTE_SUBJECTS.forEach(sub => {
            const chip = document.createElement('div');
            chip.className = 'palette-chip';
            if (sub === activePaletteSubject) chip.classList.add('selected');
            chip.textContent = sub;
            chip.addEventListener('click', () => {
                activePaletteSubject = sub;
                renderSubjectPalette();
            });
            subjectPalette.appendChild(chip);
        });
    }

    async function loadMasterTimetable() {
        if (!timetableMatrixBody) return;
        const grade = timetableGradeSelect.value;

        try {
            const res = await api(`/api/school-admin/master-timetable?academicYear=${selectedAcademicYear}&grade=${grade}&classNumber=0`);
            timetableMatrixData = {};
            (res.timetable || []).forEach(cell => {
                timetableMatrixData[`${cell.day_of_week}_${cell.period}`] = cell.subject_name;
            });
            renderTimetableMatrix();
        } catch (error) {
            timetableMatrixData = {};
            renderTimetableMatrix();
        }
    }

    function renderTimetableMatrix() {
        if (!timetableMatrixBody) return;
        timetableMatrixBody.innerHTML = '';

        // 1 to 6 Periods
        for (let period = 1; period <= 6; period++) {
            const tr = document.createElement('tr');
            let cellsHtml = `<td style="font-weight:800; background:rgba(255,255,255,0.03);">${period}교시</td>`;

            // Mon(1) to Fri(5)
            for (let day = 1; day <= 5; day++) {
                const sub = timetableMatrixData[`${day}_${period}`] || '-';
                const tagHtml = sub !== '-' && sub !== '수업없음' ? `<span class="cell-subject-tag">${escapeHtml(sub)}</span>` : `<span style="color:var(--text-muted);">${sub}</span>`;
                cellsHtml += `<td class="timetable-cell" data-day="${day}" data-period="${period}">${tagHtml}</td>`;
            }

            tr.innerHTML = cellsHtml;
            timetableMatrixBody.appendChild(tr);
        }

        // Cell click handler
        timetableMatrixBody.querySelectorAll('.timetable-cell').forEach(cell => {
            cell.addEventListener('click', () => {
                const day = cell.dataset.day;
                const period = cell.dataset.period;
                timetableMatrixData[`${day}_${period}`] = activePaletteSubject;
                renderTimetableMatrix();
            });
        });
    }

    async function saveMasterTimetable() {
        const grade = timetableGradeSelect.value;
        const cells = [];
        for (let day = 1; day <= 5; day++) {
            for (let period = 1; period <= 6; period++) {
                const sub = timetableMatrixData[`${day}_${period}`] || '';
                cells.push({ dayOfWeek: day, period, subjectName: sub });
            }
        }

        try {
            await api('/api/school-admin/master-timetable', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    academicYear: selectedAcademicYear,
                    grade,
                    classNumber: 0,
                    cells
                })
            });
            alert(`${grade}학년 주간 기본 시간표 그리드가 저장되었습니다!`);
        } catch (error) {
            alert(error.message || '시간표를 저장하지 못했습니다.');
        }
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

    function escapeHtml(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    // Start
    init();
});
