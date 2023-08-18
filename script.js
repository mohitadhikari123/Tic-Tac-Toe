const cellElements = document.querySelectorAll('[data-cell]');

const X_CLASS = "x" 
const O_CLASS = "o"

const BOARD = document.getElementById("board");

const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]
const WINNING_MESSAGE_ELEMENT = document.getElementById("winningMessage");

const WINNING_MESSAGE_TEXT_ELEMENT = document.querySelector("[Data-winning-message-text]");

const RESTART = document.getElementById("restartButton");

let circleTurn;

startGame();

RESTART.addEventListener("click",startGame);

function startGame (){

    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS); // after restart is clicked
        cell.classList.remove(O_CLASS); // after restart is clicked
        cell.removeEventListener('click',handleClick); // after restart is clicked remove all events 
        cell.addEventListener("click", handleClick , {once:true})
    })

    setBoardHoverClass();
    WINNING_MESSAGE_ELEMENT.classList.remove("show") // after restart is clicked remove the winning screen
}

function handleClick(e) {
    const cell = e.target;

    const currentClass = circleTurn ? O_CLASS : X_CLASS;    

    placeMark(cell, currentClass); 
    // place mark
    // check for win
    if(checkWin(currentClass)){
        // console.log("Winner")
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
        switchTurns(); // seitch turns after each play

        setBoardHoverClass(); // changes the class of board to add hovering fot next player to place MARK
    }
    // cheack for draw

   
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function switchTurns(){
    circleTurn = !circleTurn;
}

function setBoardHoverClass () {
    BOARD.classList.remove(X_CLASS);
    BOARD.classList.remove(O_CLASS);
    if(circleTurn){
        BOARD.classList.add(O_CLASS);
    }
    else{
        BOARD.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })   
    })
}

function endGame(draw) {
    if(draw){
        WINNING_MESSAGE_TEXT_ELEMENT.innerText = "Draw !"
    }
    else{
        WINNING_MESSAGE_TEXT_ELEMENT.innerText = `${circleTurn ? "O's" : "X's"} Wins`
    }
    WINNING_MESSAGE_ELEMENT.classList.add("show");
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    })
}