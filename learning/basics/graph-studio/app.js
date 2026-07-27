const presets = [
  ["일차함수","중학교","a*x+b","기울기 a가 커지면 직선은 어떻게 달라질까요?"],
  ["이차함수","중학교","a*(x-h)^2+k","a의 부호가 바뀌면 그래프의 모양은 어떻게 달라질까요?"],
  ["반비례","중학교","a/x","a의 부호에 따라 그래프는 어느 사분면을 지날까요?"],
  ["절댓값","고등학교","a*abs(x-h)+k","h와 k는 꼭짓점을 어느 방향으로 움직일까요?"],
  ["유리함수","고등학교","a/(x-h)+k","점근선의 방정식을 h와 k로 표현해 보세요."],
  ["무리함수","고등학교","a*sqrt(x-h)+k","이 함수의 정의역은 어디에서 시작할까요?"],
  ["지수함수","고등학교","a*2^(x-h)+k","x가 1씩 증가할 때 함숫값은 몇 배가 될까요?"],
  ["로그함수","고등학교","a*log(x-h)+k","로그함수의 정의역과 점근선을 찾아보세요."],
  ["사인함수","고등학교","a*sin(b*x+h)+k","a와 b는 진폭과 주기를 어떻게 바꿀까요?"],
  ["코사인함수","고등학교","a*cos(b*x+h)+k","사인함수와 코사인함수는 어떻게 평행이동 관계일까요?"],
  ["삼차함수","미적분","a*(x-h)^3+k","도함수의 그래프와 증가·감소를 함께 비교해 보세요."],
  ["정규분포","확률과 통계","exp(-((x-h)^2)/(2*a^2))/(a*sqrt(2*pi))","표준편차가 커지면 곡선의 높이와 폭은 어떻게 변할까요?"]
];
const colors=["#6558d9","#ef7456","#139e88"];
const state={preset:"이차함수",expression:"a*(x-h)^2+k",params:{a:1,b:1,h:0,k:0},range:10,showPoints:true,showDerivative:false,showIntegral:false};
const canvas=document.getElementById("graphCanvas");
const expressionInput=document.getElementById("expressionInput");
const formulaHelp=document.getElementById("formulaHelp");
const legend=document.getElementById("legend");

