//
// 1. 이메일 폼 포커스

const inputEmailEl = document.querySelector('.input-email');
window.addEventListener('load', () => {
    inputEmailEl.focus();
});

// 2. 이메일 유효성 검사
// 영문과 @ 이메일 형식
const EMAIL_REGEX = new RegExp(
    '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'
);

const checkEmailValidation = (value) => {
    const isValidEmail = EMAIL_REGEX.test(value);
    console.log('email ', isValidEmail);
};

inputEmailEl.addEventListener('focusout', (e) =>
    checkEmailValidation(e.target.value)
);

// 3. 이름 유효성 검사
// 영문 소문자, 대문자, 한글만 가능
const NAME_REGEX = new RegExp('^[가-힣a-zA-Z]{2,}([·•]?[가-힣a-zA-Z]+)*$');
const inputNameEl = document.querySelector('.input-name');

const checkNameValidation = (value) => {
    const isValidName = NAME_REGEX.test(value);
    console.log('name ', isValidName);
};

inputNameEl.addEventListener('focusout', (e) =>
    checkNameValidation(e.target.value)
);

// 4. 비밀번호 유효성 검사
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$');
const inputPwEl = document.querySelector('.input-pw');

const checkPwValidation = (value) => {
    const isValidPw = PW_REGEX.test(value);
    console.log('pw ', isValidPw);
};

inputPwEl.addEventListener('focusout', (e) =>
    checkPwValidation(e.target.value)
);

// 5. 비밀번호 확인 유효성 검사
const inputPwCheckEl = document.querySelector('.input-pw-check');
const checkPwCheckValidation = (value) => {
    const isValidPwCheck = inputPwEl.value === value;
    console.log('pwcheck ', isValidPwCheck);
};

inputPwCheckEl.addEventListener('focusout', (e) =>
    checkPwCheckValidation(e.target.value)
);

// 6. 전체 유효성 검사
const signInBtnEl = document.querySelector('.sign-in-btn');
signInBtnEl.addEventListener('click', (e) => {
    e.preventDefault();
    checkEmailValidation(inputEmailEl.value);
    checkNameValidation(inputNameEl.value);
    checkPwValidation(inputPwEl.value);
    checkPwCheckValidation(inputPwCheckEl.value);
});
