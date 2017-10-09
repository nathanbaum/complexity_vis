
const canvas = document.getElementById("myChart");
const ctx = canvas.getContext('2d');
let dataWorker = undefined;
let myChart = undefined;

function getInput() {
  let noErr = true;
  let func, n, validate, iter, varArgNum, args = undefined;
  try {
    func = eval(document.getElementById("func").value);
  }
  catch(err) {
    noErr = false;
    alert("There was a problem with your function:\n"+err);
  }
  try {
    n = eval(document.getElementById("n").value);
  }
  catch(err) {
    noErr = false;
    alert("There was a problem with your n:\n"+err);
  }
  try {
    validate = eval(document.getElementById("validate").value);
  }
  catch(err) {
    noErr = false;
    alert("There was a problem with your validate:\n"+err);
  }
  try {
    iter = eval(document.getElementById("iter").value);
  }
  catch(err) {
    noErr = false;
    alert("There was a problem with your iterator:\n"+err);
  }
  try{
    varArgNum = eval(document.getElementById("varArgNum").value);
  }
  catch(err) {
    noErr = false;
    alert("There was a problem with your variable argument index:\n"+err);
  }
  try{
    args = eval(document.getElementById("args").value);
  }
  catch(err) {
    noErr = false;
    alert("There was a problem with your argument array:\n"+err);
  }

  if(noErr){
    if(myChart !== undefined) {myChart.destroy();}
    if (typeof(Worker) !== "undefined") {
    // Yes! Web worker support!
      document.getElementById("loading").width = '300';
      document.getElementById("loading").height = '300';
      if(dataWorker === undefined){
        dataWorker = new Worker('dataGen.js');
      }
      dataWorker.postMessage([document.getElementById("func").value, document.getElementById("n").value, document.getElementById("validate").value, document.getElementById("iter").value, document.getElementById("varArgNum").value, document.getElementById("args").value]);
      dataWorker.onmessage = function(m){
        document.getElementById("loading").width = '0';
        document.getElementById("loading").height = '0';
        drawGraph(m.data.result);
      }
    } else {
      drawGraph(time(func, n, validate, iter, varArgNum, ...args));
    }
  }
}

function drawGraph(myData) {
  const range = [];
  const scatterData = [];
  //const myData = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096];
  for(let i=0; i<myData.length; i++){
    const obj = {};
    obj.x = i;
    obj.y = myData[i];
    range.push(i);
    scatterData.push(obj);
  }

  myChart = new Chart(ctx, {
    "type":"scatter",
    "data":{
      "labels":range,
      "datasets":[
        {"label":"My Algorithm",
        "data":scatterData,
        "fill":false,
        "borderColor":"rgb(75, 192, 192)",
        "lineTension":0.1}
      ]},
      "options":{}
    });
}
