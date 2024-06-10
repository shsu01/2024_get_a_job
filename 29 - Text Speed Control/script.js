const text = document.getElementById("text"); // 수정된 부분
const speedEl = document.getElementById("speed"); // 수정된 부분
const prog = "Sungilinfo High School Class 'get a job' of JavaScript";
let idx = 1;
let speed = 300 / speedEl.value; // 수정된 부분

// initial call
writeText();

function writeText() {
    text.innerText = prog.slice(0, idx); // 수정된 부분
    idx++;
    if (idx > prog.length) {
        idx = 1;
    }
    setTimeout(writeText, speed);
}

speedEl.addEventListener('input', (e) => { // 수정된 부분
    speed = 300 / e.target.value; // 수정된 부분
});
