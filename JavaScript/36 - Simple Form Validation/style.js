// 입력 값이 비어있는지 확인하는 함수
const isBlank = function (value) {
    return value.trim() === '';
};

// 입력 값이 특정 길이 범위에 있는지 확인하는 함수
const isBetween = function (length, min = 5, max = 25) {
    return length >= min && length <= max;
};

// 오류 메시지를 설정하는 함수
const setError = function (input, message) {
    const parentElement = input.parentElement;
    parentElement.classList.remove("success");
    parentElement.classList.add("error");
    parentElement.querySelector("small").textContent = message;
};

// 성공 메시지를 설정하는 함수
const setSuccess = function (input) {
    const parentElement = input.parentElement;
    parentElement.classList.remove("error");
    parentElement.classList.add("success");
    parentElement.querySelector("small").textContent = '';
};

// 이메일 유효성을 검사하는 함수
const isValidEmail = function (email) {
    const format = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    return format.test(String(email).toLowerCase());
};

// 비밀번호의 안전성을 검사하는 함수
const isPasswordSecure = function (password) {
    const format = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    return format.test(String(password));
};

// 사용자 이름 유효성을 검사하는 함수
const isValidUserName = function (username) {
    const format = new RegExp(/^[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$/);
    return format.test(String(username).toLowerCase());
};

// 사용자 이름을 검증하는 함수
const validateUsername = function () {
    let isInputValid = false;
    const username = username_input.value.trim();
    if (isBlank(username)) {
        setError(username_input, "Username can't be blank.");
    } else if (!isValidUserName(username)) {
        setError(username_input, "Username is invalid.");
    } else if (!isBetween(username.length, 5, 25)) {
        setError(username_input, "Username must be between 5 and 25 characters.");
    } else {
        setSuccess(username_input);
        isInputValid = true;
    }
    return isInputValid;
};

// 이메일을 검증하는 함수
const validateEmail = function () {
    let isInputValid = false;
    const email = email_input.value.trim();
    if (isBlank(email)) {
        setError(email_input, "Email can't be blank.");
    } else if (!isValidEmail(email)) {
        setError(email_input, "Email is not valid.");
    } else {
        setSuccess(email_input);
        isInputValid = true;
    }
    return isInputValid;
};

// 비밀번호를 검증하는 함수
const validatePassword = function () {
    let isInputValid = false;
    const password = password_input.value.trim();
    if (isBlank(password)) {
        setError(password_input, "Password can't be blank.");
    } else if (!isPasswordSecure(password)) {
        setError(password_input, "Password must be at least 8 characters long and include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character (!@#$%^&*).");
    } else {
        setSuccess(password_input);
        isInputValid = true;
    }
    return isInputValid;
};

// 비밀번호 확인을 검증하는 함수
const validateConfirmPassword = function () {
    let isInputValid = false;
    const confirmPassword = confirm_password_input.value.trim();
    const password = password_input.value.trim();
    if (isBlank(confirmPassword)) {
        setError(confirm_password_input, "Please enter the password again.");
    } else if (password !== confirmPassword) {
        setError(confirm_password_input, "Password confirmation does not match.");
    } else {
        setSuccess(confirm_password_input);
        isInputValid = true;
    }
    return isInputValid;
};

// 디바운스 함수
const debounce = function (fn, delay = 500) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(null, args);
        }, delay);
    };
};

// 이벤트에 따라 적절한 검증 함수를 선택하여 실행
const selectValidatorToRun = function (event) {
    switch (event.target.id) {
        case "username_input":
            validateUsername();
            break;
        case "email_input":
            validateEmail();
            break;
        case "password_input":
            validatePassword();
            break;
        case "confirm_password_input":
            validateConfirmPassword();
            break;
    }
};

// 폼 제출 시 모든 검증 함수를 실행
signup_form.addEventListener("submit", function (event) {
    event.preventDefault();
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        alert("All good!");
    }
});

// 입력 이벤트 발생 시 디바운스된 검증 함수 실행
signup_form.addEventListener("input", debounce(selectValidatorToRun));
