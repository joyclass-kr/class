const presets = [
  ["일차함수","중학교","a*x+b","기울기 a가 커지면 직선은 어떻게 달라질까요?","y = ax + b"],
  ["이차함수","중학교","a*(x-h)^2+k","a의 부호가 바뀌면 그래프의 모양은 어떻게 달라질까요?","y = a(x − h)<sup>2</sup> + k"],
  ["반비례","중학교","a/x","a의 부호에 따라 그래프는 어느 사분면을 지날까요?",'y = <span class="mathFraction"><span>a</span><span>x</span></span>'],
  ["삼차함수","고등학교","a*(x-h)^3+k","변곡점과 그래프의 대칭성을 찾아보세요.","y = a(x − h)<sup>3</sup> + k"],
  ["사차함수","고등학교","a*(x-h)^4+k","짝수 차수 함수의 양 끝 행동을 관찰해 보세요.","y = a(x − h)<sup>4</sup> + k"],
  ["절댓값","고등학교","a*abs(x-h)+k","h와 k는 꼭짓점을 어느 방향으로 움직일까요?","y = a|x − h| + k"],
  ["유리함수","고등학교","a/(x-h)+k","점근선의 방정식을 h와 k로 표현해 보세요.",'y = <span class="mathFraction"><span>a</span><span>x − h</span></span> + k'],
  ["무리함수","고등학교","a*sqrt(x-h)+k","이 함수의 정의역은 어디에서 시작할까요?",'y = a<span class="root">√<span class="radicand">x − h</span></span> + k'],
  ["지수함수","고등학교","a*2^(x-h)+k","x가 1씩 증가할 때 함숫값은 몇 배가 될까요?","y = a · 2<sup>x − h</sup> + k"],
  ["자연지수함수","고등학교","a*exp(x-h)+k","자연상수 e를 밑으로 하는 증가율을 관찰해 보세요.","y = ae<sup>x − h</sup> + k"],
  ["상용로그","고등학교","a*log10(x-h)+k","밑이 10인 로그함수의 점근선을 찾아보세요.","y = a log<sub>10</sub>(x − h) + k"],
  ["자연로그 ln","고등학교","a*ln(x-h)+k","ln과 자연지수함수의 역함수 관계를 확인해 보세요.","y = a ln(x − h) + k"],
  ["사인함수","고등학교","a*sin(b*x+h)+k","a와 b는 진폭과 주기를 어떻게 바꿀까요?","y = a sin(bx + h) + k"],
  ["코사인함수","고등학교","a*cos(b*x+h)+k","사인함수와 코사인함수는 어떻게 평행이동 관계일까요?","y = a cos(bx + h) + k"],
  ["탄젠트함수","고등학교","a*tan(b*x+h)+k","탄젠트함수의 주기와 점근선을 찾아보세요.","y = a tan(bx + h) + k"],
  ["역삼각함수","심화","asin(x)","정의역과 치역이 제한되는 이유를 살펴보세요.","y = sin<sup>−1</sup>x"],
  ["합성함수 예시","심화","sin(x^2)","안쪽 함수와 바깥쪽 함수가 그래프에 미치는 영향을 나눠 보세요.","y = sin(x<sup>2</sup>)"],
  ["정규분포","확률과 통계","exp(-((x-h)^2)/(2*a^2))/(a*sqrt(2*pi))","표준편차가 커지면 곡선의 높이와 폭은 어떻게 변할까요?",'y = <span class="mathFraction"><span>e<sup>−(x − h)²/(2a²)</sup></span><span>a√(2π)</span></span>']
];

const colors=["#6558d9","#ef7456","#139e88","#e0a52b","#3975ce","#b24f9b"];
const state={
  preset:"이차함수",
  functions:[{expression:"a*(x-h)^2+k",visible:true}],
  params:{a:1,b:1,h:0,k:0},
  range:10,showPoints:true,showDerivative:false,showIntegral:false,
  activeFunctionIndex:0
};
const canvas=document.getElementById("graphCanvas");
const formulaDisplay=document.getElementById("formulaDisplay");
const formulaHelp=document.getElementById("formulaHelp");
const legend=document.getElementById("legend");

