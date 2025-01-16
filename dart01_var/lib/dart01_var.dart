int calculate() {
  return 6 * 7;
}

printResult(int aNumber) {
  print('결과 : $aNumber'); // {} 안붙은 경우 : 변수값을 출력하는 경우
  print(' + 10 : ${aNumber + 10}'); // {} 붙은 경우 : 표현식(연산식)을 출력하는 경우
}
