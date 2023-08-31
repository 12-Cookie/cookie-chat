import app from './firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const inputEmailEl = document.querySelector('.input-email');

//화면 load시 email Input Focusing
window.addEventListener('load', () => {
    inputEmailEl.focus();
});

// console.log(app);

// 2. 이메일 유효성 검사
// 영문과 이메일 형식
const EMAIL_REGEX = new RegExp(
    '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'
);

const EMAIL_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '이메일 형식을 맞춰서 입력해주세요.',
};

const emailMsgEl = document.querySelector('.email-msg');
const checkEmailValidation = (value) => {
    let isValidEmail;
    if (value.length === 0) {
        isValidEmail = 'required';
    } else {
        isValidEmail = EMAIL_REGEX.test(value) ? true : 'invalid';
    }

    if (isValidEmail !== true) {
        inputEmailEl.classList.add('error');
        emailMsgEl.innerText = EMAIL_ERROR_MSG[isValidEmail];
    } else {
        inputEmailEl.classList.remove('error');
        emailMsgEl.innerText = '';
    }
    // console.log('email ', isValidEmail);
};
inputEmailEl.addEventListener('focusout', (e) =>
    checkEmailValidation(e.target.value)
);
//비밀번호 유효성검사
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$');
const inputPwEl = document.querySelector('.input-pw');
const pwMsgEl = document.querySelector('.pw-msg');

const PW_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '8~16자 영문 소/대문자, 숫자를 입력해주세요.',
};

const checkPwValidation = (value) => {
    let isValidPw;
    if (value.length === 0) {
        isValidPw = 'required';
    } else {
        isValidPw = PW_REGEX.test(value) ? true : 'invalid';
    }

    if (isValidPw !== true) {
        inputPwEl.classList.add('error');
        pwMsgEl.innerText = PW_ERROR_MSG[isValidPw];
    } else {
        inputPwEl.classList.remove('error');
        pwMsgEl.innerText = '';
    }

    // console.log('pw ', isValidPw);
};

inputPwEl.addEventListener('focusout', (e) =>
    checkPwValidation(e.target.value)
);
//로그인 성공 실패!
document
    .querySelector('.log-in-btn')
    .addEventListener('click', function (event) {
        event.preventDefault();
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, inputEmailEl.value, inputPwEl.value)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                alert('환영합니다');
                window.location.href = '../index.html';
                console.log(user);
            })
            .catch((error) => {
                console.log(typeof loginPassword);
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('error');
            });
    });
