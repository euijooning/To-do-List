/**
 * [업무별 분담]
 * 유저가 값을 입력한다.
 * Add 버튼을 클릭하면, 할일이 추가된다.
 * Delete 버튼을 누르면 할일이 삭제된다.
 * Check 버튼을 누르면 할일이 끝나면서 밑줄이 쳐진다.
 * In Progress / Completed 탭을 누르면, 언더바가 이동한다.
 * Completed 탭은 끝난 아이템만, In Progress 탭은 진행 중인 아이템만 나온다.
 * 전체 탭을 누르면 다시 전체 아이템으로 이동
 */

// 유저가 값을 입력한다.
let missionInput = document.getElementById("mission-input");

// Add 버튼을 클릭하면, 할일이 추가된다.
let addButton = document.getElementById("add-button");
let missionList = [];
addButton.addEventListener("click", addMission); // 클릭 이벤트 추가

function addMission() {
    let missionDetails = missionInput.value;
    missionList.push(missionDetails);
    render();
}


function render() {
    let resultHTML = '';
    for(let i=0; i<missionList.length; i++) {
        resultHTML += `<div class="missions">
        <div>${missionList[i]}</div>
        <div>
            <button>Check</button>
            <button>Delete</button>
        </div>
    </div>`
    }

    document.getElementById("mission-board").innerHTML = resultHTML;
}