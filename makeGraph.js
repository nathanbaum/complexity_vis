
const ctx = document.getElementById("myChart").getContext('2d');

console.log('here!');
const myData = time(fomeFunc(),
  0,
  n => n<1000);

//console.log(myData);
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

const myChart = new Chart(ctx, {
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
