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
// In Progress / Completed 탭을 누르면, 언더바가 이동한다.
let tabs = document.querySelectorAll(".mission-tabs div") // 여러 개를 선택해야 하므로

// Add 버튼을 클릭하면, 할일이 추가된다.
let addButton = document.getElementById("add-button");
let missionList = [];
addButton.addEventListener("click", addMission); // 클릭 이벤트 추가


let category = 'all-mission'; //초기값
let filterList = []; // 전역으로 변경

for(let i = 1; i<tabs.length; i++) {
    tabs[i].addEventListener("click", function(event){filter(event)})
}
// console.log(tabs)

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
    // 1. 내가 선택한 탭에 따라서
    // 2. 리스트를 달리 보여준다.
    let list = [];
    if(category === "all-mission") {
        list = missionList;
    } else if(category === "in-progress" || category === "completed-mission") {
        list = filterList;
    }
    
    let resultHTML = '';
    for(let i=0; i<list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML += `<div class="missions">
            <div class = "mission-completed">${list[i].missionDetails}</div>
            <div>
                <button onclick="toggleChecked('${list[i].id}')">Check</button>
                <button onclick="deleteMission('${list[i].id}')">Delete</button>
            </div>
        </div>`
        }
        else {
            resultHTML += `<div class="missions">
            <div>${list[i].missionDetails}</div>
            <div>
                <button onclick="toggleChecked('${list[i].id}')">Check</button>
                <button onclick="deleteMission('${list[i].id}')">Delete</button>
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
            updateFilterList();
            break;
        }
    }
    render();
}


function updateFilterList() {
    filterList = missionList.filter(mission => !mission.isComplete);
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


function filter(event) {
    console.log("filter", event.target.id);
    filterList = [];
    category = event.target.id;
    if(category == "all-mission") { 
        // 전체 리스트를 보여준다.
        render();
    }     
     else if(category == "in-progress") {
        // 진행중인 과업 리스트를 보여준다.
        // mission.isComplete=false
        for(let i = 0; i<missionList.length; i++) {
            if(missionList[i].isComplete === false) {
                filterList.push(missionList[i]);
            }
        }
        render();
        console.log("진행중", filterList)
    }
     else if(category =="completed-mission") {
        // 완료된 리스크를 보여준다.
        // mission.isComplete=true
        for(let i = 0; i<missionList.length; i++) {
            if(missionList.isComplete === true) {
                filterList.push(missionList[i]);
            }
        }
        render();
    }

}

function generateRandomID() {
    return Math.random().toString(36).substr(2, 12);
}
