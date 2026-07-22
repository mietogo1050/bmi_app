// 名前付きエクスポート

// 関数の定義
// BMI値を計算する関数
// 関心の分離：計算は計算のみでまとめる。数値の精査や変換は一緒にしない。なるべく小さい単位で定義する

// 自分の回答
// export function calculateBMI(heightValue,weightValue) {
//     if(parseInt(heightValue),parseInt(weightValue)){
//         Math.round(weightValue /(convertHeightValue * convertHeightValue)*100)/100;
//     } else {
//         alert('身長と体重を入力してください。');
//         return;
//     }
// };
// console.log(calculateBMI);


// 先生の回答
export const calculateBMI = (heightCm,weightKg) =>{
    const heightMeters = heightCm / 100;
    return Math.round(weightKg /(heightMeters * heightMeters)*100)/100
};


// 肥満度を判定する関数
export function getJudgement(bmi){
    let judgeResultText = '';
    if(bmi < 18.5){
    console.log('低体重');
    judgeResultText = '低体重';
    } else if (bmi < 25){
    console.log('普通体重');
    judgeResultText = '普通体重';
} else {
    console.log('肥満');
    judgeResultText = '肥満';
} 
return judgeResultText;
};

