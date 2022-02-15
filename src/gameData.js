const game = () => {
  let board = [];
  let boardShips = {};
  const flushData = () => {
    board = [];
    initializeBoard();
    boardShips = {};
  };
  const initializeBoard = () => {
    board = [];
    for (let i = 0; i < 10; i++) {
      board.push([]);
      for (let j = 0; j < 10; j++) {
        board[i].push({ isHit: false,isPlaced: false,shipName:null});
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
    if (x < 0 || y > 9 || isNaN(x) || isNaN(y)) return false;
    if (type === "horizontal") {
      if(board[r][x].isPlaced){
        return false;
      }
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
      if(board[x][r].isPlaced){
        return false;
      }
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
  const setShipinBoard = (x, y, r, type,name) => {
    if (y < x) return false;
    if (checkPlacement(x, y, r, type)) {
      for (let j = x; j <= y; j++) {
        if(type === "horizontal"){
          board[r][j].isPlaced = true;
          board[r][j].shipName=name;
        }
        else{
          board[j][r].isPlaced = true;
          board[j][r].shipName=name;
        }
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
        boardShips[key].type,
        boardShips[key].name
      );
    }
  };
  const removeShipfromBoard = (x, y, r, type) => {
    for (let j = x; j <= y; j++) {
      if(type === "horizontal"){
        board[r][j].isPlaced = false;
        board[r][j].shipName=null;
      }
      else{
        board[j][r].isPlaced = false;
        board[j][r].shipName=null;
      }
    }
  };
  const randomizer = (staticShipsarr) => {
    flushData();
    let mainObj = {};
    staticShipsarr.forEach((d) => {
      let typeArr = ["horizontal", "vertical"];
      let x,
        y,
        r,
        type,
        obj,
        booler = false;
      let len = 0;
      while (booler === false) {
        if (len > 500) {
          updateBoard();
          break;
        }
        len++;
        x = +Math.floor(Math.random() * 10);
        y = x + d.size - 1;
        r = +Math.floor(Math.random() * 10);
        type = typeArr[Math.floor(Math.random() * 2)];
        obj = {
          name: d.name,
          type: type,
          index: [x, y, r],
          size: d.size,
        };
        booler = setShipinBoard(x, y, r, type,d.name);
      }
      if (len < 500) {
        obj = {
          name: d.name,
          type: type,
          index: [x, y, r],
          size: d.size,
        };
        mainObj[d.name] = obj;
        setShipObjinBoard(obj, d.name);
      }
    });
    return mainObj;
  };
  const setHit=(i,j,bool)=>{
    if(isNaN(i) || isNaN(j)) return;
    if(!(i>=0 && i<=9 && j>=0 && j<=9)) return;
    if(board[i][j].isHit) return;
    board[i][j].isHit=bool;
    if(board[i][j].isPlaced){
      if(i-1>=0 && j-1>=0){
        board[i-1][j-1].isHit=true;
      }
      if(i+1<=9 && j-1>=0){
        board[i+1][j-1].isHit=true;
      }
      if(i-1>=0 && j+1<=9){
        board[i-1][j+1].isHit=true;
      }
      if(i+1<=9 && j+1<=9){
        board[i+1][j+1].isHit=true;
      }
      boardShips[board[i][j].shipName].size--;
    }
    if(board[i][j].shipName && boardShips[board[i][j].shipName].size===0){
      const type=boardShips[board[i][j].shipName].type;
      let [x,y,r]=boardShips[board[i][j].shipName].index;
      if (type === "horizontal") {
        for (let j = x - 1; j <= y + 1; j++) {
          if (j <= 9) {
            if (j >= 0) {
              board[r][j].isHit=true;
            }
            if (j >= 0 && r + 1 <= 9) {
              board[r+1][j].isHit=true;
            }
            if (j >= 0 && r - 1 >= 0) {
              board[r-1][j].isHit=true;
            }
          }
        }
      }
      if (type === "vertical") {
        for (let j = x - 1; j <= y + 1; j++) {
          if (j <= 9) {
            if (j >= 0) {
              board[j][r].isHit=true;
            }
            if (j >= 0 && r + 1 <= 9) {
              board[j][r+1].isHit=true;
            }
            if (j >= 0 && r - 1 >= 0) {
              board[j][r-1].isHit=true;
            }
          }
        }
      }
    }
    return true;
  }
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
    flushData,
    randomizer,
    setHit
  };
};

export const gameData = game();
export const computer= game();