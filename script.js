// Программа определяет личную форму глагола (инфинитив глагола и местоимение вводится пользователем),
// учитывая наиболее регулярные правила спряжения глаголов. Не учитываются возвратные глаголы, глаголы двойственного спряжения,
// глаголы с беглыми гласными в корне и др.
// Результат выводится в консоль.


// массив личных местоимений
const pronArr = ['я', 'ты', 'он', 'мы', 'вы', 'они'];
// окончания первого спряжения
const verbEnd1 = ['ю', 'ешь', 'ет', 'ем', 'ете', 'ют'];
// окончания второго спряжения
const verbEnd2 = ['ю', 'ишь', 'ит', 'им', 'ите', 'ят'];
// чередующиеся согласные корня
const startLetters = 'сзджт';
// пары чередующихся согласных
const endLetters = 'шжжгч';
// щипящие согласные
const sizzlingLetters = 'чщшж';
// примеры глаголов: пилить красить листать грузить водить видеть делать лечить икать прощать
// задаем глагол
let verb = prompt('Введите глагол в неопределнной форме');
// задаем местоимение
let pron = prompt('Введите местоимение (возможны варианты "я", "ты", "он", "мы", "вы", "они")');
alert('Псмотрите результат спряжения в консоли');

// определяем спряжение глагола
const getConjugation = (verb) => {
    const incl1 = ['брить', 'стелить', 'зиждить'];
    const incl2 = ['гнать', 'держать', 'дышать', 'слышать', 'терпеть', 'вертеть', 'обидеть', 'зависеть', 'ненавидеть', 'видеть', 'смлтреть'];
    if (incl1.includes(verb)) {
        return 1;
    } else if (incl2.includes(verb)) {
        return 2;
    }
    let verbEnding = verb.slice(-3);
    return (verbEnding === 'ить') ? 2 : 1;
}

// получаем глагол в личной форме
const getResult = (verb, pron) => {
    let result; // результат
    let conj = getConjugation(verb); // спряжение
    let isLetterChanged = false; // менялась ли согласная в корне
    let resultEnding; // итоговое окончание глагола
    let verbBase = verb.slice(0, -3); // корень глагола
    let startBaseLetter = verbBase.slice(-1); // последняя согласная корня глагола
    let baseWithoutLetter = verb.slice(0, -4); // корень без последней согласной
    let verbSuffix = verb.slice(-3, -2); // суффикс глагола
    console.log('глагол:', verb);
    console.log('местоимение:', pron);
    console.log('спряжение:', conj);
    if( pron === 'я' && startLetters.includes(startBaseLetter)){
        let resultLetter = endLetters[startLetters.indexOf(startBaseLetter)];
        verbBase = `${baseWithoutLetter}${resultLetter}`;
        isLetterChanged = true;
    }
    if(conj === 1){
        let resultSuffix = (verbSuffix === 'а') ? 'а' : '';
        resultEnding = (isLetterChanged && pron === 'я' ) ? 'у' :  verbEnd1[pronArr.indexOf(pron)];
        result = `${verbBase}${resultSuffix}${resultEnding}`;
    } else if(conj === 2){
        resultEnding = verbEnd2[pronArr.indexOf(pron)];
        if(pron === 'я') {
            if(sizzlingLetters.includes(startBaseLetter) || isLetterChanged){
                resultEnding = 'у';
            }
        }
        result = `${verbBase}${resultEnding}`;
    }
    return result;
};

let result = getResult(verb, pron);
console.log('результат:', result);