function buildLibrary(){
  const root=document.getElementById("presetLibrary");root.innerHTML="";
  [...new Set(presets.map(p=>p[1]))].forEach(group=>{
    const section=document.createElement("div");section.className="presetGroup";section.innerHTML=`<p>${group}</p><div></div>`;
    presets.filter(p=>p[1]===group).forEach((item,index)=>{
      const button=document.createElement("button");button.type="button";button.className=item[0]===state.preset?"activePreset":"";
      button.innerHTML=`<i style="background:${colors[index%colors.length]}"></i>${item[0]}`;
      button.onclick=()=>selectPreset(item);section.lastElementChild.appendChild(button);
    });root.appendChild(section);
  });
}
function buildSliders(){
  const root=document.getElementById("sliders");root.innerHTML="";
  Object.keys(state.params).forEach(key=>{
    const label=document.createElement("label");label.className="slider";const limit=key==="a"||key==="b"?5:8;
    label.innerHTML=`<div><b>${key}</b><output>${state.params[key].toFixed(1)}</output></div><input type="range" min="${-limit}" max="${limit}" step="0.1" value="${state.params[key]}" aria-label="${key} 값">`;
    label.querySelector("input").oninput=e=>{state.params[key]=Number(e.target.value);label.querySelector("output").textContent=state.params[key].toFixed(1);draw();};
    root.appendChild(label);
  });
}
function buildFunctionRows(){
  const root=document.getElementById("functionRows");root.innerHTML="";
  state.functions.forEach((fn,index)=>{
    const row=document.createElement("div");row.className="functionRow";
    row.classList.toggle("isActive",index===state.activeFunctionIndex);
    row.innerHTML=`<label class="functionVisibility" title="그래프 표시"><input type="checkbox" ${fn.visible?"checked":""}><i style="background:${colors[index%colors.length]}"></i></label>
      <b>y${index+1}</b><input class="functionInput" value="${escapeAttribute(fn.expression)}" aria-label="${index+1}번 함수 수식" spellcheck="false" inputmode="text">
      <button type="button" class="removeFunction" aria-label="${index+1}번 함수 삭제" ${state.functions.length===1?"disabled":""}>×</button>
      <small class="functionError" aria-live="polite"></small>`;
    row.querySelector(".functionVisibility input").onchange=e=>{fn.visible=e.target.checked;draw();};
    const input=row.querySelector(".functionInput");
    input.onfocus=()=>setActiveFunction(index);
    input.onclick=()=>setActiveFunction(index);
    input.oninput=e=>{fn.expression=e.target.value;state.preset="직접 입력";buildLibrary();renderFormula();draw();};
    row.querySelector(".removeFunction").onclick=()=>{
      state.functions.splice(index,1);
      state.activeFunctionIndex=Math.min(state.activeFunctionIndex,state.functions.length-1);
      buildFunctionRows();renderFormula();draw();
    };
    root.appendChild(row);
  });
  updateActiveFunctionLabel();
}
function escapeAttribute(value){return value.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function setActiveFunction(index){
  state.activeFunctionIndex=index;
  document.querySelectorAll(".functionRow").forEach((row,rowIndex)=>row.classList.toggle("isActive",rowIndex===index));
  updateActiveFunctionLabel();
}
function updateActiveFunctionLabel(){
  document.getElementById("activeFunctionLabel").textContent=`y${state.activeFunctionIndex+1} 편집 중`;
}
function selectPreset(item){
  state.preset=item[0];state.functions[0]={expression:item[2],visible:true};state.activeFunctionIndex=0;
  document.getElementById("lessonQuestion").textContent=item[3];buildLibrary();buildFunctionRows();renderFormula();draw();
}
function renderFormula(){
  const preset=presets.find(p=>p[0]===state.preset&&p[2]===state.functions[0]?.expression);
  formulaDisplay.innerHTML=preset?preset[4]:prettyFormula(state.functions[0]?.expression||"");
}
function prettyFormula(source){
  const escaped=source.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  return `y = ${escaped.replace(/\*/g," · ").replace(/\^2/g,"²").replace(/\^3/g,"³").replace(/\^4/g,"⁴").replace(/\bpi\b/gi,"π")}`;
}
function normalizeExpression(source){
  return source
    .replace(/[−–]/g,"-").replace(/×|·/g,"*").replace(/÷/g,"/").replace(/π/gi,"pi")
    .replace(/\^/g,"**")
    .replace(/\bln\b/gi,"log")
    .replace(/\be\b/g,"E")
    .replace(/(\d|\)|[abhkx])\s*(?=\()/g,"$1*")
    .replace(/(\d|\)|[abhkx])\s*(?=[abhkx])/g,"$1*")
    .replace(/(\d|\)|[abhkx])\s*(?=(?:sin|cos|tan|asin|acos|atan|sqrt|abs|log10|log|exp)\b)/g,"$1*")
    .replace(/\bpi\b/gi,"Math.PI").replace(/\bE\b/g,"Math.E")
    .replace(/\b(sin|cos|tan|asin|acos|atan|sqrt|abs|log10|log|exp|floor|ceil|round|sign|min|max)\b/g,"Math.$1");
}
function compileExpression(source){
  const safe=normalizeExpression(source);
  if(!/^[0-9xabhk+\-*/().,\s_MathPIEabcdefghijklmnopqrstuvwxyz*]+$/i.test(safe))throw new Error("지원하지 않는 기호가 있습니다.");
  const fn=new Function("x","a","b","h","k",`"use strict";return (${safe});`);
  return x=>fn(x,state.params.a,state.params.b,state.params.h,state.params.k);
}
function draw(){
  const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;
  const ratio=window.devicePixelRatio||1;canvas.width=rect.width*ratio;canvas.height=rect.height*ratio;
  const ctx=canvas.getContext("2d");ctx.setTransform(ratio,0,0,ratio,0,0);
  const w=rect.width,h=rect.height,min=-state.range,max=state.range,px=x=>(x-min)/(max-min)*w,py=y=>h-(y-min)/(max-min)*h;
  const evaluators=state.functions.map((fn,index)=>{
    const errorNode=document.querySelectorAll(".functionError")[index];
    try{const evaluator=compileExpression(fn.expression);if(errorNode)errorNode.textContent="";return fn.visible?evaluator:null;}
    catch(error){if(errorNode)errorNode.textContent=error.message||"수식을 확인하세요.";return null;}
  });
  formulaHelp.textContent=evaluators.some(Boolean)?"ln, log10, sin, cos, tan, sqrt, abs, exp, pi 사용 가능":"수식을 확인해 주세요.";
  ctx.fillStyle="#fbfcff";ctx.fillRect(0,0,w,h);const step=state.range<=5?1:state.range<=10?2:5;ctx.font="11px sans-serif";
  for(let v=min;v<=max;v+=step){ctx.strokeStyle=v===0?"#697386":"#e8ebf2";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(px(v),0);ctx.lineTo(px(v),h);ctx.stroke();ctx.beginPath();ctx.moveTo(0,py(v));ctx.lineTo(w,py(v));ctx.stroke();if(v!==0){ctx.fillStyle="#8891a3";ctx.textAlign="center";ctx.fillText(v,px(v),Math.min(h-15,Math.max(12,py(0)+16)));ctx.textAlign="right";ctx.fillText(v,Math.min(w-5,Math.max(24,px(0)-7)),py(v)+3);}}
  const primary=evaluators[0];
  if(state.showIntegral&&primary){ctx.beginPath();ctx.moveTo(px(-2),py(0));for(let i=0;i<=160;i++){const x=-2+i/40,y=primary(x);if(Number.isFinite(y))ctx.lineTo(px(x),py(y));}ctx.lineTo(px(2),py(0));ctx.closePath();ctx.fillStyle="rgba(101,88,217,.16)";ctx.fill();}
  function plot(fn,color,width){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineJoin="round";ctx.beginPath();let previous=null;for(let i=0;i<=w;i++){const x=min+i/w*(max-min),sy=py(fn(x));if(!Number.isFinite(sy)||Math.abs(sy)>h*4||(previous!==null&&Math.abs(sy-previous)>h)){previous=null;continue;}previous===null?ctx.moveTo(i,sy):ctx.lineTo(i,sy);previous=sy;}ctx.stroke();}
  evaluators.forEach((fn,index)=>{if(fn)plot(fn,colors[index%colors.length],index?2.4:3);});
  if(state.showDerivative&&primary)plot(x=>(primary(x+.0005)-primary(x-.0005))/.001,"#202334",2);
  if(state.showPoints&&primary){ctx.fillStyle=colors[0];[-2,-1,0,1,2].forEach(x=>{const y=primary(x);if(!Number.isFinite(y)||y<min||y>max)return;ctx.beginPath();ctx.arc(px(x),py(y),4.5,0,Math.PI*2);ctx.fill();});}
  legend.innerHTML=state.functions.map((fn,index)=>fn.visible&&evaluators[index]?`<span><i style="background:${colors[index%colors.length]}"></i>y${index+1}</span>`:"").join("");
  if(state.showDerivative&&primary)legend.innerHTML+=`<span><i style="background:#202334"></i>y1′</span>`;
  if(state.showIntegral&&primary)legend.innerHTML+=`<span><i class="areaSwatch"></i>−2부터 2까지 넓이</span>`;
}
document.getElementById("addFunctionButton").onclick=()=>{
  if(state.functions.length>=6)return;
  state.functions.push({expression:state.functions.length===1?"ln(x^2+1)":"sin(x)",visible:true});
  state.activeFunctionIndex=state.functions.length-1;
  state.preset="직접 입력";buildLibrary();buildFunctionRows();renderFormula();draw();
  requestAnimationFrame(()=>getActiveInput()?.focus());
};
function getActiveInput(){return document.querySelectorAll(".functionInput")[state.activeFunctionIndex]||null;}
function updateActiveExpression(value,cursorStart,cursorEnd=cursorStart){
  const fn=state.functions[state.activeFunctionIndex];if(!fn)return;
  fn.expression=value;state.preset="직접 입력";
  const input=getActiveInput();
  if(input){input.value=value;input.focus();input.setSelectionRange(cursorStart,cursorEnd);}
  buildLibrary();renderFormula();draw();
}
function insertIntoActive(before,after=""){
  const input=getActiveInput();if(!input)return;
  const start=input.selectionStart??input.value.length,end=input.selectionEnd??start;
  const selected=input.value.slice(start,end);
  const value=input.value.slice(0,start)+before+selected+after+input.value.slice(end);
  const cursor=selected?start+before.length+selected.length+after.length:start+before.length;
  updateActiveExpression(value,cursor);
}
document.getElementById("mathKeyboard").addEventListener("mousedown",event=>{
  if(event.target.closest("button"))event.preventDefault();
});
document.getElementById("mathKeyboard").addEventListener("click",event=>{
  const button=event.target.closest("button");if(!button)return;
  if(button.dataset.example!==undefined){
    updateActiveExpression(button.dataset.example,button.dataset.example.length);return;
  }
  if(button.dataset.insert!==undefined){
    insertIntoActive(button.dataset.insert);return;
  }
  if(button.dataset.wrapBefore!==undefined){
    insertIntoActive(button.dataset.wrapBefore,button.dataset.wrapAfter||"");return;
  }
  if(button.dataset.action==="clear"){
    updateActiveExpression("",0);return;
  }
  if(button.dataset.action==="backspace"){
    const input=getActiveInput();if(!input)return;
    const start=input.selectionStart??0,end=input.selectionEnd??start;
    if(start!==end){updateActiveExpression(input.value.slice(0,start)+input.value.slice(end),start);}
    else if(start>0){updateActiveExpression(input.value.slice(0,start-1)+input.value.slice(end),start-1);}
  }
});
document.querySelectorAll("[data-range]").forEach(button=>button.onclick=()=>{state.range=Number(button.dataset.range);draw();});
["showPoints","showDerivative","showIntegral"].forEach(id=>document.getElementById(id).onchange=e=>{state[id]=e.target.checked;draw();});
document.getElementById("resetButton").onclick=()=>{state.params={a:1,b:1,h:0,k:0};buildSliders();draw();};
document.getElementById("printButton").onclick=()=>window.print();
document.getElementById("saveButton").onclick=()=>{const link=document.createElement("a");link.download=`${state.preset}-그래프.png`;link.href=canvas.toDataURL("image/png");link.click();};
buildLibrary();buildSliders();buildFunctionRows();renderFormula();new ResizeObserver(draw).observe(canvas);draw();
