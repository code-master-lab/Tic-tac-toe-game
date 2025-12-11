// ====== Selecting all required DOM elements ======
let boxes = document.querySelectorAll(".box"); // All tic-tac-toe cells
let resetBtn = document.querySelector("#reset-btn"); // Reset button
let newGameBtn = document.querySelector("#new-btn"); // New Game button
let msgContainer = document.querySelector(".msg-container"); // Message display container
let msg = document.querySelector("#msg"); // Message text

// ====== Game state variables ======
let turnO = true; // true: O's turn, false: X's turn
let count = 0; // To track number of moves for draw detection

// ====== All possible winning patterns (by box indices) ======
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// ====== Function to reset the game state and UI ======
const resetGame = () => {
  turnO = true; // O always starts
  count = 0; // Reset move count
  enableBoxes(); // Enable all boxes and clear their content
  msgContainer.classList.remove("show"); // Hide the message container with animation
  msgContainer.classList.add("hide");    // Re-hide for clean state
};

// ====== Main game logic: handle box clicks ======
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Set box text based on current turn
    if (turnO) {
      box.innerText = "O"; // O's turn
      turnO = false;       // Next turn is X
    } else {
      box.innerText = "X"; // X's turn
      turnO = true;        // Next turn is O
    }
    box.disabled = true; // Prevent further clicks on same box
    count++; // Increment count after each move

    // Check for winner after every move
    let isWinner = checkWinner(); // Returns true if winner found, else false

    // If count is 9 and no winner, it is a draw
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// ====== Show draw message and disable all boxes ======
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`; // Display draw message
  msgContainer.classList.add("show"); // Show with animation
  msgContainer.classList.remove("hide"); // Remove hide to display
  disableBoxes(); // Prevent further moves
};

// ====== Disable all boxes ======
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

// ====== Enable all boxes and clear their content ======
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// ====== Show winner message and disable all boxes ======
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`; // Display winner message
  msgContainer.classList.add("show"); // Show with animation
  msgContainer.classList.remove("hide"); // Remove hide to display
  disableBoxes(); // Prevent further moves
};

// ====== Check for a winner after each move ======
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [pos1, pos2, pos3] = pattern;
    let pos1Val = boxes[pos1].innerText;
    let pos2Val = boxes[pos2].innerText;
    let pos3Val = boxes[pos3].innerText;
    // Check if all positions are filled and equal
    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val); // Display winner and end game
      return true;         // Winner found
    }
  }
  return false; // No winner found
};

// ====== Attach event listeners to buttons ======
newGameBtn.addEventListener("click", resetGame); // New Game button resets the game
resetBtn.addEventListener("click", resetGame);   // Reset button resets the game
