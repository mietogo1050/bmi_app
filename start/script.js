import{calculateBMI,getJudgement} from"./functions.js";


// 履歴一覧を描画する関数
// DOM操作をしている関数は分けない！
function renderHistory(){
    historyList.innerHTML = '';
    historyData.forEach((history) =>{
    const liElm = document.createElement('li');
    liElm.className = 'list-group-item d-flex justify-content-between align-items-center';
    liElm.innerHTML = `<span class=text-muted small>${new Date(history.date).toLocaleString('ja-JP')}</span><span>BMI:${history.bmi}</span><span>${history.judge}</span>`;
    historyList.appendChild(liElm);
    })
};

// BMIを表示する要素を取得する bmiResult.innerText→bmiResultのinnerText の意

// let bmiResult = document.querySelector('#bmi-result');
// console.log(bmiResult.innerText);
// 要素のテキストを書き換える
// bmiResult.innerText = 20.76;


// letとconstの使いわけ

// const name = 'tanaka';
// name = 'suzuki';  
// 再代入
// console.log(name);

// 【Step 1】 基本的なDOM操作とイベント
// HTMLの要素を取得して、定数に代入しよう
// 例: const heightInput = document.getElementById('height');

// 1.身長の入力欄の要素を取得 querySelectorには、cssのセレクタを指定。今回はidを使用
const heightInput = document.querySelector('Input#height');

// 2.体重の入力欄の要素を取得
const weightInput = document.querySelector('Input#weight');

// 3.「計算する」ボタンの要素を取得
const calcBtn = document.querySelector('button#calc-btn');

// 4.計算結果を表示する要素を取得
const bmiResult = document.querySelector('#bmi-result');

// console.log(heightInput,weightInput,calcBtn,bmiResult);

// 5.計算履歴を表示する要素を取得
const historyList = document.querySelector('#history-list');

// 「計算する」ボタンがクリックされたときの処理を追加しよう
// 例: calcBtn.addEventListener('click', () => { ... });

// Webサイト上でユーザーが行う操作：Event



// 計算履歴保存用の配列(localStorageから読み込む）
const savedData = localStorage.getItem('bmiHistory');
// 三項(条件）演算子
let historyData = savedData ? JSON.parse(savedData):[];
// もしsavedDataが入っていたら、
// if(savedData){
//     historyData = JSON.parse(savedData);
// }
console.log(renderHistory);
// ページを開いた時に履歴を表示
renderHistory();

calcBtn.addEventListener('click',() => {   


// calcBtnがクリックされたときに実行したい処理
// console.log('クリックしました');

// 5.入力された身長の値を取得(weightInput.value → 入力欄の中にある値)
const heightValue = heightInput.value;
// // cmからmに変換
console.log(heightValue);


// 6.入力された体重の値を取得
const weightValue = weightInput.value;
console.log(weightValue);

// 追加機能2：入力値の検証
// 未入力のチェック 空文字は'' alertはpromptの仲間。入力はできない
if(heightValue === '' || weightValue === ''){
    alert('身長と体重を入力してください。');
    return; /* プログラムを終了させる */
}

// 数字かどうかのチェック isNAN
if(isNaN(heightValue) || isNaN(weightValue)){
    alert('身長と体重は半角数字で入力してください。');
    return; /* プログラムを終了させる */

}
// 身長の単位を変換
// const convertHeightValue = heightValue / 100;



// 7.BMIを計算する(体重[kg] ÷ 身長[m] × 身長[m] ）
// 四捨五入するにはMath.roundを使う

const bmi = calculateBMI(heightValue,weightValue);

// const bmi = Math.round( weightValue /(convertHeightValue * convertHeightValue)*100)/100;
// console.log(bmi);

// 8.計算結果をbmiResultに表示する

bmiResult.innerText = bmi;

// 追加機能（肥満度の判定） 条件分岐
// 1.肥満度を判定（低体重（18.5未満）、普通体重（18.5以上25未満）、肥満（25以上）

    // 1.表示領域の要素を取得
// const bmiResult = document.querySelector('#bmi-result');

// 取得したい要素にidがふってある場合は、以下でも取得ができる
// document.getElementById（'ID属性の値') ※#は不要

const judgeResult = document.getElementById('judgment-result');
// console.log(judgeResult);
const judgeInfo = getJudgement(bmi);

// 2.BMI値を基に肥満度を判定

// let judgeResultText = '';
// judgeResultText.innerHTML=judgeResult;
// if( bmi < 18.5){
//     console.log('低体重');
//     judgeResultText = '低体重';
// } else if (bmi < 25){
//     console.log('普通体重');
//     judgeResultText = '普通体重';
// } else {
//     console.log('肥満');
//     judgeResultText = '肥満';
// } 

// 3.判定結果を画面に表示
// judgeResult.innerText = judgeResultText;


// 追加機能3:計算履歴の表示

// 1.履歴のオブジェクトを作る(計算ボタンをクリックしたら、の中にある)
// 日付を取り扱うクラス Date()を使う
// 一桁の場合のゼロ埋めは、文字列にしてからpadStartを使う
// 表示したいデータを取得して、表示したい形に加工する

const today = new Date();
console.log(today);
const year = today.getFullYear();
const month = String(today.getMonth()+1).padStart(2,'0'); /* 月は、0始まりになっているので+1する */
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

// 2.履歴の配列にオブジェクトを入れる（addEventListenerの前で作る。ボタンをクリックすると新しいまっさらな欄が用意されるため。）
// 履歴は新しいものから表示する→配列の先頭に最新データを入れる
// 2 履歴の配列にオブジェクトを入れる
historyData.unshift(newRecord);
console.log(historyData);

// 2-2 historyData配列をbmiHistoryというキーでlocalStorageに保存
// const jsonString = JSON.stringfy(historyData);
localStorage.setItem('bmiHistory',JSON.stringify(historyData));


// 3.履歴一覧を画面に表示する
// 履歴一覧を空欄にする（履歴がたまりすぎるのを防止する）

// 日本語の言語コードで日付を整形する toLocaleString
// オプションで表示を整えることができる

// innerHTMLにすると、タグ要素を追加できる。bootstrapの装飾を追加(<span>の赤字）
// https://getbootstrap.jp/docs/5.3/components/list-group/#%E7%84%A1%E5%8A%B9%E5%8C%96

// historyList.innerHTML = '';
// for(let history of historyData){
//     const liElm = document.createElement('li');
//     liElm.className = 'list-group-item d-flex justify-content-between align-items-center';
//     liElm.innerHTML = `<span class=text-muted small>${new Date(history.date).toLocaleString('ja-JP')}</span><span>BMI:${history.bmi}</span><span>${history.judge}</span>`;
    // historyList.appendChild(liElm);
// }
renderHistory();
});

// 2.入力値チェック
//  i 未入力だったらエラー
//  ii 数字じゃなかったらエラー

// → 一連の処理の前に行う