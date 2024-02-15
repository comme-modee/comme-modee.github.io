let input = document.getElementById("todo-input");
let inputAddBtn = document.querySelector(".add");
let taskBorad = document.querySelector(".task-board");
let taps = document.querySelectorAll(".tap");
let mode = "all";
let underline = document.getElementById("underline");
let todaysDate = document.querySelector(".title-date");
let todaysWeather = document.querySelector(".title-weather");


let taskList = [];
let ongoingList = [];
let doneList = [];

inputAddBtn.addEventListener("click", addTask);
window.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        addTask();
    }
})

taps.forEach((tab) => {
    tab.addEventListener("click", (e) => {
        filter(e);
        underlineSlide(e);
    })
})

function addTask(){
    if(input.value != "") {
        let task = {
            id: randomIDGenerate(),
            taskContent: input.value,
            isComplete: false,
        };
        taskList.push(task);
        ongoingList.push(task);
        
        render();
        input.value = "";
    } else {
        alert("할 일을 입력해주세요.")
    }
}
function render() {
    let list = [];
    if(mode === "all") {
        list = taskList;
    } else if (mode === "ongoing"){
        list = ongoingList;
    } else if (mode === "done") {
        list = doneList;
    }

    let resultHTML = "";
    if(!taskList.length && !ongoingList.length && !doneList.length) {
        taskBorad.style.display = "grid";
        taskBorad.innerHTML = `<img src="img/pen-icon.png" alt="">`
    } else {
        taskBorad.style.display = "block";
        list.forEach((task) => {
            if(task.isComplete == true) {
                resultHTML += `<div class="task">
                                    <p class="done">${task.taskContent}</p>
                                    <div class="edit">
                                        <span class="check" onclick="toggleComplete('${task.id}')"><i class="fa-solid fa-check"></i></span>
                                        <span class="delete" onclick="deleteTask('${task.id}')"><i class="fa-solid fa-trash"></i></span>
                                    </div>
                                </div>`
            } else {
                resultHTML += `<div class="task">
                                    <p>${task.taskContent}</p>
                                    <div class="edit">
                                        <span class="check" onclick="toggleComplete('${task.id}')"><i class="fa-solid fa-check"></i></span>
                                        <span class="delete" onclick="deleteTask('${task.id}')"><i class="fa-solid fa-trash"></i></span>
                                    </div>
                                </div>`
            }
        })
        taskBorad.innerHTML = resultHTML;
    }
}

function toggleComplete(id){
    taskList.forEach((task) => {
        if(task.id === id) {
            task.isComplete = !task.isComplete;
        }
    })
    taps.forEach((tap) => {
        if(underline.offsetLeft === tap.offsetLeft) {
            console.log("맞음");
            mode = tap.id;
            ongoingList = [];
            doneList = [];
            if(mode === "all") {
                render()
            } else if(mode === "ongoing") {
                taskList.forEach((task) => {
                    if(task.isComplete === false) {
                        ongoingList.push(task);
                    }
                })
                render()
            } else if(mode === "done") {
                taskList.forEach((task) => {
                    if(task.isComplete === true) {
                        doneList.push(task);
                    }
                })
                render()
            }
        }
    })
    render();
}

function deleteTask(id) {
    taskList.forEach((task, index) => {
        if(task.id === id) {
            taskList.splice(index, 1);
            ongoingList.splice(index, 1);
            doneList.splice(index, 1);
        }
    })
    render();
}

function filter(e) {
    mode = e.target.id;
    ongoingList = [];
    doneList = [];
    if(mode === "all") {
        render()
    } else if(mode === "ongoing") {
        taskList.forEach((task) => {
            if(task.isComplete === false) {
                ongoingList.push(task);
            }
        })
        render()
    } else if(mode === "done") {
        taskList.forEach((task) => {
            if(task.isComplete === true) {
                doneList.push(task);
            }
        })
        render()
    }
}

function underlineSlide(e) {
    underline.style.cssText = `width:${e.target.offsetWidth}px; left: ${e.target.offsetLeft}px;`
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substring(2,9);
}


//날씨 정보 받아오기
const API_key = '038c64f24b5e0e3aa10dd513abbdaf98';

const getWeather = async (lat, lon) => {
    try {
        let url = new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        let weather = data.weather[0].main;
        todaysWeather.innerHTML = `<img src="img/weather-icon/${weather}.png" alt="날씨아이콘" title="${weather}">`;
    } catch(error) {
        console.error("Error fetching weather data:", error);
    }
}

navigator.geolocation.getCurrentPosition( async (position) => {
    let { latitude: lat, longitude: lon } = position.coords;
    await getWeather(lat, lon);
});


const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '');
const day = today.getDate().toString().padStart(2, '');

todaysDate.innerHTML = `<p class="year">${year}</p><p class="date">${month}/${day}</p>`