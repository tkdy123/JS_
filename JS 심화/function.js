// 1) 함수 선언문 : 호이스팅, 중복 선언 가능
console.log(firstPlus);

let result = firstPlus(10, 15);
console.log(result);

function firstPlus(x, y) {
  let sum = x + y ;
  return sum;
}

function firstPlus() {
  console.log('Overloading');
}