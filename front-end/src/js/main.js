import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase.js';

const provider = new GoogleAuthProvider();

const txtMessageElm = document.querySelector("#txt-message");
const btnSendElm = document.querySelector("#btn-send");
const outputElm = document.querySelector("#output");

const btnSignInElm = document.querySelector("#btn-sign-in");
const loginOverlayElm = document.querySelector("#login-overlay");
const accountElm = document.querySelector("#account");
const userNameElm = document.querySelector("#user-name");
const userEmailElm = document.querySelector("#user-email");
const btnSignOutElm = document.querySelector("#btn-sign-out");
const loaderElm = document.querySelector("#loader");

const { API_BASE_URL } = process.env;
const user = {
    email: null,
    name: null,
    picture:null
};

let ws = null;

accountElm.addEventListener('click', (e)=>{
    accountElm.querySelector("#account-details")
    .classList.remove('d-none');
    e.stopPropagation();
});

document.addEventListener('click', ()=> {
    accountElm.querySelector("#account-details")
        .classList.add('d-none');
});

btnSignOutElm.addEventListener('click', (e)=> {
    accountElm.querySelector("#account-details")
        .classList.add('d-none');
    e.stopPropagation();
    signOut(auth);
});

onAuthStateChanged(auth, (loggedUser) => {
    loaderElm.classList.add('d-none');
    if (loggedUser){
        user.email = loggedUser.email;
        user.name = loggedUser.displayName;
        user.picture = loggedUser.photoURL;
        finalizeLogin();
        loginOverlayElm.classList.add('d-none');
        if (!ws){
            ws = new WebSocket(`${API_BASE_URL}/messages`);
            ws.addEventListener('message', loadNewChatMessages);
            ws.addEventListener('error', ()=>{
                alert("Connection failure, try refreshing the application");
            });
        }
    } else{
        user.email = null;
        user.name = null;
        user.picture = null;
        loginOverlayElm.classList.remove('d-none');
        if (ws){
            ws.close();
            ws = null;
        } 
    }
});

btnSendElm.addEventListener('click', ()=>{
    const message = txtMessageElm.value.trim();
    if(!message) return;

    const msgObj = {
        message,
        email: UserActivation.email
    };
    console.log(msgObj)

    ws.send(JSON.stringify(msgObj));
    addChatMessageRecord(msgObj);
    outputElm.scrollTo(0, outputElm.scrollHeight);
    txtMessageElm.value='';
    txtMessageElm.focus();
    // fetch(`${API_BASE_URL}/messages`, {
    //     method: 'POST',
    //     headers: {
    //         "content-type": "application/json"
    //     },
    //     body: JSON.stringify(msgObj)
    // }).then(res => {
    //     if (res.ok) {
    //         addChatMessageRecord(msgObj);
    //         outputElm.scrollTo(0, outputElm.scrollHeight);
    //         txtMessageElm.value = '';
    //         txtMessageElm.focus();
    //     }
    //     else {
    //         alert("Failed to send the chat message, please try again.");
    //     }
    // }).catch(err => alert("Failed to connect with the server, please check the connection."));
});

function addChatMessageRecord({message, email}){
    const messageElm = document.createElement('div');
    messageElm.classList.add('message');
    if(email === UserActivation.email) {
        messageElm.classList.add('me');
    } else {
        messageElm.classList.add('others')
    }
    outputElm.append(messageElm);
    messageElm.innerText = message;
}


// function loadChatMessages(e){
//     fetch(`${API_BASE_URL}/messages`)
//     .then(req => req.json())
//     .then(chatMessages => {
//         Array.from(outputElm.children).forEach(child => child.remove());
//         chatMessages.forEach(msg => addChatMessageRecord(msg))
//     })
//     .catch(err => console.log(err));
// }


// setInterval(loadChatMessages, 1000);

// loadChatMessages();

function loadNewChatMessages(e){
    const msg = JSON.parse(e.data);
    addChatMessageRecord(msg);
}