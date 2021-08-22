// const loginForm = document.querySelector("#login-form"); // html의 login-form 을 가져온다.
// const loginInput = document.querySelector("#login-form input"); // login-form 의 input 값을 가져온다.
// const greeting = document.querySelector("#greeting");   // html의 greeting 값을 가져온다.

// const HIDDEN_CLASSNAME = "hidden";  // 이 두가지의 변수는 변수값이 String값이다, 이 문자가 어떠한 값으로 들어간다면
// const USERNAME_KEY = "username";    // 디량으로 사용할경우 실수의 가능성이 있기에 하나의 변수로 만들어 실수가 없게 만든다.

// function onLoginSubmit(e) {   // onLoginSubmit 이란 함수를 만들고, 거기에 event 인자를 추가한다.
//     e.preventDefault();    // preventDegfault()는 이벤트가 실행된 후 브라우저가 자동적으로 새로고침하는것을 막는다.
//     loginForm.classList.add(HIDDEN_CLASSNAME);  // html의 login-form 값에 "hidden" clss를 추가하기 위한 코드이다. 
//     localStorage.setItem(USERNAME_KEY, loginInput.value);  // localStorage에 username과 input.value를 추가하는 코드이다.
//     paintGreetings();  // paintGreetings() 를 실행한다. onLoginSubmit 함수가 실행되면 이 함수가 같이 실행되는 것이다. 
// }

// function paintGreetings(){  // paintGreetings 함수를 실행한다.
//     const username = localStorage.getItem(USERNAME_KEY);  // localStorage에 username을 추가하는 변수를 만든다.
//     greeting.innerText = `Hello ${username} !`  // 화면에 해당변수를 포함한 텍스트 형식을 출력한다.
//     greeting.classList.remove(HIDDEN_CLASSNAME);  //paintGreetings 함수가 실행되면 greeting 태그 안의 hidden class를 삭제한다.  
// }

// const savedUsername = localStorage.getItem(USERNAME_KEY);  // localStorage에 username을 추가하는 변수를 만들고

// if(savedUsername === null){      // 만약 이 변수에 아무것도 할당되어있지 않다면
//     // show the form
//     loginForm.classList.remove(HIDDEN_CLASSNAME);  // login-form 태그 안의 hidden class 를 삭제한다.
//     loginForm.addEventListener("submit", onLoginSubmit); // 그리고 submit 이벤트리스너를 실행하고 onLoginSubmit 함수를 실행한다.
// } else {
//     // show the greetings
//    paintGreetings(); // 그리고 안쪽에 값이 있다면, paintGreetings 함수를 실행시켜준다.
// }

// form의 input과 greetings 가져오기
const form = document.querySelector(".form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".greetings");

const USER_LS = "currentUser", 
    SHOWING_CN = "showing";

// 이름을 로걸저장소에 저장
function saveName(text){
    localStorage.setItem(USER_LS, text);
}

// 제출을 누르면 해당 값(이름)을 출력하고 저장
function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

// js-form이 보이게 해서 이름 물어보기
function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

// 이름 보여주기
function paintGreeting(text) {
    // 이름 물어보는거 안보이게 하기
    form.classList.remove(SHOWING_CN);
    // js-greeting 보이게 하기
    greeting.classList.add(SHOWING_CN);
    // 시간 받아오기
    const date = new Date();
    const hours = date.getHours();
    let mention = 'Hello';
    if(0<= hours && hours <= 4 || 20 < hours){
        // 시간이 0시~4시 이거나 20시 넘으면 굿나잇
        mention = 'Good night';
    } else if (hours<12){
        // 시간이 5시~12시이면 굿모닝
        mention = 'Good morning';
    } else{
        // 13시부터 20시까지는 굿애프터눈
        mention = 'Good afternoon';
    }
    // greeting에 innerText 넣어주기
    greeting.innerText = `${mention}, ${text}.`;
}

// 이름 불러오기
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    // 저장된 이름이 없으면 물어보기
    if(currentUser === null){
        askForName();
    }else{
        // 저장된 이름이 있으면 출력하기
        paintGreeting(currentUser);
    }
}
function init() {
    loadName();
}

init();