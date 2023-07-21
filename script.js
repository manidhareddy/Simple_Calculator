console.log("welcome to calculator");

let buffer = "0" //screen
const screen = document.querySelector(".screen");
let runningTotal = 0;
let previousOperator = null;
function buttonClick(value){
    //console.log(value);
    //Need to handle numbers and symbols separatily
     if(isNaN(parseInt(value))){ //parse given value in to number and checking weather it is number or not a number(NaN)
        handleSymbol(value);
     }
     else{
        handleNumber(value);
     }
     rerender();
}


function handleNumber(value){
   // console.log("value");
   if(buffer === "0"){
    buffer = value;
    //console.log("zero");
   }
   else{
    buffer += value;
    //buffer = buffer + value
   }
   
}
 
function handleSymbol(value){
   // console.log("symbol");
   switch(value){
    case 'C':
        buffer = '0';
        break;
    case '=':
        //console.log("equals");
        if(previousOperator === null){
            return;
        }
        else{
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal= 0;
        }
        break;
    case "⬅" :
       // console.log("back arrow");
       if(buffer !== '0' && buffer.length > 1){
        buffer = buffer.substring(0,buffer.length-1);
       }
       else{
        buffer = '0';
       }
        break;
    case '➕':
    case "➖":
    case "✖":
    case "➗":
        console.log("math operations");
        handleMath(value);
        break;
   }
}

function handleMath(value){
    if(buffer === '0'){
        //do nothing
        return;
    }
    const intBuffer = parseInt(buffer);
    if(runningTotal === 0 ){
        runningTotal = intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = "0";
    console.log(runningTotal);
}

function flushOperation(intBuffer){
    switch(previousOperator){
        case "➕":
            runningTotal += intBuffer;
            break;
        case "➖":
            runningTotal -= intBuffer;
            break;
        case "✖":
            runningTotal *= intBuffer;
            break;
        case "➗":
            runningTotal /= intBuffer;
            break;//optional
    }
}

function init(){
    //event listener ->  event bubbling 
    document.querySelector(".calculator-buttons").addEventListener   ("click",function (event){
        buttonClick(event.target.innerText);
    });
}

function rerender(){
    screen.innerText = buffer;
}
init();
