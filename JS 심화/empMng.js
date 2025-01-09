init();

function init() {
  // 초기 셋팅

  document.getElementById('init').addEventListener('click', function (e) {

    // 초기화
    document.querySelectorAll('input').forEach(function (item) {
      item.value = '';
    })
  }) // 초기화

  // 등록
  document.getElementById('insert').addEventListener('click', insertEmp);
  // 수정
  document.getElementById('update').addEventListener('click', updateEmp);
  // 삭제
  document.getElementById('del').addEventListener('click', deleteEmp);


  getEmpList();
}

// 전체조회
function getEmpList() {

  fetch('http://192.168.0.11:8099/empList')
    .then(Response => Response.json())
    .then(result => {
      addEmpList(result);
    })
    .catch(err => console.log(err));
}

// 리스트 출력
function addEmpList(list) {

  for (let info of list) {
    let trTag = document.createElement('tr');

    trTag.addEventListener('click', function (e) {
      console.log(e.currentTarget.children[0].textContent);

      let selectEmpid = e.currentTarget.children[0].textContent;

      findEmp(selectEmpid);
    })
    //console.log(info);

    // 사원 번호
    let tdTag = document.createElement('td');
    tdTag.textContent = info.employeeId;
    trTag.append(tdTag);
    // 이름
    tdTag = document.createElement('td');
    tdTag.textContent = info.lastName;
    trTag.append(tdTag);
    // 업무
    tdTag = document.createElement('td');
    tdTag.textContent = info.jobId;
    trTag.append(tdTag);

    document.querySelector('#empList tbody').append(trTag);

  }
}


// 단건조회
function findEmp(empId) {
  // 선택
  fetch(`http://192.168.0.11:8099/empInfo?employeeId=${empId}`)
    .then(Response => Response.json())
    .then(result => {
      getEmpInfo(result);
    })
    .catch(err => console.log(err));
}

function getEmpInfo(empid) { 

  console.log(empid);
  // document.getElementsByName('employeeId')[0].value = empid.employeeId; // 사원 정보 중 사원번호
  // document.getElementsByName('lastName')[0].value = empid.lastName; // 사원 정보 중 이름
  // document.getElementsByName('email')[0].value = empid.email; // 사원 정보 중 이메일
  // document.getElementsByName('hireDate')[0].value = empid.hireDate; // 사원 정보 중 입사일자
  // document.getElementsByName('jobId')[0].value = empid.jobId; // 사원 정보 중 업무

  let tagList = document.querySelectorAll('#empInfo input');
  tagList.forEach(tag => {
    console.log(1, tag.name);
    tag.value = empid[tag.name];
    console.log(empid[tag.name]);
  });
}
// 등록

function formEmpInfo() {
  let empObj = {};

  empObj.employeeId = document.getElementsByName('employeeId')[0].value;
  empObj.lastName = document.getElementsByName('lastName')[0].value;
  empObj.email = document.getElementsByName('email')[0].value;
  empObj.hireDate = document.getElementsByName('hireDate')[0].value;
  empObj.jobId = document.getElementsByName('jobId')[0].value;

  return empObj;
}

function insertEmp(){
  let empInfo = formEmpInfo();

  fetch('http://192.168.0.11:8099/empInsert', {
    method : 'post',
    // content-type : application/x-www-form-urlencoded 
    body : new URLSearchParams(empInfo)
  })
  .then(Response => Response.json())
  .then(result => {
    getEmpList();
  })
  .catch(err => console.log(err));
}
// 수정
function updateEmp() {

  let empInfo = formEmpInfo();

  fetch('http://192.168.0.11:8099/empUpdate', {
    method : 'post',
    // content-type : application/json
    headers : {
      'content-type' : 'application/json'
    },
    body : JSON.stringify(empInfo)
  })
  .then(response => response.json())
  .then(result => {
    // 3) 화면 출력
    getEmpList();
  })
  .catch(err => console.log(err))
}
// 삭제
function deleteEmp(){
  let empInfo = formEmpInfo();

  let empId = empInfo.employeeId;

  console.log(empInfo.employeeId);
  fetch(`http://192.168.0.11:8099/empDelete?employeeId=${empId}`)
  .then(response => response.json())
  .then(result => {
    getEmpList();
  })
  .catch(err => console.log(err));
}