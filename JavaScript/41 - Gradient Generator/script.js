let colorOne = document.getElementById('color_one');
let colorTwo = document.getElementById('color_two');
let currentdir = "to top";
let outputcode = document.getElementById('code');

function setdirection(value, element) {
    let direction = document.querySelectorAll('.buttons button');
    direction.forEach(function (e) {
        e.classList.remove('active');
    });
    element.classList.add('active');
    currentdir = value;
}

function generate() {
    outputcode.value = `background-image: linear-gradient(${currentdir}, ${colorOne.value}, ${colorTwo.value});`;
    document.getElementById('body').style.backgroundImage = `linear-gradient(${currentdir}, ${colorOne.value}, ${colorTwo.value})`;
}

function copy(e) {
    e.preventDefault();
    outputcode.select();
    document.execCommand("copy");
    alert("Code copied to clipboard!");
}
