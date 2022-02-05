const game = () => {
  let board = [];
  let boardShips = {};
  const flushData=()=>{
    board=[];
    initializeBoard();
    boardShips={};
  }
  const initializeBoard = () => {
    board = [];
    for (let i = 0; i < 10; i++) {
      board.push([]);
      for (let j = 0; j < 10; j++) {
        board[i].push({ isHit: false, isPlaced: false });
      }
    }
  };
  const getBoard = () => {
    return board;
  };
  const getBoardShips = () => {
    return boardShips;
  };
  const checkBoardShips = (shipname) => {
    return boardShips[shipname] ? true : false;
  };
  const checkPlacement = (x, y, r, type) => {
    if (x < 0 || y > 9) return false;
    if (type === "horizontal") {
      for (let j = x - 1; j <= y + 1; j++) {
        if (j <= 9) {
          if (j >= 0 && board[r][j].isPlaced) {
            return false;
          }
          if (j >= 0 && r + 1 <= 9 && board[r + 1][j].isPlaced) {
            return false;
          }
          if (j >= 0 && r - 1 >= 0 && board[r - 1][j].isPlaced) {
            return false;
          }
        }
      }
      return true;
    }
    if (type === "vertical") {
      for (let j = x - 1; j <= y + 1; j++) {
        if (j <= 9) {
          if (j >= 0 && board[j][r].isPlaced) {
            return false;
          }
          if (j >= 0 && r + 1 <= 9 && board[j][r + 1].isPlaced) {
            return false;
          }
          if (j >= 0 && r - 1 >= 0 && board[j][r - 1].isPlaced) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  };
  const setShipObjinBoard = (shipDatas, shipName) => {
    boardShips[shipName] = shipDatas;
  };
  const setShipinBoard = (x, y, r, type) => {
    if(y<x) return false;
    if (checkPlacement(x, y, r, type)) {
      for (let j = x; j <= y; j++) {
        type === "horizontal"
          ? (board[r][j].isPlaced = true)
          : (board[j][r].isPlaced = true);
      }
      return true;
    }
    return false;
  };
  const updateBoard = () => {
    initializeBoard();
    for (let key in boardShips) {
      setShipinBoard(
        +boardShips[key].index[0],
        +boardShips[key].index[1],
        +boardShips[key].index[2],
        boardShips[key].type
      );
    }
  };
  const removeShipfromBoard = (x, y, r, type) => {
    for (let j = x; j <= y; j++) {
      type === "horizontal"
        ? (board[r][j].isPlaced = false)
        : (board[j][r].isPlaced = false);
    }
  };
  initializeBoard();
  return {
    getBoard,
    getBoardShips,
    setShipObjinBoard,
    setShipinBoard,
    updateBoard,
    removeShipfromBoard,
    checkBoardShips,
    checkPlacement,
    flushData
  };
};

export const gameData = game();
