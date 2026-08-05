const fs = require('fs');
let html = fs.readFileSync('classtools/profile.html', 'utf8');

// Remove password CSS
html = html.replace(/#passwordStatus \{ min-height:26px; color:var\(--muted\); font-weight:800; \}\s*\.password-grid \{ display:grid; grid-template-columns:repeat\(2,minmax\(0,1fr\)\); gap:12px; \}/, '');
html = html.replace(/,\.password-grid/, '');

// Remove passwordForm HTML
html = html.replace(/<form id="passwordForm" class="card" hidden>[\s\S]*?<\/form>/, '');

// Remove passwordForm script references
html = html.replace(/,passwordForm=document\.querySelector\('#passwordForm'\),currentPassword=document\.querySelector\('#currentPassword'\),newPassword=document\.querySelector\('#newPassword'\),confirmPassword=document\.querySelector\('#confirmPassword'\),passwordStatus=document\.querySelector\('#passwordStatus'\),passwordButton=document\.querySelector\('#passwordButton'\)/, '');

// Remove password script logic
html = html.replace(/for\(const input of \[currentPassword,newPassword,confirmPassword\]\)input\.addEventListener\('input',\(\)=>{input\.value=input\.value\.replace\(\/\\D\/g,''\)\.slice\(0,6\)}\);passwordForm\.addEventListener\('submit',async event=>{[\s\S]*?\}\);/, '');

// Remove form display logic
html = html.replace(/;passwordForm\.hidden=false/, '');

fs.writeFileSync('classtools/profile.html', html);
console.log('profile.html cleaned successfully.');
