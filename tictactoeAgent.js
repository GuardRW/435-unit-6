// Tic Tac Toe
class Agent {
    constructor() {

    }

    minimax(board, isMaximizing, iterations) {
        // Prioritize swiftness
        iterations++;
        // Base cases - check if the game is over or a draw
        const gameOver = board.gameOver();
        if (gameOver === 1) {
            return 10 - iterations; // X wins
        } else if (gameOver === 2) {
            return -10 + iterations; // O wins
        } else if (gameOver === 3) {
            return 0; // the game is a draw
        }

        // Recursive case - evaluate all possible moves and choose the best score
            let bestScore = isMaximizing ? -Infinity : Infinity;
            for (let i = 0; i < board.cells.length; i++) {
                let cell = i + 1;
                if (board.cellFree(cell)) {
                    let newBoard = board.clone();
                    newBoard.move(cell);
                    let score = this.minimax(newBoard, !isMaximizing, iterations);
                    bestScore = isMaximizing ? Math.max(bestScore, score) : Math.min(bestScore, score);
                }
            }
            return bestScore;
    }

    selectMove(board) {
        // Define the initial best score and move
        let maxScore = -Infinity;
        let maxMove = null;

        let minScore = Infinity;
        let minMove = null;

        // Loop through each cell to evaluate the best move
        for (let i = 0; i < board.cells.length; i++) {
            let cell = i + 1;
            if (board.cellFree(cell)) {
                // Make a move on the current cell
                let newBoard = board.clone();
                newBoard.move(cell);

                // Calculate the score for the current move
                let score = this.minimax(newBoard, !board.playerOne, 0);

                // Update the best move if the current move has a higher score
                if (score > maxScore) {
                    maxScore = score;
                    maxMove = cell;
                }
                if (score < minScore) {
                    minScore = score;
                    minMove = cell;
                }
            }
        }

        return board.playerOne ? maxMove : minMove;
    }

}