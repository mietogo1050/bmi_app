import{calculateBMI,getJudgement} from"./functions.js";

function renderHistory(){
    historyList.innerHTML = '';
    historyData.forEach((history) =>{
    const liElm = document.createElement('li');
    liElm.className = 'list-group-item d-flex justify-content-between align-items-center';
    liElm.innerHTML = `<span class=text-muted small>${new Date(history.date).toLocaleString('ja-JP')}</span><span>BMI:${history.bmi}</span><span>${history.judge}</span>`;
    historyList.appendChild(liElm);
    })
};

const heightInput = document.querySelector('Input#height');
const weightInput = document.querySelector('Input#weight');
const calcBtn = document.querySelector('button#calc-btn');
const bmiResult = document.querySelector('#bmi-result');
const historyList = document.querySelector('#history-list');


const savedData = localStorage.getItem('bmiHistory');
let historyData = savedData ? JSON.parse(savedData):[];

console.log(renderHistory);
renderHistory();
calcBtn.addEventListener('click',() => {   
const heightValue = heightInput.value;
const weightValue = weightInput.value;

if(heightValue === '' || weightValue === ''){
    alert('身長と体重を入力してください。');
    return; 
}
if(isNaN(heightValue) || isNaN(weightValue)){
    alert('身長と体重は半角数字で入力してください。');
    return; 
}

const bmi = calculateBMI(heightValue,weightValue);
bmiResult.innerText = bmi;

const judgeResult = document.getElementById('judgment-result');
const judgeInfo = getJudgement(bmi);

const today = new Date();
console.log(today);
const year = today.getFullYear();
const month = String(today.getMonth()+1).padStart(2,'0'); 
const date = String(today.getDate()).padStart(2,'0');
const time = String(today.getHours()).padStart(2,'0');
const min = String(today.getMinutes()).padStart(2,'0');
const sec = String(today.getSeconds()).padStart(2,'0');

console.log(year,month,date,time,min,sec);
const newRecord = {
    bmi:bmi,
    judge:judgeInfo,
    date:`${year}-${month}-${date}T${time}:${min}:${sec}`,
}

historyData.unshift(newRecord);
console.log(historyData);
localStorage.setItem('bmiHistory',JSON.stringify(historyData));

renderHistory();
});