/*
 변수의 데이터 타입 : 기본 타입 VS 참조 타입

 변수 선언
 1) var
 - 호이스팅 : 실제 선언 위치와 상관없이 자유롭게 사용 가능
 - 함수 스코프 
 - 중복 선언 허용

*/
console.log(1, text);
text = 'First';
console.log(3, text);
var text = 'Hello!';
console.log(2, text);

var text = 'Second';
console.log(4,text);

console.clear();

(function funcScope(){
  for(var i = 1; i<= 3; i++){
    for(var j = 1; j <= 3; j++){
      console.log(i,j,(i*j));
    }
  }
  console.log('last',i,j); // var에러 X let 에러 O
})();
//console.log(i); // var에러 O let 에러 O
/*
 2015년 이후부터 --
 2) let   : 변수
 3) const : 상수 => Object, Array의 경우 내부 값은 변경 가능
 - 공통점 : - 변수 선언 후 사용
            - 블록 스코프
            - 중복 선언 불가
*/
(function blockScope(){
  let x, y;
  for(let i = 1; i <= 3; i++){
    for(let j = 1; j <= 3; j++){
      console.log(`${i} X ${j} = ${(i * j)}`);
      y = j;
    }
    x = i;
  };
  console.log('last', x, y);
})();
/*
 변수의 데이터 타입 : NUMBER, STRING, OBJECT, ARRAY, BOOLEAN, ETC
 1) 기본 타입 : NUMBER, STRING BOOLEAN
 2) 참조 타입 : OBJECT, ARRAY
*/

// 1. 기본 타입
let name = 'Hong Kil-Dong';
let age = 28;
let isChecked = true;

let newName = 'Hong Kil-Dong';
let newAge = age;
let isSelected = isChecked;

newName = name;
newName = 'Kang Ho-Dong';
console.log(name);
console.log(newName);
// 2. 참조 타입

let person = {
  name : 'Hong Kil-Dong',
  age : 28,
  isChecked : true
};

let newPers =  person;

newPers.name = 'Han Sang-Kil';

console.log(person);
console.log(newPers);

// == 상수
const x = 1;
//x = 10; // Error Code

const y = {
  id : 'L',
  pwd : 1234
};

y.id = 'K';
y.pwd = 1024;
console.log(y);

// y = {}; // Error Code

/*
 - 값이 존재하지 않는 변수를 사용 했을 때
 undefined : 자바스크립트 -> 자동으로 해당 변수에 값이 존재하지 않다고 알려줄 때 사용
 null      : 개발자가 해당 변수의 값을 삭제
*/

let a;
console.log(a);
let b = null;
console.log(b);

/*
함수선언문 <=> var
function 이름(매개변수){

} return 반환값;

함수표현식 <=> const
const 이름 = function(매개변수){

} return 반환값;
*/
