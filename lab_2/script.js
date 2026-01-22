const createCell = () => ({
  hasMine: false,
  neighbourMines: 0,
  state: "closed",
});

const createBoard = (rows, cols) =>
  Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => createCell())
  );

const GameState = {
  rows: 0,
  cols: 0,
  mines: 0,
  status: "in-progress",
  board: [],
};

const initTestBoard = () => {
  GameState.rows = 4;
  GameState.cols = 4;
  GameState.mines = 3;
  GameState.status = "in-progress";
  GameState.board = createBoard(GameState.rows, GameState.cols);

  const minePositions = [
    [0, 1],
    [2, 2],
    [3, 0],
  ];

  minePositions.forEach(([row, col]) => {
    GameState.board[row][col] = {
      ...GameState.board[row][col],
      hasMine: true,
    };
  });

  GameState.board[0][0] = { ...GameState.board[0][0], neighbourMines: 1 };
  GameState.board[0][2] = { ...GameState.board[0][2], neighbourMines: 1 };
  GameState.board[1][1] = { ...GameState.board[1][1], neighbourMines: 2 };
  GameState.board[2][1] = { ...GameState.board[2][1], neighbourMines: 3 };
  GameState.board[2][3] = { ...GameState.board[2][3], neighbourMines: 1 };
  GameState.board[3][1] = { ...GameState.board[3][1], neighbourMines: 1 };

  GameState.board[1][1] = { ...GameState.board[1][1], state: "open" };

  console.table(GameState.board);
};

initTestBoard();

