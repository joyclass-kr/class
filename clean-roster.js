const fs = require('fs');
let html = fs.readFileSync('classtools/roster.html', 'utf8');

// Remove CSS
html = html.replace(/\.student-password\s*\{[\s\S]*?\}\s*\.student-password:focus\s*\{[\s\S]*?\}\s*\.student-password\[aria-invalid="true"\]\s*\{[\s\S]*?\}\s*\.password-note\s*\{[\s\S]*?\}/, '');

// Remove teacher claim password UI
html = html.replace(/<div class="profile-field">\s*<label for="claim-password">Password<\/label>\s*<input class="profile-control" id="claim-password".*?>\s*<\/div>/, '');

// Remove 최초 접속 상태 and 비번 초기화 columns UI
html = html.replace(/<div class="field">\s*<div class="field-head">\s*<label for="passwords">최초 접속 상태<\/label>[\s\S]*?<\/div>\s*<\/div>/, '');
html = html.replace(/<div class="field profile-field--password">\s*<div class="field-head">\s*<label>비번 초기화<\/label>[\s\S]*?<\/div>\s*<\/div>/, '');
html = html.replace(/, 비밀번호 열을/, ' 열을');

// Remove JS vars
html = html.replace(/const STUDENT_PASSWORD_PATTERN = \/\^\\d\{6\}\$\/;\s*const DISPLAY_DEFAULT_STUDENT_PASSWORD = "123456";/, '');
html = html.replace(/const claimPasswordInput = document\.querySelector\("#claim-password"\);/, '');
html = html.replace(/const passwordsInput = document\.querySelector\("#passwords"\);/, '');
html = html.replace(/const passwordCount = document\.querySelector\("#password-count"\);/, '');
html = html.replace(/const displayedPasswordRows = new Map\(\);/, '');

// Remove hasMismatchedPasswords and invalidPasswords from state
html = html.replace(/hasMismatchedPasswords: false,/, '');
html = html.replace(/invalidPasswords: \[\],/, '');

// Remove password mapping and updating logic
html = html.replace(/passwordsInput\.value = classroom\.students\.map\([\s\S]*?\}\);\s*displayedPasswordRows\.clear\(\);\s*classroom\.students\.forEach\(\(student\) => displayedPasswordRows\.set\(student\.number, DISPLAY_DEFAULT_STUDENT_PASSWORD\)\);\s*passwordsInput\.disabled = true;/, '');
html = html.replace(/passwordsInput\.disabled = true;/, '');

// Remove resetPassword function
html = html.replace(/async function resetPassword[\s\S]*?\}\s*(?=async function loadClassroom)/, '');

// Remove count update
html = html.replace(/if \(passwordCount\) passwordCount\.textContent = `\$\{state\.numbers\.length\}행`;/, '');

// Remove invalid password status
html = html.replace(/if \(state\.invalidPasswords\.length > 0 \|\| state\.hasMismatchedPasswords\) \{[\s\S]*?\}/, '');

// Remove claim validation logic involving password
html = html.replace(/claimPasswordInput\.addEventListener\("input"[\s\S]*?\}\);/, '');
html = html.replace(/password: claimPasswordInput\.value,/, '');

// Remove passwordsInput event listener
html = html.replace(/passwordsInput\.addEventListener\("input"[\s\S]*?\}\);/, '');

// Remove deleting confirmation password mention
html = html.replace(/, 비밀번호가 함께/, '가 함께');

fs.writeFileSync('classtools/roster.html', html);
console.log('roster.html cleaned successfully.');
