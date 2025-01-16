// lib/type.dart

/*
 숫자 : num -> 정수 : int / 실수 : double
 문자열 : String, 유니코드 값 : Rune
 논리 : bool
 Null
*/

void printVariable() {
  num numVal = 10;
  int intVal = 100;
  double dubVal = 12.0;

  // 상속관계를 통한 자식 객체가 부모 객체로 타입변환
  numVal = intVal; // int -> num
  numVal = dubVal; // double -> num

  // intVal = dubVal; // double -> int
  // dubVal = intVal; // int -> double
}

/*
  컬렉션 : 변수가 여러개의 값을 가지는 경우
  List - 인덱스로 값을 구분, 값의 중복 허용
  Set - 식별자(구분) 역할이 없음, 값의 중복 불가
  Map - 키와 값을 한 쌍으로 저장, 키는 중복이 불가하나 값은 중복 허용
*/

void printCollection() {
  List<int> intList = [1, 1, 2, 2, 3];
  print('0 : ${intList[0]}');
  print('1 : ${intList[1]}');

  Set<int> sets = {1, 1, 1, 3};
  print('1의 포함유무 : ${sets.contains(1)}'); // 1이라는 값이 존재하는지 확인
  var list = sets.toList();
  print('list 타입으로 변환 : $list');

  Map<String, dynamic> map = {'name': 'Hong', 'age': 20};
  print(map['name']);
  print(map['age']);
  // print(map.name); // Error
}

void typeInterence() {
  // 타입추론 : 값을 기준 삼아 역으로 타입을 설정
  var first = 1; // 초기화 후에 타입 변경 불가
  //first = 'Hello';

  dynamic second = 1; // 초기화 후에 타입 변경 가능
  print('1 : ${second is int}');
  second = 'Hello';
  print('2 : ${second is String}');
  second = true;
  print('3 : ${second is bool}');
}

/*
  값을 담는 변수의 구분 : 변수 or 상수
    1) 초기화 후에도 값이 변경 될 수 있는 경우 : 변수
    2) 초기화 이후 값이 변경 되지 않는 경우 : 상수
  -> 리터럴 : 실제 값 그자체
*/
void printConstant() {
  /*
    dart의 상수 선언 방식 : final or const
    final 타입 변수명 = 초기값;
    const 타입 변수명 = 초기값;
    => 타입은 생략가능, 생략 시 dynamic 으로 선언
    => var은 함께 사용 불가
  */

  var val = 10;

  final finalVal = (1 + 10); // 11
  const constVal = (1 + 10); // 컴파일 시 리터럴 값을 가져야 함
}
