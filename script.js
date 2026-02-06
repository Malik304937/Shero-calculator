let display = document.getElementById("display");
let memory = 0;
let historyList = document.getElementById("historyList");
let canvas = document.getElementById("graph");
let ctx = canvas.getContext("2d");

// Button press
function press(value){ display.value += value; }
function clearDisplay(){ display.value=''; ctx.clearRect(0,0,canvas.width,canvas.height); }

// Calculate & add history
function calculate(){
  try{
    let result = eval(display.value);
    addHistory(display.value+" = "+result);
    display.value=result;
  }catch{ display.value="Error"; }
}

// Memory
function memoryAdd(){ try{ memory += eval(display.value); } catch{} }
function memorySubtract(){ try{ memory -= eval(display.value); } catch{} }
function memoryRecall(){ display.value = memory; }

// Copy
function copyResult(){ navigator.clipboard.writeText(display.value); alert("Copied!"); }

// Add to history
function addHistory(entry){ let li = document.createElement("li"); li.textContent=entry; historyList.prepend(li); }

// Theme
function setTheme(theme){ document.body.classList.remove("light-mode","dark-mode","colorful-mode"); document.body.classList.add(theme+"-mode"); }

// Keyboard
document.addEventListener('keydown',function(e){ 
  const key=e.key;
  if((key>='0'&&key<='9')||['+','-','*','/','.','%'].includes(key)) press(key);
  else if(key==='Enter') calculate();
  else if(key==='Backspace') display.value=display.value.slice(0,-1);
  else if(key.toLowerCase()==='c') clearDisplay();
});

// Plot graph
function plotGraph(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  let expr = display.value;
  ctx.beginPath();
  ctx.moveTo(0,canvas.height/2);
  for(let i=0;i<canvas.width;i++){
    let x = (i-canvas.width/2)/20; // scale
    let y;
    try{ y=eval(expr.replace(/x/g,x)); }catch{ y=0; }
    let py = canvas.height/2 - y*20; // scale
    ctx.lineTo(i,py);
  }
  ctx.strokeStyle="red";
  ctx.stroke();
}
