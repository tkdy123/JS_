init();

// 최초 셋팅
function init() {
  // 각 태그의 이벤트 처리 : 처음부터 존재하는 태그만 가능
  // 데이터 초기화

  // 초기화 버튼
  $('#initBtn').on('click', function (event) {
  $('#info [name]').val('');
  })

  // 등록 버튼
  $('button#insertBtn').on('click', addUserInfo);
  // 수정 버튼
  $('button#updateBtn').on('click', updateUserInfo);
  // 삭제 버튼
  $('button#delBtn').on('click', deleteUserInfo);
  
  getUserList();

}

function getUserList() {
  // 서버가 가지고 있는 회원 데이터 전체조회
  $.ajax('http://192.168.0.11:8099/userList')
    .done(result => {
      addTbody(result);
    })
    .fail(err => console.log(err));
}

function addTbody(list) {
  // 기존의 데이터를 삭제
  $('#list tbody').empty();

  $.each(list, function (idx, info) {
    // console.log(info);
    // <td/> 들을 감쌀 <tr/>이 필요
    let trTag = $('<tr/>');
    // 새로 생성한 태그는 만든 직후 이벤트 처리가 가장 정확함

    trTag.on('click', function(event){
    // let selectTrTag = event.currentTarget;
    // let selectId = selectTrTag.children[1].textContent;
    // selectId = $(selectTrTag).children().eq(1).text(); // <= 제이쿼리
    // findUserById(selectId);

    let id = event.currentTarget.children[1].textContent;
    findUserById(id);
    });

    // 필요한 <td/>들 생성
    // 1) 번호
    let tdTag = $('<td/>');
    tdTag.text(info.no);
    trTag.append(tdTag);

    // 2) 아이디
    tdTag = $('<td/>');
    tdTag.text(info.id);
    trTag.append(tdTag);
    // 3) 이름
    tdTag = $('<td/>');
    tdTag.text(info.name);
    trTag.append(tdTag);
    // 4) 가입일자
    tdTag = $('<td/>');

    let formatDate = setDateFormat(info.joinDate);
    tdTag.text(formatDate);


    // tdTag.text(info.joinDate);

    trTag.append(tdTag);

    // console.log(trTag);
    // 새로운 태그를 화면에 출력 => document(DOM)에 추가 필요
    $('#list tbody').append(trTag);
    
  })
}

function setDateFormat(date) {
  // 날짜 포맷 변경 함수
  let dateObj = new Date(date);

  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDay();

  return `${year}년 ${month}월 ${day}일`
}

function findUserById(userId) {
  // 서버가 가지고 있는 회원들 중 지정한 항목으로 검색

  $.ajax(`http://192.168.0.11:8099/userInfo?id=${userId}`)
    .done(result => {
      getUserInfo(result);
    })
    .fail(err => console.log(err));
}

function getUserInfo(user) {
  for (let field in user) { // field 변수 : no, id, password, name, gender, joinDate 모든 필드명 사용 for in
    let fieldValue = field == "joinDate" ? (user[field]).slice(0,10) : user[field];
    $(`#info [name="${field}"]`).val(fieldValue);
  }
}

function getUserInfo(user) {
  $(`#info [name="no"]`).val(user.no);
  $(`#info [name="id"]`).val(user.id);
  $(`#info [name="password"]`).val(user.password);
  $(`#info [name="name"]`).val(user.name);
  $(`#info [name="gender"]`).val(user.gender);
  $(`#info [name="joinDate"]`).val(user.joinDate.slice(0,10));
}

function choiceUserInfo(user){
  let choicefields = [ 'no', 'id', 'name' ];

  for(let choice of choicefields){ // 일부 필드명 사용 for of 
    $(`#info [name="${choice}"]`).val(user[choice]);
  }
}

function addUserInfo(event){
  // 새로운 회원 정보를 서버에 등록
 
  // 1) 현재 입력된 회원정보 확인 : 모든 입력태그의 value 확인
  let userInfo = formUserInfo();
  console.log(userInfo);
  // 2) 서버에 전송 : AJAX
  $.ajax('http://192.168.0.11:8099/userInsert', {
    type : 'POST',
    // content-type : application/x-www-form-urlecoded
    data : userInfo
  })
   .done(result => {
    // 3) 서버 응답 후 처리작업
    // 3-1) 받아온 no 를 화면에 출력
    $(`#info [name="no"]`).val(result.no);
    // 3-2) 새로 등록한 회원 정보를 화면 목록에 출력
    getUserList();
   })
   .fail(err => console.log(err));
}

function formUserInfo(){
  // 현재 입력된 회원정보 확인 : 모든 입력태그의 value 확인
  // 1) 모든 입력 태그 검색 : input, select
  let tags = $('table#info [name]');
  
  // 2) 각 입력태그의 value 속성 값 가져오기
  let obj = {}; // 한 곳에 담을 바구니와 같은 역할
  tags.each(function(idx, tag){
    obj[tag.name] = tag.value;
  })
  return obj; 
}

function updateUserInfo(event){
  // 기존 회원 정보를 수정해서 서버에 반영
  let userInfo = formUserInfo();

  // 2) 서버에 전송 : AJAX
  $.ajax('http://192.168.0.11:8099/userUpdate',{
    type : 'POST',
    contentType : 'application/json',
    data : JSON.stringify(userInfo)
  })
  .done(result => {
    getUserList();
  })
  .fail(err => console.log(err));
}

function deleteUserInfo(){
  let userId = $('#info [name="id"]').val();
  $.ajax(`http://192.168.0.11:8099/userDelete?id=${userId}`)
  .done(result => {
    $('#info [name]').val('');
    getUserList();
  })
  .fail(err => console.log(err));
}