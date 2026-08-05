const fs = require('fs');
let code = fs.readFileSync('game-hub-server/classroom-platform.js', 'utf8');

// Remove password constants
code = code.replace(/const DEFAULT_STUDENT_PASSWORD = ".*?";\n/g, '');
code = code.replace(/const STUDENT_PASSWORD_PATTERN = \/.*?\/;\n/g, '');
code = code.replace(/const DEFAULT_TEACHER_PASSWORD = ".*?";\n/g, '');

// Remove hashStudentPassword and verifyStudentPassword functions
code = code.replace(/function hashStudentPassword[\s\S]*?\}\n/g, '');
code = code.replace(/function verifyStudentPassword[\s\S]*?\}\n/g, '');

// Remove POST /student/join route
code = code.replace(/  router\.post\("\/student\/join", asyncRoute[\s\S]*?(?=  router\.[a-z]+\()/g, '');

// Remove PATCH /student/password route
code = code.replace(/  router\.patch\("\/student\/password", asyncRoute[\s\S]*?(?=  router\.[a-z]+\()/g, '');

// Remove POST /teacher/class/students/:studentNumber/reset-:type route
code = code.replace(/  router\.post\("\/teacher\/class\/students\/:studentNumber\/reset-:type", asyncRoute[\s\S]*?(?=  router\.[a-z]+\()/g, '');

// Remove POST /teacher/claim route
code = code.replace(/  router\.post\("\/teacher\/claim", asyncRoute[\s\S]*?(?=  router\.[a-z]+\()/g, '');

fs.writeFileSync('game-hub-server/classroom-platform.js', code);
console.log('Script executed successfully.');
