const cellElements = document.querySelectorAll("[data-cell]");
let circleTurn; /* it will check whose turn it is. it is o's turn if true or x's turn if false*/
const x_class = "x";
const o_class = "o";
let board = document.getElementById("board");
let winningMessage = document.querySelector("[data-winning-Message-Text]");
let winningMessageElement = document.getElementById("winningMessage");
let restartButton = document.getElementById("restartButton");
const winningCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

startGame();

restartButton.addEventListener("click",startGame);
function startGame(){
    circleTurn=false;
    cellElements.forEach(cell => {
        cell.classList.remove(x_class);
        cell.classList.remove(o_class);
        cell.removeEventListener("click",handleClick);
        cell.addEventListener("click",handleClick,{ once: true})
    }) /* making single click event listener here*/
    setBoardHoverClass();
    winningMessageElement.classList.remove("show");
} //to start game for the first time and get hover effect

function handleClick(e){
    /* placemark
       check for win
       check for draw
       switch turns */

       const cell = e.target;
       let currentClass;
       if(circleTurn){
           currentClass=o_class;
       }
       else{
           currentClass=x_class;
       }

       placeMark(cell,currentClass);

       if(checkWin(currentClass)){
           endGame(false); //to check for draw
       }
       else if(isDraw()){
           endGame(true);
       } 
       else{
       swapTurns();
       setBoardHoverClass();
       }
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
} //marks current marked positrion

function swapTurns(){
    circleTurn = !circleTurn;
} //switches turns

function setBoardHoverClass(){
    board.classList.remove(x_class);
    board.classList.remove(o_class);
    if(circleTurn){
        board.classList.add(o_class);
    }
    else{
        board.classList.add(x_class);
    }
} //always call it after swap turns to show the current player's name

function checkWin(currentClass){
    return winningCombination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function endGame(draw){
    if(draw){
        winningMessage.innerText = "Match Draw!"
    }
    else{
        if(circleTurn){
            winningMessage.innerText = "O wins";
        }
        else{
            winningMessage.innerText = "X wins";
        }
    }

    winningMessageElement.classList.add("show");
}

function isDraw(){
    return [...cellElements].every(cell => { //destructuring cellelements into an array
        return cell.classList.contains(x_class) ||
        cell.classList.contains(o_class);
    })
}