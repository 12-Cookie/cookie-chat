import app from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function setHeaderName(){
    const signInOrName= document.querySelector('.signin-or-name');
    const signInLink=document.querySelector('.signin-link');

    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            //로그인 되있을 때
    
            signInLink.setAttribute('href','#');
            signInOrName.innerText= `${user.displayName}님`;
        } else {
            //로그인 안되있을 때
            signInOrName.innerText= '로그인';
    
            signInLink.setAttribute('./signin.html');
        }
      });
      
}
