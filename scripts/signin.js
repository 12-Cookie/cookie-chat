import app from './firebase';
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const db = getFirestore(app); // Initialize Cloud Firestore and get a reference to the service

// 1. 이메일 폼 포커스
const inputEmailEl = document.querySelector('.input-email');
window.addEventListener('load', () => {
    inputEmailEl.focus();
});

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
};

inputEmailEl.addEventListener('focusout', (e) =>
    checkEmailValidation(e.target.value)
);

// 3. 이름 유효성 검사
// 영문 소문자, 대문자, 한글만 가능
const NAME_REGEX = new RegExp('^[가-힣a-zA-Z]{2,}([·•]?[가-힣a-zA-Z]+)*$');
const inputNameEl = document.querySelector('.input-name');
const nameMsgEl = document.querySelector('.name-msg');

const NAME_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '이름 형식이 올바르지 않습니다.',
};

const checkNameValidation = (value) => {
    let isValidName;
    if (value.length === 0) {
        isValidName = 'required';
    } else {
        isValidName = NAME_REGEX.test(value) ? true : 'invalid';
    }

    if (isValidName !== true) {
        inputNameEl.classList.add('error');
        nameMsgEl.innerText = NAME_ERROR_MSG[isValidName];
    } else {
        inputNameEl.classList.remove('error');
        nameMsgEl.innerText = '';
    }
};

inputNameEl.addEventListener('focusout', (e) =>
    checkNameValidation(e.target.value)
);

// 4. 비밀번호 유효성 검사
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
};

inputPwEl.addEventListener('focusout', (e) =>
    checkPwValidation(e.target.value)
);

// 5. 비밀번호 확인 유효성 검사
const inputPwCheckEl = document.querySelector('.input-pw-check');
const pwCheckMsgEl = document.querySelector('.pw-check-msg');

const PW_CHECK_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '비밀번호가 일치하지 않습니다.',
};

const checkPwCheckValidation = (value) => {
    let isValidPwCheck;
    if (value.length === 0) {
        isValidPwCheck = 'required';
    } else {
        isValidPwCheck = inputPwEl.value === value ? true : 'invalid';
    }

    if (isValidPwCheck !== true) {
        inputPwCheckEl.classList.add('error');
        pwCheckMsgEl.innerText = PW_CHECK_ERROR_MSG[isValidPwCheck];
    } else {
        inputPwCheckEl.classList.remove('error');
        pwCheckMsgEl.innerText = '';
    }
};

inputPwCheckEl.addEventListener('focusout', (e) =>
    checkPwCheckValidation(e.target.value)
);

// 6. 전체 유효성 검사
const signInBtnEl = document.querySelector('.sign-in-btn');

signInBtnEl.addEventListener('click', (e) => {
    signInBtnEl.disabled = 'true';
    e.preventDefault();
    const auth = getAuth(app);
    if (
        inputEmailEl.classList.contains('error') ||
        inputNameEl.classList.contains('error') ||
        inputPwCheckEl.classList.contains('error') ||
        inputPwEl.classList.contains('error')
    ) {
        signInBtnEl.disabled = 'false';
        alert('정보를 정확하게 입력해주세요.');
    } else {
        createUser(
            auth,
            inputEmailEl.value,
            inputPwEl.value,
            inputNameEl.value
        );
    }
    checkEmailValidation(inputEmailEl.value);
    checkNameValidation(inputNameEl.value);
    checkPwValidation(inputPwEl.value);
    checkPwCheckValidation(inputPwCheckEl.value);
});

function createUser(auth, email, pw, name) {
    createUserWithEmailAndPassword(auth, email, pw, name)
        .then(() => {
            updateUserName(auth.currentUser, inputNameEl.value);
        })
        .catch((error) => {
            const EMAIL_DUPLICATE_ERROR_CODE = 'auth/email-already-in-use';
            const errorCode = error.code;

            if (errorCode === EMAIL_DUPLICATE_ERROR_CODE) {
                alert('중복된 이메일이 존재합니다.');
                inputEmailEl.classList.add('error');
                emailMsgEl.innerText = '중복된 이메일이 존재합니다.';
                signInBtnEl.disabled = 'false';
            }
        });
}

function updateUserName(userInfo, userName) {
    updateProfile(userInfo, {
        displayName: userName,
    })
        .then(async () => {
            const data = {
                email: userInfo.email,
                name: userInfo.displayName,
                likes: [],
                uid: userInfo.uid,
            };
            await setDoc(doc(db, 'users', userInfo.uid), data);
            alert('회원가입이 완료되었습니다.');
            window.location.href = '../index.html';
        })
        .catch((error) => {
            console.log(error);
        });
}
