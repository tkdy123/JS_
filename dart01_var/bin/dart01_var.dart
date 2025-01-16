// 지정한 패키지 내의 라이브러리를 사용하고자 할 때 import
import 'package:dart01_var/dart01_var.dart' as dart01Lib;
// as 변수명 : 선택사항 => 해당 라이브러리를 변수에 담음

// 함수 선언
int add(int a, int b) {
  return a + b;
}

void main(List<String> arguments) {
  // print('Hello world: ${dart01Lib.calculate()}!');
  var numberA = 10; // 변수 선언 및 초기화, 타입 추론
  int numberB = 25; // 변수 선언 및 초기화, 타입 명시
  int result = add(numberA, numberB); // 함수 호출
  print(result); // 라인 단위로 출력
  // lib 폴더 내 dart01_var.dart 안에 선언한 printResult() 함수를 호출
  dart01Lib.printResult(result);
  print('프로그램 종료');
}
