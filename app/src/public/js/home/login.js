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
    console.log("id.value: ",id.value);
    console.log("passWord.value: ", passWord.value);
    // 1.we are grabbing the value of 'id'. 

    //2.declare object to save these values of ids
    //into variable name 'req'
    //objects are variables too. but object can contain many values.
    //ex) 
    // const car = { 
    // type:"bmw", model: "300", color:"white"
    // };
    const req = {
        //declare obeject called 'req'
        // key1: value1;
        // firstName: "claire"
        id_val : id.value,
        passWord_val: passWord.value,
    };
      console.log(req);
      console.log("login.js msg : testing..! ");
      //#console.log(process.id_from_frontEnd);
 

  //3. Now send the 'data of req object' to the server using fetch.
    // 브라우저에서 유저가 입력한 아이디, 비번을 서버에게 전달하는 네트워크 통신을 구현 ==fetch를 이용해서 req 라는 값을 전달!
    //3-1: 일단 어떤 경로로 req값을 보내 줄 지 정해줘야함. 이는, 프런트 개발자가 해당 경로를 요청하기 전에,
    //그 해당 경로의 API가 만들어져있어야 함. 이거는 서버 개발자가 만들어 놓아야 함.
    //프런트랑 서버가 어떤 경로에서 주고 받을 지 정해야 함.
    //
    
    //JSON 파일 형태로 req 을 서버로 보내기 위해, req를 문자열로 바꿔준다음(stringfy)
    //JSON 으로 감싸주었음. == JSON. stringify( object )
 // body 를 통해서 http method 중에 POST method 로 서버로 전달 해 주어야 함.
 fetch("/login",{
    //fetch( first param== route to send 'req' value to server.), (sec param== the data we're sending it to the server.the data type is 'object type'.)
    // fetch 를 통해서 1)'login' 이라는 경로로, method 'Post'를 이용해서  오브젝트인'req'값을 보낼거고, ('req'는 오브젝트 데이터 형식임)
    //  body: req;  'body' 키값은 req. 'body'키를 이용해서 'req'를 서버에 보낼 것임. 근데 그 바디키 값을
    // json 타입으로 보내줄 것임. 그러기 위해 json 으로 'body' 감싸주기.
    // method strigify 는 '오브젝트 req' 를 문자열로 바꿔주는 메소드.
    // 그럼, 마지막으로, 'login' 경로로, 'POST' method를 통해 'req'을 받을 
    //( 서버 ) API 만 구축하면 된다.
 
    method: "POST",
    // 1.post 메소드로 body 안에 데이터를 넣고, http 요청을 보내주기.
    //header 를 이용해서 서버로 보내는 데이터 타입 명시. 여기서 데이터 타입 == json
    headers:{ 
        "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
    // ex) JSON.strigify(ID: "monday") ==> "ID": "Monday",
    // stringfy(): convert JS object into String.

     // 지금 보낸 데이터를 서버가 받으려면, 라우트 폴더에서 API 를 만들어 놔야한다. 
    // 그 API를 통해 서버가 데이터를 받음.
    // 이제, 서버에서 응답한 데이터를 다시 받기위해, then()로 'res'에 저장된 데이터를 가져올 수 있음.

 })
    .then((res) => res.json())
    .then((res) => console.log(res));

}