function buildLibrary(){
  const root=document.getElementById("presetLibrary"); root.innerHTML="";
  [...new Set(presets.map(p=>p[1]))].forEach(group=>{
    const section=document.createElement("div"); section.className="presetGroup"; section.innerHTML=`<p>${group}</p><div></div>`;
    presets.filter(p=>p[1]===group).forEach((item,index)=>{
      const button=document.createElement("button"); button.type="button";
      button.className=item[0]===state.preset?"activePreset":"";
      button.innerHTML=`<i style="background:${colors[index%colors.length]}"></i>${item[0]}`;
      button.onclick=()=>selectPreset(item); section.lastElementChild.appendChild(button);
    }); root.appendChild(section);
  });
}
function buildSliders(){
  const root=document.getElementById("sliders"); root.innerHTML="";
  Object.keys(state.params).forEach(key=>{
    const label=document.createElement("label"); label.className="slider";
    const limit=key==="a"||key==="b"?5:8;
    label.innerHTML=`<div><b>${key}</b><output>${state.params[key].toFixed(1)}</output></div><input type="range" min="${-limit}" max="${limit}" step="0.1" value="${state.params[key]}" aria-label="${key} 값">`;
    label.querySelector("input").oninput=e=>{state.params[key]=Number(e.target.value);label.querySelector("output").textContent=state.params[key].toFixed(1);draw();};
    root.appendChild(label);
  });
}
function selectPreset(item){
  state.preset=item[0];state.expression=item[2];expressionInput.value=item[2];
  document.getElementById("lessonQuestion").textContent=item[3];buildLibrary();draw();
}
function compileExpression(source){
  const safe=source.replace(/\^/g,"**").replace(/\bpi\b/gi,"Math.PI").replace(/\b(sin|cos|tan|sqrt|abs|log|exp)\b/g,"Math.$1");
  if(!/^[0-9xabhk+\-*/().,\s_MathPIa-z*]+$/i.test(safe))throw new Error("지원하지 않는 기호가 있습니다.");
  const fn=new Function("x","a","b","h","k",`"use strict";return (${safe});`);
  return x=>fn(x,state.params.a,state.params.b,state.params.h,state.params.k);
}
function draw(){
  const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;
  const ratio=window.devicePixelRatio||1;canvas.width=rect.width*ratio;canvas.height=rect.height*ratio;
  const ctx=canvas.getContext("2d");ctx.setTransform(ratio,0,0,ratio,0,0);
  const w=rect.width,h=rect.height,min=-state.range,max=state.range,px=x=>(x-min)/(max-min)*w,py=y=>h-(y-min)/(max-min)*h;
  let evaluate;try{evaluate=compileExpression(state.expression);formulaHelp.textContent="사용 가능: sin, cos, tan, sqrt, abs, log, exp, pi";}catch(error){formulaHelp.textContent=error.message;return;}
  ctx.fillStyle="#fbfcff";ctx.fillRect(0,0,w,h);const step=state.range<=5?1:state.range<=10?2:5;ctx.font="11px sans-serif";
  for(let v=min;v<=max;v+=step){ctx.strokeStyle=v===0?"#697386":"#e8ebf2";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(px(v),0);ctx.lineTo(px(v),h);ctx.stroke();ctx.beginPath();ctx.moveTo(0,py(v));ctx.lineTo(w,py(v));ctx.stroke();if(v!==0){ctx.fillStyle="#8891a3";ctx.textAlign="center";ctx.fillText(v,px(v),Math.min(h-15,Math.max(12,py(0)+16)));ctx.textAlign="right";ctx.fillText(v,Math.min(w-5,Math.max(24,px(0)-7)),py(v)+3);}}
  if(state.showIntegral){ctx.beginPath();ctx.moveTo(px(-2),py(0));for(let i=0;i<=160;i++){const x=-2+i/40,y=evaluate(x);if(Number.isFinite(y))ctx.lineTo(px(x),py(y));}ctx.lineTo(px(2),py(0));ctx.closePath();ctx.fillStyle="rgba(101,88,217,.16)";ctx.fill();}
  function plot(fn,color,width){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineJoin="round";ctx.beginPath();let previous=null;for(let i=0;i<=w;i++){const x=min+i/w*(max-min),sy=py(fn(x));if(!Number.isFinite(sy)||Math.abs(sy)>h*4||(previous!==null&&Math.abs(sy-previous)>h)){previous=null;continue;}previous===null?ctx.moveTo(i,sy):ctx.lineTo(i,sy);previous=sy;}ctx.stroke();}
  plot(evaluate,colors[0],3);if(state.showDerivative)plot(x=>(evaluate(x+.0005)-evaluate(x-.0005))/.001,colors[1],2.2);
  if(state.showPoints){ctx.fillStyle=colors[0];[-2,-1,0,1,2].forEach(x=>{const y=evaluate(x);if(!Number.isFinite(y)||y<min||y>max)return;ctx.beginPath();ctx.arc(px(x),py(y),4.5,0,Math.PI*2);ctx.fill();});}
  legend.innerHTML=`<span><i style="background:${colors[0]}"></i>ƒ(x)</span>${state.showDerivative?`<span><i style="background:${colors[1]}"></i>ƒ′(x)</span>`:""}${state.showIntegral?`<span><i class="areaSwatch"></i>−2부터 2까지 넓이</span>`:""}`;
}
expressionInput.oninput=e=>{state.expression=e.target.value;draw();};
document.querySelectorAll("[data-range]").forEach(button=>button.onclick=()=>{state.range=Number(button.dataset.range);draw();});
["showPoints","showDerivative","showIntegral"].forEach(id=>document.getElementById(id).onchange=e=>{state[id]=e.target.checked;draw();});
document.getElementById("resetButton").onclick=()=>{state.params={a:1,b:1,h:0,k:0};buildSliders();draw();};
document.getElementById("printButton").onclick=()=>window.print();
document.getElementById("saveButton").onclick=()=>{const link=document.createElement("a");link.download=`${state.preset}-그래프.png`;link.href=canvas.toDataURL("image/png");link.click();};
buildLibrary();buildSliders();new ResizeObserver(draw).observe(canvas);draw();
