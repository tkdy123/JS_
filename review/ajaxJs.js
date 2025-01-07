init();

// 최초 셋팅
function init() {
  // 각 태그의 이벤트 처리

  // 데이터를 가져오는 작업
  getUserList();
}

function getUserList() {
  // 회원 데이터 전체조회
  fetch('http://192.168.0.11:8099/userList')
    .then(res => res.json())
    .then(result => {
      // 통신의 결과가 도착했음을 의미
      addTbody(result); // 2
    })
    .catch(err => console.log(err));
  console.log('end'); // 1
}



function addTbody(list) {
  for (let info of list) {
    // <td/> 들을 감쌀 <tr/>이 필요
    let trTag = document.createElement('tr');
    trTag.addEventListener('click', function(event){

      let tr = event.currentTarget;
      let selectId = tr.children[1].textContent; // textContent = innerHTML
      findUserById(selectId);
    });

    

    // 번호
    let tdTag = document.createElement('td');
    tdTag.textContent = info.no;
    trTag.append(tdTag);
    // 아이디
    tdTag = document.createElement('td');
    tdTag.textContent = info.id;
    trTag.append(tdTag);
    // 이름
    tdTag = document.createElement('td');
    tdTag.textContent = info.name;
    trTag.append(tdTag);
    // 가입일자
    tdTag = document.createElement('td');
    tdTag.textContent = (info.joinDate).slice(0, 10);
    trTag.append(tdTag);


    //console.log(trTag);

    document.querySelector('#list tbody').append(trTag);
  }


}

// function addTbody(list) {
//   let tbodyTag = document.querySelector('#list tbody');
//   list.forEach(info => {
//     let trTag = addTrTag(info);
//     tbodyTag.append(trTag);
//   })
// }

function addTrTag(info) {

  let theads = ['no', 'id', 'name', 'joinDate'];

  let trTag = document.createElement('tr');
  for (let field of theads) {
    let tdTag = document.createElement('td');
    tdTag.textContent = (field == 'joinDate') ? (info[field]).slice(0, 10) : info[field];
    trTag.append(tdTag);
  }
  return trTag;
}

function findUserById(userId) {
  // 회원정보 조회
  fetch(`http://192.168.0.11:8099/userInfo?id=${userId}`)
    .then(response => response.json())
    .then(result => {
      getUserInfo(result);
    })
    .catch(err => console.log(err));
}

function getUserInfo(user) {
  console.log(user);

  // document.getElementsByName('no')[0].value = user.no;
  // document.getElementsByName('id')[0].value = user.id;
  // document.getElementsByName('password')[0].value = user.password;
  // document.getElementsByName('name')[0].value = user.name;
  // document.getElementsByName('gender')[0].value = user.gender;
  // document.getElementsByName('joinDate')[0].value = user.joinDate.slice(0, 10);

  for (let field in user) {
    if (field == 'joinDate') {
      document.getElementsByName(field)[0].value = (user[field]).slice(0, 10);
    } else {
      document.getElementsByName(field)[0].value = user[field];
    }
  }

}