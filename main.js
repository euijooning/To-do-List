/**
 * [업무별 분담]
 * 유저가 값을 입력한다.
 * Add 버튼을 클릭하면, 할일이 추가된다.
 * Delete 버튼을 누르면 할일이 삭제된다.
 * Check 버튼을 누르면 할일이 끝나면서 밑줄이 쳐진다.
 * - 1) Check 버튼을 클릭하는 순간 true / false 
 * - 2) true면 끝난 걸로 간주하고 밑줄 보여주기
 * - 3) false면 끝나지 않은 걸로 간주하고, 그대로 두기
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
    // 각 임무들이 완료되었는지 진행중인지 상태 정보를 알고 있어야 하므로 객체를 활용
    // 어떤 임무인지 알아야 하므로 id 만들어서 부여
    let mission = {
        id: generateRandomID(),
        missionDetails: missionInput.value,
        isComplete: false
    };
    missionList.push(mission);
    render();
    console.log(missionList);
}


function render() {
    let resultHTML = '';
    for(let i=0; i<missionList.length; i++) {
        if(missionList[i].isComplete == true) {
            resultHTML += `<div class="missions">
            <div class = "mission-completed">${missionList[i].missionDetails}</div>
            <div>
                <button onclick="toggleChecked('${missionList[i].id}')">Check</button>
                <button onclick="deleteMission('${missionList[i].id}')">Delete</button>
            </div>
        </div>`
        }
        else {
            resultHTML += `<div class="missions">
            <div>${missionList[i].missionDetails}</div>
            <div>
                <button onclick="toggleChecked('${missionList[i].id}')">Check</button>
                <button onclick="deleteMission('${missionList[i].id}')">Delete</button>
            </div>
        </div>`
        }
    }
    document.getElementById("mission-board").innerHTML = resultHTML;
}


function toggleChecked(id) {
    // console.log("id: ", id);
    for(let i = 0; i<missionList.length; i++) {
        if(missionList[i].id == id) {
            missionList[i].isComplete = !missionList[i].isComplete;
            break;
        }
    }
    render();
}

function generateRandomID() {
    return Math.random().toString(36).substr(2, 12);
}

// Delete 버튼을 누르면 할일이 삭제된다.
function deleteMission(id) {
    for(let i = 0; i<missionList.length; i++) {
        if(missionList[i].id == id) {
            missionList.splice(i,1);
            break;
        }
    }    
    render();
}