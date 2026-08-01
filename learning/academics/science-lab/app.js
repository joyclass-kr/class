document.addEventListener('DOMContentLoaded', () => {
    const gradeButtons = [...document.querySelectorAll('.grade-filter button[data-grade]')];
    const levelEntries = [...document.querySelectorAll('[data-level]')];
    const topics = [...document.querySelectorAll('[data-topic]')];
    const subjects = [...document.querySelectorAll('[data-subject]')];
    const catalog = document.querySelector('.catalog');

    function showGrade(grade) {
        catalog.dataset.gradeFilter = grade;
        gradeButtons.forEach(button => {
            button.setAttribute('aria-pressed', String(button.dataset.grade === grade));
        });
        levelEntries.forEach(entry => {
            entry.hidden = grade !== 'all' && entry.dataset.level !== grade;
        });
        topics.forEach(topic => {
            topic.hidden = !topic.querySelector('[data-level]:not([hidden])');
        });
        subjects.forEach(subject => {
            subject.hidden = !subject.querySelector('[data-topic]:not([hidden])');
        });
    }

    gradeButtons.forEach(button => {
        button.addEventListener('click', () => showGrade(button.dataset.grade));
    });
});
