let pwdLen = document.querySelector("[passwordLengthDigits]");
const pwdSlider = document.querySelector("[passwordSlider]");
let defaultLen =10;

    //  to set password default length

function handleSlider(){       
    pwdSlider.value=defaultLen;
    pwdLen.innerHTML = defaultLen;
}
handleSlider();

pwdSlider.addEventListener("input",(e)=>{
    defaultLen = e.target.value;
    handleSlider();    
})

//     set color of colorDetector

const c = document.querySelector("[colorDetector]");

function handleColor(color){
    c.style.backgroundColor = color;
}

function getRandom(min, max){
    return  Math.floor( Math.random() *( max - min) + min );
}
 

 

function getRandomInt(){
    return getRandom(0,9);
}
function getRandomSmallChar(){
    return String.fromCharCode(getRandom(97,123));
}
function getRandomLargeChar(){
    return String.fromCharCode(getRandom(65,91));
}

//    generating random symbols 

const symbols ="~!@#$%^&*()_+}{|:?><[]\/";
function getSymbols(){
    const n = getRandom(0,symbols.length);
    return symbols.charAt(n);
}

let uppercaseCheck= document.querySelector("#uppercase");
let lowercaseCheck = document.querySelector("#lowercase");
let numberCheck = document.querySelector("#numbers");
let symbolCheck = document.querySelector("#symbol")
let passDisplayy= document.querySelector("[passDisplay]");

function calculateStrength() {
    let upper = uppercaseCheck.checked;
    let lower = lowercaseCheck.checked;
    let num = numberCheck.checked;
    let sym = symbolCheck.checked;
    let pwdLen = parseInt(passDisplayy.value.length); // Ensure pwdLen is defined
    // console.log(typeof pwdLen);
    if (pwdLen < 8) {
        // console.log(pwdLen);
        handleColor("red"); // Weak password
    } else if ((upper && lower) && num && sym)  {
        handleColor("green"); // Medium strength
    } else if (upper && lower && (num || sym)) {
        handleColor("orange"); // Strong password
    } else {
        handleColor("brown"); // Default case
    }
}

let copyMessage = document.querySelector("[copyMsg]");
let passwordDisplay = document.querySelector("[passDisplay]");

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMessage.innerText= "copied";
     
        copyMessage.style.cssText="font-weight:500; font-size:16px; color:#213555; ";
    }catch(e){
        copyMessage.innerText = "failed";
    }
    
    setTimeout(()=>{
        copyMessage.innerText="";
    },1000);
     
    
}

let copyButton  = document.querySelector("[copyBtn]");

copyButton.addEventListener("click",()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

// generate password

let checkCount =0;

let allCheckBox = document.querySelectorAll('input[type="checkbox"');
allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener("change",() =>{
        changeCheckboxCount();
    })
});

function changeCheckboxCount(){
     
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked) 
            checkCount++;
    });
    // special case 

    if(pwdLen < checkCount) {
        pwdLen = checkCount;
        handleSlider();    
    }
}


let genePass = document.querySelector("[generatePassword]");

genePass.addEventListener("click",()=>{

    if(checkCount <= 0){ 
        console.log("no checkedbox is checked .");
        return ;
    }
    // console.log("checkCount stage");

    if(checkCount < pwdLen){
        pwdLen = checkCount;
        
    }handleSlider();

    //   remove the old password
    password ="";
    let funArr=[];         //   for storing the function 

    if(uppercaseCheck.checked) 
        funArr.push(getRandomLargeChar);
    if(lowercaseCheck.checked)
        funArr.push(getRandomSmallChar);
    if(numberCheck.checked)
        funArr.push(getRandomInt);
    if(symbolCheck.checked)
        funArr.push(getSymbols);
    
    //  complusory addition to password
    // console.log("complusory  addition");
    for(let i=0;i<funArr.length;i++){
        password+=funArr[i]();
    }

    //   remaining addition to password
    // console.log("remaining addition to password");
    // console.log(parseInt(pwdLen.innerHTML));
    // console.log(funArr.length);

    for(let k=0;k<(parseInt(pwdLen.innerHTML) - funArr.length); k++){
        let randomIndex = getRandom(0,funArr.length -1);
        // console.log("ghost");
        password += funArr[randomIndex]();
    }

    //    shuffling the password
    // console.log("shuffling");

    password = shufflePassword(password);

    //   displaying in UI
    
    passwordDisplay.value = password;

    //    calculating the strength of password
    // console.log("here calculate strength will be called");
    calculateStrength();
    // console.log("after strength checker function");

})

function shufflePassword(password) {
    let arr = password.split(''); // Convert password string into an array of characters
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Get a random index from 0 to i
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr.join(''); // Convert array back to string
}

// let dukee= document.querySelector(".duke");
// let ghost = document.querySelector(".okclickme");
// ghost.addEventListener("click",()=>{
//     dukee.style.backgroundColor="grey";
//     // dukee.firstChild.style.color="red";
// })

 