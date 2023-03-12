//const { raw } = require("body-parser");

console.log("succeessss");
// logic flow:
//logic in cs : The sequence of operations performed by hardware or software
//1.유저에게서 아이디 입력 값을 받은 뒤, 
//2.입력 받은 값을, 로그인 버튼이 눌리면, 해당 
//값인 아이디, 비밀번호 들이 서버로 전달 됌.
 
//DOM : documnent object model == interface
// DOM 을 통하여,js 에서 html에 존재하는 데이터 값들을  가져와서 제어 할 수 있게됌.

//const id = document.querySelector("선택자")
// id 라는 변수 생성. 돔 이용 할 거니까 document에 접근.
// 그 다음 querySelector(직역: 질의 선택자) 가져오기.
// "html 의 선택자"의 값을 명시해서 ,  js 에서 'html' 값을
// 가져올 수 있음.
// 선택자(selector) == is a tag in html(or ejs) file.
// a developer get to create the selector.
const id_js = document.querySelector("#id"),
passWord_js = document.querySelector("#passWord"),
loginBtn_js = document.querySelector("button");
//loginBtn의 selector 는 ejs파일의 버튼 태그 'button'을
//그대로 갖다가 썼음.
//이유는 input 태그는 두개라서 구분짓기 위해 id를 이용해서 id값 할당했음. 

loginBtn_js.addEventListener("click", login);
//loginBtn_js 이 클릭되는 이벤트가 발생하면, 두번째 parameter 인 login 함수를 실행.
//

function login(){
    console.log("click 'event of loginBtn' happend");
    console.log(id.value);
    console.log(passWord.value);
    // 1.we are grabbing the value of 'id'. 

    //2.declare object to save these values of ids
    //into variable name 'req'
    //objects are variables too. but object can contain many values.
    //ex) 
    // const car = { 
    // type:"bmw", model: "300", color:"white"
    // };
    const req = {
        // key1: value1;
        // firstName: "claire"
        id_val: id.value,
        passWord_val: passWord.value,
    };
    console.log(req);
    
 

  //3. Now send the 'data of req object' to the server using fetch.
    // 브라우저에서 유저가 입력한 아이디, 비번을 서버에게 전달하는 네트워크 통신을 구현 ==fetch를 이용해서 req 값을 전달!
    //3-1: 어떤 경로로 보내 줄 지 정해줘야함. 프런트랑 서버가 어떤 경로에서 주고 받을 지 정해야 함.
    //
    console.log(JSON.stringfy(req));
    //JSON 파일 형태로 req 을 서버로 보내기 위해, req를 문자열로 바꿔준다음(stringfy)
    //JSON 으로 감싸주었음. == JSON. stringify( object )
 // body 를 통해서 http method 중에 POST method 로 서버로 전달 해 주어야 함.
 fetch("/login",{
    method: "POST",
    //header 를 이용해서 보내는 데이터 타입 명시. 여기서 데이터 타입 == json
    headers:{
        "Content-Type": "application/json",
    },
    body: JSON.Stringify(req),
 });
 // 지금 보낸 데이터를 서버가 받으려면, 라우트 폴더에서 API 를 만들어 놔야한다. 
 // 그 API를 통해 서버가 데이터를 받음.
}
