const fs = require('fs');
let html = fs.readFileSync('classtools/roster.html', 'utf8');

// Remove remaining passwordsInput lines
html = html.replace(/passwordsInput\.value = classroom\.students\.map\(\(student\) => \{[\s\S]*?\}\);\s*displayedPasswordRows\.clear\(\);\s*classroom\.students\.forEach\(\(student\) => displayedPasswordRows\.set\(student\.number, DISPLAY_DEFAULT_STUDENT_PASSWORD\)\);\s*/g, '');
html = html.replace(/passwordsInput\.disabled = true;/g, '');
html = html.replace(/, passwordsInput/g, '');
html = html.replace(/, resetButtonsContainer/g, ''); // in allTextareas array

fs.writeFileSync('classtools/roster.html', html);
console.log('roster.html cleaned completely.');
