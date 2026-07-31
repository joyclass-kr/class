document.addEventListener('DOMContentLoaded', () => {
    const gradeButtons = [...document.querySelectorAll('[data-grade]')];
    const experiments = [...document.querySelectorAll('[data-grades]')];

    function showGrade(grade) {
        gradeButtons.forEach(button => {
            button.setAttribute('aria-pressed', String(button.dataset.grade === grade));
        });
        experiments.forEach(experiment => {
            const grades = experiment.dataset.grades.split(' ');
            experiment.hidden = grade !== 'all' && !grades.includes(grade);
        });
    }

    gradeButtons.forEach(button => {
        button.addEventListener('click', () => showGrade(button.dataset.grade));
    });
});
