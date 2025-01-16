function jQueryFun(selector) {

  return {
    tagList: document.querySelectorAll(selector),
    val: function (data) {
      this.tagList.forEach(tag => {
        tag.value = data;
      })
    },
    text: function (data) {
      this.tagList.forEach(tag => {
        tag.textContent = data;
      })
    }
  }
}


init();

// 초기 세팅
function init() {

  // 전체조회
  findAllEmpList();

  // 초기화 버튼
  $('button#init').on('click', function (event) {
    $(`#empInfo [name]`).val('');
  })

  // 등록 버튼
  $('button#insert').on('click', insertEmp);

  // 수정 버튼
  $('button#update').on('click', updateEmpInfo);
  // 삭제 버튼
  $('button#del').on('click', deleteEmpInfo);
}

function findAllEmpList() {
  $.ajax('http://192.168.0.11:8099/empList')
    .done(result => {
      addEmpList(result);
    })
    .fail(err => console.log(err));
}

function addEmpList(list) {
  $('#empList tbody').empty();

  $.each(list, function (idx, emp) {
    let trTag = $('<tr/>');
    trTag.on('click', function (event) {
      let empId = event.currentTarget.children[0].textContent;
      findEmp(empId);
    })

    // 사원 번호
    let tdTag = $('<td/>');
    tdTag.text(emp.employeeId)
    trTag.append(tdTag);

    // 이름
    tdTag = $('<td/>');
    tdTag.text(emp.lastName);
    trTag.append(tdTag);

    // 업무
    tdTag = $('<td/>');
    tdTag.text(emp.jobId);
    trTag.append(tdTag);

    $('#empList tbody').append(trTag);
  })
}

// function addEmpList(list) {
//   $.each(list, function (index, info) {
//     let trTag = $('<tr/>');
//     trTag.on('click', getEmp)
//     let emplist = ['employeeId', 'lastName', 'jobId'];
//     for (let field of emplist) {
//       trTag.append(`<td>${info[field]}</td>`);
//     }
//     $('#empList tbody').append(trTag);
//   })
// }

// function getEmp(event) {
//   let trTag = event.currentTarget;
//   let firstTdTag = trTag.firstElementChild;
//   let eId = firstTdTag.textContent;

//   eId = event.currentTarget.trTag.firstElementChild.textContent;

//   findEmp(eId);
// }

function findEmp(empId) {
  $.ajax(`http://192.168.0.11:8099/empInfo?employeeId=${empId}`)
    .done(result => {
      getEmp(result);
    })
    .fail(err => console.log(err));
}

function getEmp(emp) {

  // $('#empInfo [name="employeeId"]').val(emp.employeeId);
  // $(`#empInfo [name="lastName"]`).val(emp.lastName);
  // $(`#empInfo [name="email"]`).val(emp.email);
  // $(`#empInfo [name="hireDate"]`).val(emp.hireDate);
  // $(`#empInfo [name="jobId"]`).val(emp.jobId);

  // let emplist = ['employeeId', 'lastName', 'email', 'hireDate', 'jobId']

  // for(let field of emplist){
  //   $(`#empInfo [name="${field}"]`).val(emp[field]);
  // }

  for (let field in emp) {
    $(`#empInfo [name="${field}"]`).val(emp[field]);
  }
}

function insertEmp() {
  // 현재 입력된 자료 가져오기
  let empInfo = formEmpInfo();

  // 새로 등록할 정보를 서버에 전송 : AJAX
  if ($('#empInfo [name="employeeId"]').val() != '') {
    alert('등록 실패');
    return;
  }

  $.ajax('http://192.168.0.11:8099/empInsert', {
      type: 'POST',
      // content-type : application/x-www.form-urlencoded
      data: empInfo
    })
    .done(result => {
      $('#empInfo [name="employeeId"]').val(result.employeeId);
      findAllEmpList();
    })
    .fail(err => console.log(err));
}

function formEmpInfo() {
  // 서버에 전송할 객체 생성
  let obj = {};

  let tags = $('#empInfo [name]');

  $.each(tags, function (index, tag) {
    obj[tag.name] = tag.value
  })
  return obj;

  // let obj = {};
  // obj.employeeId = $('#empInfo [name="employeeId"]').val();
  // obj.lastName = $(`#empInfo [name="lastName"]`).val();
  // obj.email = $(`#empInfo [name="email"]`).val();
  // obj.hireDate = $(`#empInfo [name="hireDate"]`).val();
  // obj.jobId = $(`#empInfo [name="jobId"]`).val();
  // return obj;
}

function updateEmpInfo() {
  // 현재 입력된 정보 가져오기
  let empInfo = formEmpInfo();


  if ($('#empInfo [name="employeeId"]').val() == '') {
    alert('수정불가');
    return;
  }
  // 수정할 정보를 서버에 전송 : AJAX
  $.ajax(`http://192.168.0.11:8099/empUpdate`, {
      type: 'POST',
      // content-type : application/json
      contentType: 'application/json',
      data: JSON.stringify(empInfo)
    })
    .done(result => {
      findAllEmpList();
    })
    .fail(err => console.log(err));

}

function deleteEmpInfo() {
   let empId = $('#empInfo [name="employeeId"]').val();
  // let empId = document.getElementsByName('employeeId')[0].value;

  if ($('#empInfo [name="employeeId"]').val() == '') {
    alert('삭제 실패');
    return;
  }

  $.ajax(`http://192.168.0.11:8099/empDelete?employeeId=${empId}`)
    .done(result => {
      $('button#init').click();
      findAllEmpList();
    })
    .fail(err => console.log(err));
}