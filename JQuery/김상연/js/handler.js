init();

// 최초 셋팅
function init() {
    empList();

    // 검색 버튼
    $('button#searchBtn').on('click', searchEmp)

    // 취소 버튼
    document.getElementById('resetBtn')
        .addEventListener('click', function (e) {
            document.querySelector('input[name="keyword"]').value = '';
        });

    // 등록, 수정
    $('button#saveBtn').on('click', function (event) {
        if ($('#info [name="boardNo"]').val() == '') {
            insertEmpInfo();
        } else if ($('#info [name="boardNo"]').val() != '') {
            updateEmpInfo();
        }
    });

    // 삭제
    $('button#delBtn').on('click', deleteEmpInfo)

    // 초기화 버튼
    document.getElementById('initBtn')
        .addEventListener('click', formInit);

}


// 초기화
function formInit() {
    let insertList = document.querySelectorAll('#info input');
    insertList.forEach(el => el.value = '');
}

function empList() {

    $.ajax(`http://192.168.0.11:8099/boardList`)
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
            let bno = event.currentTarget.children[0].textContent;
            findBoardNo(bno);
        })
        // 번호
        let tdTag = $('<td/>');
        tdTag.text(emp.boardNo);
        trTag.append(tdTag);
        // 제목
        tdTag = $('<td/>');
        tdTag.text(emp.boardTitle);
        trTag.append(tdTag);
        // 작성자
        tdTag = $('<td/>');
        tdTag.text(emp.boardWriter);
        trTag.append(tdTag);
        // 작성일
        tdTag = $('<td/>');
        tdTag.text(emp.boardRegdate);
        trTag.append(tdTag);

        $('#empList tbody').append(trTag);
    })
}

function searchEmp(event) {
    let searchOption = event.currentTarget.parentElement.children[1].value;
    let searchKeyword = event.currentTarget.parentElement.children[2].value;

    $.ajax(`http://192.168.0.11:8099/boardList?${searchOption}=${searchKeyword}`)
        .done(result => {
            addEmpList(result);
        })
        .fail(err => console.log(err));
}

function findBoardNo(bno) {
    $.ajax(`http://192.168.0.11:8099/boardInfo?boardNo=${bno}`)
        .done(result => {
            getBoardNo(result);
        })
        .fail(err => console.log(err));
}

function getBoardNo(bno) {
    for (let field in bno) {
        $(`#info [name="${field}"]`).val(bno[field]);
    }
}

function insertEmpInfo() {

    let empInfo = formEmpInfo();

    $.ajax('http://192.168.0.11:8099/boardInsert', {
            type: 'POST',
            data: empInfo
        })
        .done(result => {
            $('#info [name="boardNo"]').val(result.boardNo);
            empList();
        })
        .fail(err => console.log(err));
}

function formEmpInfo() {

    let obj = {};

    let tags = $('#info [name]');

    $.each(tags, function (index, tag) {
        obj[tag.name] = tag.value
    })
    return obj;
}

function updateEmpInfo() {
    let empInfo = formEmpInfo();

    $.ajax('http://192.168.0.11:8099/boardUpdate', {
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(empInfo)
        })
        .done(result => {
            empList();
        })
        .fail(err => console.log(err));
}

function deleteEmpInfo() {
    let bno = $('#info [name="boardNo"]').val();
    $.ajax(`http://192.168.0.11:8099/boardDelete?boardNo=${bno}`)
        .done(result => {
            alert(`삭제완료, ${bno}`)
            $('button#initBtn').click();
            empList();
        })
        .fail(err => console.log(err));
}