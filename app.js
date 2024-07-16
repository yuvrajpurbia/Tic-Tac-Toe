// Select all elements with the class "box" and store them in the boxes variable
let boxes = document.querySelectorAll(".box");

// Select the reset button element
let resetBtn = document.querySelector("#reset-btn");

// Select the new game button element
let newGameBtn = document.querySelector("#new-btn");

// Select the message container element
let msgContainer = document.querySelector(".msg-container");

// Select the message element
let msg = document.querySelector("#msg");

// Boolean to track the current turn: true for playerO, false for playerX
let turnO = true;

// Counter to track the number of moves made, used to check for a draw
let count = 0;

// Array containing the possible winning patterns (index positions in the boxes array)
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Function to reset the game
const resetGame = () => {
  // Reset the turn to playerO
  turnO = true;
  // Reset the move counter
  count = 0;
  // Enable all the boxes for a new game
  enableBoxes();
  // Hide the message container
  msgContainer.classList.add("hide");
};

// Add click event listeners to each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Check whose turn it is and set the box's text accordingly
    if (turnO) {
      box.innerText = "O";
      box.style.color = "Black";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    // Disable the box after it has been clicked
    box.disabled = true;
    // Increment the move counter
    count++;

    // Check if there is a winner after each move
    let isWinner = checkWinner();

    // If all boxes are filled and there is no winner, declare a draw
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Function to handle a draw
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Function to disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Function to enable all boxes and reset their text
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Function to display the winner
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Function to check for a winner based on the win patterns
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false; // Added this return statement to ensure the function returns a boolean value
};

// Add event listeners to the reset and new game buttons to reset the game when clicked
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
