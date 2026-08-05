async function api(path, options = {}) {
    const response = await fetch(path, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        }
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const error = new Error(data.message || '요청을 처리하지 못했습니다.');
        error.status = response.status;
        error.data = data;
        throw error;
    }
    return data;
}

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

    let dynamicPublicHolidays = {};

    async function fetchLivePublicHolidays() {
        try {
            const h1 = await api(`/api/school-admin/public-holidays?year=${selectedAcademicYear}`).catch(() => ({ holidays: [] }));
            const h2 = await api(`/api/school-admin/public-holidays?year=${selectedAcademicYear + 1}`).catch(() => ({ holidays: [] }));
            
            dynamicPublicHolidays = { ...KOREAN_NATIONAL_HOLIDAYS };
            (h1.holidays || []).concat(h2.holidays || []).forEach(item => {
                if (item.date && item.localName) {
                    dynamicPublicHolidays[item.date] = item.localName;
                }
            });
        } catch (_) {
            dynamicPublicHolidays = { ...KOREAN_NATIONAL_HOLIDAYS };
        }
    }

    async function loadAnnualSchedules() {
        if (!annualLoading) return;
        annualLoading.hidden = false;
        annualError.hidden = true;
        annualContent.hidden = true;

        try {
            await fetchLivePublicHolidays();
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

    const KOREAN_NATIONAL_HOLIDAYS = {
        "2025-01-01": "신정",
        "2025-01-28": "설날 연휴",
        "2025-01-29": "설날",
        "2025-01-30": "설날 연휴",
        "2025-03-01": "삼일절",
        "2025-03-03": "대체공휴일",
        "2025-05-05": "어린이날",
        "2025-05-06": "부처님오신날",
        "2025-06-06": "현충일",
        "2025-08-15": "광복절",
        "2025-10-03": "개천절",
        "2025-10-05": "추석 연휴",
        "2025-10-06": "추석",
        "2025-10-07": "추석 연휴",
        "2025-10-08": "대체공휴일",
        "2025-10-09": "한글날",
        "2025-12-25": "성탄절",
        "2026-01-01": "신정",
        "2026-02-16": "설날 연휴",
        "2026-02-17": "설날",
        "2026-02-18": "설날 연휴",
        "2026-03-01": "삼일절",
        "2026-03-02": "대체공휴일",
        "2026-05-05": "어린이날",
        "2026-05-24": "부처님오신날",
        "2026-05-25": "대체공휴일",
        "2026-06-06": "현충일",
        "2026-08-15": "광복절",
        "2026-08-17": "대체공휴일",
        "2026-09-24": "추석 연휴",
        "2026-09-25": "추석",
        "2026-09-26": "추석 연휴",
        "2026-10-03": "개천절",
        "2026-10-05": "대체공휴일",
        "2026-10-09": "한글날",
        "2026-12-25": "성탄절",
        "2027-01-01": "신정",
        "2027-02-06": "설날 연휴",
        "2027-02-07": "설날",
        "2027-02-08": "설날 연휴",
        "2027-02-09": "대체공휴일",
        "2027-03-01": "삼일절"
    };

    const summerVacationStart = document.getElementById('summerVacationStart');
    const summerVacationEnd = document.getElementById('summerVacationEnd');
    const winterVacationStart = document.getElementById('winterVacationStart');
    const winterVacationEnd = document.getElementById('winterVacationEnd');
    const springVacationStart = document.getElementById('springVacationStart');
    const springVacationEnd = document.getElementById('springVacationEnd');
    const saveVacationDatesBtn = document.getElementById('saveVacationDatesBtn');
    const integrateWinterSpringVacation = document.getElementById('integrateWinterSpringVacation');
    const springVacationLabelWrap = document.getElementById('springVacationLabelWrap');

    function toggleIntegratedVacationUI(isIntegrated) {
        if (springVacationLabelWrap) {
            springVacationLabelWrap.style.display = isIntegrated ? 'none' : 'flex';
        }
    }

    function loadVacationDates() {
        const stored = JSON.parse(localStorage.getItem(`vacation_dates_${selectedAcademicYear}`) || '{}');
        const isIntegrated = stored.isIntegrated !== undefined ? stored.isIntegrated : true; // Default true (통합 운영)
        if (integrateWinterSpringVacation) {
            integrateWinterSpringVacation.checked = isIntegrated;
            toggleIntegratedVacationUI(isIntegrated);
        }
        if (summerVacationStart) summerVacationStart.value = stored.summerStart || `${selectedAcademicYear}-07-20`;
        if (summerVacationEnd) summerVacationEnd.value = stored.summerEnd || `${selectedAcademicYear}-08-20`;
        if (winterVacationStart) winterVacationStart.value = stored.winterStart || `${selectedAcademicYear}-12-30`;
        if (winterVacationEnd) winterVacationEnd.value = stored.winterEnd || (isIntegrated ? `${selectedAcademicYear + 1}-02-28` : `${selectedAcademicYear + 1}-01-30`);
        if (springVacationStart) springVacationStart.value = stored.springStart || `${selectedAcademicYear + 1}-02-15`;
        if (springVacationEnd) springVacationEnd.value = stored.springEnd || `${selectedAcademicYear + 1}-02-28`;
    }

    if (integrateWinterSpringVacation) {
        integrateWinterSpringVacation.addEventListener('change', (e) => {
            toggleIntegratedVacationUI(e.target.checked);
            if (e.target.checked && winterVacationEnd) {
                winterVacationEnd.value = `${selectedAcademicYear + 1}-02-28`;
            }
        });
    }

    if (saveVacationDatesBtn) {
        saveVacationDatesBtn.addEventListener('click', () => {
            const data = {
                isIntegrated: Boolean(integrateWinterSpringVacation?.checked),
                summerStart: summerVacationStart?.value,
                summerEnd: summerVacationEnd?.value,
                winterStart: winterVacationStart?.value,
                winterEnd: winterVacationEnd?.value,
                springStart: springVacationStart?.value,
                springEnd: springVacationEnd?.value
            };
            localStorage.setItem(`vacation_dates_${selectedAcademicYear}`, JSON.stringify(data));
            alert('방학 기간 및 휴업일 설정이 연간 학사일정에 즉시 반영되었습니다!');
            renderCalendarGrid();
            calculateSchoolDaysAudit();
        });
    }

    function getVacationType(dateStr) {
        const sStart = summerVacationStart?.value;
        const sEnd = summerVacationEnd?.value;
        const wStart = winterVacationStart?.value;
        const wEnd = winterVacationEnd?.value;
        const spStart = springVacationStart?.value;
        const spEnd = springVacationEnd?.value;
        const isIntegrated = integrateWinterSpringVacation?.checked;

        if (sStart && sEnd && dateStr >= sStart && dateStr <= sEnd) return '여름방학';
        if (wStart && wEnd && dateStr >= wStart && dateStr <= wEnd) {
            return isIntegrated ? '겨울/통합방학' : '겨울방학';
        }
        if (!isIntegrated && spStart && spEnd && dateStr >= spStart && dateStr <= spEnd) return '학년말방학';
        return null;
    }

    function renderCalendarGrid() {
        if (!annualCalendarGrid) return;
        loadVacationDates();

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
            const natHoliday = dynamicPublicHolidays[dateKey] || KOREAN_NATIONAL_HOLIDAYS[dateKey];
            const vacType = getVacationType(dateKey);

            const cell = document.createElement('div');
            cell.className = 'cal-day-cell';
            if (dayOfWeek === 0 || natHoliday) cell.classList.add('sun');
            if (dayOfWeek === 6) cell.classList.add('sat');

            const eventItem = eventMap.get(dateKey);
            if (natHoliday || vacType || (eventItem && eventItem.category === 'HOLIDAY')) {
                cell.classList.add('holiday');
            }
            if (vacType) {
                cell.classList.add('vacation');
            }

            let eventsHtml = '';
            if (natHoliday) {
                eventsHtml += `<div class="cal-event-pill holiday">🔴 ${natHoliday}</div>`;
            }
            if (vacType) {
                const vacIcon = vacType === '여름방학' ? '🏖️' : vacType === '겨울방학' ? '❄️' : '🌸';
                eventsHtml += `<div class="cal-event-pill vacation">${vacIcon} ${vacType}</div>`;
            }
            if (eventItem) {
                const catClass = eventItem.category.toLowerCase();
                const scopeBadge = eventItem.target_scope === 'GRADE' ? `[${eventItem.target_grades.join(',')}학년]` : '';
                eventsHtml += `<div class="cal-event-pill ${catClass}">${scopeBadge} ${escapeHtml(eventItem.title)}</div>`;
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
        let totalSchoolDays = 0;
        let totalHolidays = 0;
        let totalEvents = annualSchedulesData.length;

        const activeHolidays = Object.keys(dynamicPublicHolidays).length > 0 ? dynamicPublicHolidays : KOREAN_NATIONAL_HOLIDAYS;

        // Loop through all dates in the academic year (March 1 of selectedAcademicYear ~ Feb 28/29 of next year)
        const startDate = new Date(selectedAcademicYear, 2, 1); // March 1
        const endDate = new Date(selectedAcademicYear + 1, 1, 28); // Feb 28

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const year = d.getFullYear();
            const m = d.getMonth() + 1;
            const day = d.getDate();
            const dateStr = `${year}-${m < 10 ? '0' + m : m}-${day < 10 ? '0' + day : day}`;
            const dayOfWeek = d.getDay();

            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const isPublicHoliday = Boolean(activeHolidays[dateStr]);
            const vacType = getVacationType(dateStr);
            const customEvent = annualSchedulesData.find(item => item.event_date === dateStr);
            const isCustomHoliday = customEvent && (customEvent.category === 'HOLIDAY' || customEvent.category === 'DISCRETIONARY');

            if (isWeekend) {
                // Weekend - not counted as school day or school holiday
            } else if (isPublicHoliday || vacType || isCustomHoliday) {
                totalHolidays++;
            } else {
                totalSchoolDays++;
            }
        }

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
            DISCRETIONARY: '🟡 재량/자율휴업일',
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

    // --- 2단계: 시수편성 (Curriculum Hours Allocation & Adjustment) ---
    const GRADE_SUBJECT_BASE_HOURS = {
        1: [
            { name: '국어', base: 210, weekly: 6, category: 'SUBJECT' },
            { name: '수학', base: 130, weekly: 4, category: 'SUBJECT' },
            { name: '바른 생활', base: 40, weekly: 1, category: 'SUBJECT' },
            { name: '슬기로운 생활', base: 90, weekly: 3, category: 'SUBJECT' },
            { name: '즐거운 생활', base: 190, weekly: 6, category: 'SUBJECT' },
            { name: '창체(자율)', base: 70, weekly: 2, category: 'CHANGTAE' },
            { name: '창체(동아리)', base: 60, weekly: 2, category: 'CHANGTAE' },
            { name: '창체(봉사)', base: 40, weekly: 1, category: 'CHANGTAE' },
            { name: '창체(진로)', base: 60, weekly: 2, category: 'CHANGTAE' }
        ],
        2: [
            { name: '국어', base: 210, weekly: 6, category: 'SUBJECT' },
            { name: '수학', base: 130, weekly: 4, category: 'SUBJECT' },
            { name: '바른 생활', base: 40, weekly: 1, category: 'SUBJECT' },
            { name: '슬기로운 생활', base: 90, weekly: 3, category: 'SUBJECT' },
            { name: '즐거운 생활', base: 190, weekly: 6, category: 'SUBJECT' },
            { name: '창체(자율)', base: 70, weekly: 2, category: 'CHANGTAE' },
            { name: '창체(동아리)', base: 60, weekly: 2, category: 'CHANGTAE' },
            { name: '창체(봉사)', base: 40, weekly: 1, category: 'CHANGTAE' },
            { name: '창체(진로)', base: 60, weekly: 2, category: 'CHANGTAE' }
        ],
        3: [
            { name: '국어', base: 204, weekly: 6, category: 'SUBJECT' },
            { name: '수학', base: 136, weekly: 4, category: 'SUBJECT' },
            { name: '사회', base: 102, weekly: 3, category: 'SUBJECT' },
            { name: '도덕', base: 34, weekly: 1, category: 'SUBJECT' },
            { name: '과학', base: 102, weekly: 3, category: 'SUBJECT' },
            { name: '체육', base: 102, weekly: 3, category: 'SUBJECT' },
            { name: '음악', base: 68, weekly: 2, category: 'SUBJECT' },
            { name: '미술', base: 68, weekly: 2, category: 'SUBJECT' },
            { name: '영어', base: 68, weekly: 2, category: 'SUBJECT' },
            { name: '창체(자율)', base: 34, weekly: 1, category: 'CHANGTAE' },
            { name: '창체(동아리)', base: 34, weekly: 1, category: 'CHANGTAE' },
            { name: '창체(봉사)', base: 10, weekly: 0.5, category: 'CHANGTAE' },
            { name: '창체(진로)', base: 24, weekly: 0.5, category: 'CHANGTAE' }
        ],
        4: [
            { name: '국어', base: 204, weekly: 6, category: 'SUBJECT' },
            { name: '수학', base: 136, weekly: 4, category: 'SUBJECT' },
            { name: '사회', base: 102, weekly: 3, category: 'SUBJECT' },
            { name: '도덕', base: 34, weekly: 1, category: 'SUBJECT' },
            { name: '과학', base: 102, weekly: 3, category: 'SUBJECT' },
            { name: '체육', base: 102, weekly: 3, category: 'SUBJECT' },
            { name: '음악', base: 68, weekly: 2, category: 'SUBJECT' },
            { name: '미술', base: 68, weekly: 2, category: 'SUBJECT' },
            { name: '영어', base: 68, weekly: 2, category: 'SUBJECT' },
            { name: '창체(자율)', base: 34, weekly: 1, category: 'CHANGTAE' },
            { name: '창체(동아리)', base: 34, weekly: 1, category: 'CHANGTAE' },
            { name: '창체(봉사)', base: 10, weekly: 0.5, category: 'CHANGTAE' },
            { name: '창체(진로)', base: 24, weekly: 0.5, category: 'CHANGTAE' }
        ],
        5: [
            { name: '국어', base: 204, weekly: 6, category: 'SUBJECT' },
            { name: '수학', base: 136, weekly: 4, category: 'SUBJECT' },
            { name: '사회', base: 102, weekly: 3, category: 'SUBJECT' },
            { name: '도덕', base: 34, weekly: 1, category: 'SUBJECT' },
            { name: '과학', base: 102, weekly: 3, category: 'SUBJECT' },
            { name: '실과', base: 68, weekly: 2, category: 'SUBJECT' },
            { name: '체육', base: 102, weekly: 3, category: 'SUBJECT' },
            { name: '음악', base: 68, weekly: 2, category: 'SUBJECT' },
            { name: '미술', base: 68, weekly: 2, category: 'SUBJECT' },
            { name: '영어', base: 68, weekly: 2, category: 'SUBJECT' },
            { name: '창체(자율)', base: 34, weekly: 1, category: 'CHANGTAE' },
            { name: '창체(동아리)', base: 34, weekly: 1, category: 'CHANGTAE' },
            { name: '창체(봉사)', base: 10, weekly: 0.5, category: 'CHANGTAE' },
            { name: '창체(진로)', base: 24, weekly: 0.5, category: 'CHANGTAE' }
        ],
        6: [
            { name: '국어', base: 204, weekly: 6, category: 'SUBJECT' },
            { name: '수학', base: 136, weekly: 4, category: 'SUBJECT' },
            { name: '사회', base: 102, weekly: 3, category: 'SUBJECT' },
            { name: '도덕', base: 34, weekly: 1, category: 'SUBJECT' },
            { name: '과학', base: 102, weekly: 3, category: 'SUBJECT' },
            { name: '실과', base: 68, weekly: 2, category: 'SUBJECT' },
            { name: '체육', base: 102, weekly: 3, category: 'SUBJECT' },
            { name: '음악', base: 68, weekly: 2, category: 'SUBJECT' },
            { name: '미술', base: 68, weekly: 2, category: 'SUBJECT' },
            { name: '영어', base: 68, weekly: 2, category: 'SUBJECT' },
            { name: '창체(자율)', base: 34, weekly: 1, category: 'CHANGTAE' },
            { name: '창체(동아리)', base: 34, weekly: 1, category: 'CHANGTAE' },
            { name: '창체(봉사)', base: 10, weekly: 0.5, category: 'CHANGTAE' },
            { name: '창체(진로)', base: 24, weekly: 0.5, category: 'CHANGTAE' }
        ]
    };

    async function loadCurriculumHours() {
        if (!curriculumTableBody) return;
        const grade = Number(curriculumGradeSelect.value || 5);
        const gradeDefaults = GRADE_SUBJECT_BASE_HOURS[grade] || GRADE_SUBJECT_BASE_HOURS[5];

        try {
            const res = await api(`/api/school-admin/curriculum-hours?academicYear=${selectedAcademicYear}&grade=${grade}`);
            const savedHours = res.hours || [];
            
            const hourMap = new Map(savedHours.map(h => [h.subject_name, h]));
            const rowsData = gradeDefaults.map(def => {
                const saved = hourMap.get(def.name);
                return {
                    name: def.name,
                    weekly: saved ? saved.weekly_hours : def.weekly,
                    base: def.base,
                    adj: saved && saved.annual_required_hours ? (saved.annual_required_hours - def.base) : 0,
                    category: def.category
                };
            });

            renderCurriculumTable(rowsData);
        } catch (error) {
            const rowsData = gradeDefaults.map(def => ({ ...def, adj: 0 }));
            renderCurriculumTable(rowsData);
        }
    }

    function renderCurriculumTable(rowsData) {
        curriculumTableBody.innerHTML = '';
        let totalWeekly = 0;
        let totalBase = 0;
        let totalAdj = 0;
        let totalFinal = 0;
        let totalCalculated = 0;

        rowsData.forEach(row => {
            const finalAnnual = row.base + (row.adj || 0);
            const calcAnnual = row.weekly * 34; // 34 weeks
            const diff = calcAnnual - finalAnnual;

            totalWeekly += row.weekly;
            totalBase += row.base;
            totalAdj += (row.adj || 0);
            totalFinal += finalAnnual;
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
                <td><input type="number" class="weekly-input" data-subject="${row.name}" data-category="${row.category}" data-base="${row.base}" value="${row.weekly}" min="0" max="20"></td>
                <td style="font-weight:700; color:var(--primary);">${row.base}시간</td>
                <td><input type="number" class="adj-input" data-subject="${row.name}" value="${row.adj || 0}" min="-50" max="50"></td>
                <td style="font-weight:800;">${finalAnnual}시간</td>
                <td style="font-weight:700;">${calcAnnual}시간</td>
                <td class="${diffClass}">${diffStr}</td>
            `;
            curriculumTableBody.appendChild(tr);
        });

        const totalDiff = totalCalculated - totalFinal;
        let totalDiffStr = totalDiff >= 0 ? `+${totalDiff}시간` : `${totalDiff}시간`;

        curriculumTableFoot.innerHTML = `
            <tr>
                <td colspan="2">합계</td>
                <td>${totalWeekly}시간/주</td>
                <td>${totalBase}시간</td>
                <td>${totalAdj >= 0 ? '+' + totalAdj : totalAdj}시간</td>
                <td>${totalFinal}시간</td>
                <td>${totalCalculated}시간</td>
                <td class="${totalDiff >= 0 ? 'diff-positive' : 'diff-negative'}">${totalDiffStr}</td>
            </tr>
        `;

        // Live input listeners
        curriculumTableBody.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                const currentData = Array.from(curriculumTableBody.querySelectorAll('tr')).map(tr => {
                    const wInput = tr.querySelector('.weekly-input');
                    const aInput = tr.querySelector('.adj-input');
                    return {
                        name: wInput.dataset.subject,
                        weekly: Number(wInput.value || 0),
                        base: Number(wInput.dataset.base || 0),
                        adj: Number(aInput.value || 0),
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
            const aInput = tr.querySelector('.adj-input');
            const base = Number(wInput.dataset.base || 0);
            const adj = Number(aInput.value || 0);
            return {
                subjectName: wInput.dataset.subject,
                weeklyHours: Number(wInput.value || 0),
                annualRequiredHours: base + adj,
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
            alert(`${grade}학년 교과/창체 시수 편제표가 저장되었습니다!`);
        } catch (error) {
            alert(error.message || '시수 편제표를 저장하지 못했습니다.');
        }
    }

    // --- Master Timetable Grid Logic (1~8 Periods Support) ---
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

    const timetableClassSelect = document.getElementById('timetableClassSelect');
    const timetableHoursAuditBar = document.getElementById('timetableHoursAuditBar');
    const timetableAuditStatusBadge = document.getElementById('timetableAuditStatusBadge');

    if (timetableClassSelect) {
        timetableClassSelect.addEventListener('change', loadMasterTimetable);
    }

    async function loadMasterTimetable() {
        if (!timetableMatrixBody) return;
        const grade = timetableGradeSelect.value;
        const classNum = timetableClassSelect ? timetableClassSelect.value : 1;

        try {
            const res = await api(`/api/school-admin/master-timetable?academicYear=${selectedAcademicYear}&grade=${grade}&classNumber=${classNum}`);
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

    function auditTimetableGradeHours() {
        if (!timetableHoursAuditBar) return;

        const grade = Number(timetableGradeSelect ? timetableGradeSelect.value : 5);
        const gradeDefaults = GRADE_SUBJECT_BASE_HOURS[grade] || GRADE_SUBJECT_BASE_HOURS[5];

        // Count placed hours per subject in matrix
        const placedMap = new Map();
        Object.values(timetableMatrixData).forEach(sub => {
            if (sub && sub !== '-' && sub !== '수업없음') {
                placedMap.set(sub, (placedMap.get(sub) || 0) + 1);
            }
        });

        let allMatched = true;
        let auditChipsHtml = '';

        gradeDefaults.forEach(def => {
            const placed = placedMap.get(def.name) || 0;
            const target = def.weekly;
            const isOk = placed === target;
            if (!isOk) allMatched = false;

            const chipColor = isOk ? 'var(--success)' : 'var(--danger)';
            const statusIcon = isOk ? '✅' : '⚠️';
            auditChipsHtml += `<span style="background:rgba(255,255,255,0.06); padding:4px 10px; border-radius:6px; border:1px solid rgba(255,255,255,0.1); color:${chipColor}; font-weight:700;">${def.name}: ${placed}/${target}시간 ${statusIcon}</span>`;
        });

        timetableHoursAuditBar.innerHTML = auditChipsHtml;

        if (timetableAuditStatusBadge) {
            if (allMatched) {
                timetableAuditStatusBadge.textContent = '✅ 학년 공통 주당 기준시수 100% 일치';
                timetableAuditStatusBadge.className = 'audit-status status-ok';
            } else {
                timetableAuditStatusBadge.textContent = '⚠️ 과목별 주당 목표시수 불일치 확인 필요';
                timetableAuditStatusBadge.className = 'audit-status status-warn';
            }
        }
    }

    function renderTimetableMatrix() {
        if (!timetableMatrixBody) return;
        timetableMatrixBody.innerHTML = '';

        // 1 to 8 Periods (하루 최대 8교시)
        for (let period = 1; period <= 8; period++) {
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

        auditTimetableGradeHours();

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
        const classNum = timetableClassSelect ? timetableClassSelect.value : 1;
        const cells = [];
        for (let day = 1; day <= 5; day++) {
            for (let period = 1; period <= 8; period++) {
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
                    classNumber: classNum,
                    cells
                })
            });
            alert(`${grade}학년 ${classNum}반 기초시간표 매트릭스가 성공적으로 저장되었습니다!`);
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
