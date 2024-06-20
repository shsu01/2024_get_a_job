let inputDir = { x: 0, y: 0 }; // 뱀의 이동 방향
let speed = 5; // 게임 속도
let lastPaintTime = 0; // 마지막으로 화면을 그린 시간
let snakeArr = [{ x: 13, y: 15 }]; // 뱀 배열 초기화
let food = { x: 6, y: 7 }; // 음식 초기 위치
let score = 0; // 점수 초기화
let hiscoreval = 0;
let scoreBox = document.getElementById('scoreBox');
let hiscoreBox = document.getElementById('hiscoreBox');

// 게임 함수
function main(ctime) {
    window.requestAnimationFrame(main); // 애니메이션 프레임 요청
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) return; // 지정된 속도에 따라 화면을 그리는 시간 조정
    lastPaintTime = ctime;
    gameEngine(); // 게임 로직 실행
}

// 충돌 확인 함수
function isCollide(snake) {
    // 자기 자신과 부딪혔는지 확인
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    // 벽과 부딪혔는지 확인
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) return true;
    return false;
}

// 게임 엔진 함수
function gameEngine() {
    // 뱀 배열 및 음식 업데이트
    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 }; // 뱀의 이동 방향 초기화
        alert("Game Over. Press Any Key To Continue"); // 게임 오버 메시지
        snakeArr = [{ x: 13, y: 15 }]; // 뱀 초기 위치
        score = 0; // 점수 초기화
        scoreBox.innerHTML = 'Score: ' + score; // 점수 표시 업데이트
    }

    // 음식과 충돌했는지 확인
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        score += 1; // 점수 증가
        if (score > hiscoreval) {
            hiscoreval = score; // 최고 점수 업데이트
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval)); // 로컬 스토리지에 저장
            hiscoreBox.innerHTML = "Hi Score: " + hiscoreval; // 최고 점수 표시 업데이트
        }
        scoreBox.innerHTML = 'Score: ' + score; // 현재 점수 표시 업데이트
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y }); // 뱀 길이 증가
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }; // 음식 위치 재설정
    }

    // 뱀 이동
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }; // 뱀의 몸통을 앞쪽으로 이동
    }
    snakeArr[0].x += inputDir.x; // 뱀 머리의 좌표 이동
    snakeArr[0].y += inputDir.y; // 뱀 머리의 좌표 이동

    // 뱀과 음식을 화면에 표시
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head'); // 뱀의 머리
        } else {
            snakeElement.classList.add('snake'); // 뱀의 몸통
        }
        board.appendChild(snakeElement);
    });

    // 음식 표시
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// 키 입력 이벤트
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }; // 게임 시작 후 이동 방향 설정
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
});

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
} else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hi Score: " + hiscoreval;
}

window.requestAnimationFrame(main); // 애니메이션 프레임 요청
