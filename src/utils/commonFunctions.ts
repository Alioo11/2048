export enum directions {
  left,
  right,
  up,
  down,
}

export interface Coor {
  x: number;
  y: number;
}

export const colorPlate = [];
// make a loop that the defaines what color each cell should be

export let BoardSize = 3;

export const animationDuration: number = 2000;

export const setBoardSize = (newBoardSize: number) => {
  BoardSize = newBoardSize;
};

function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

const radmonPossibleSpanningNumbers = [2, 4, 8, 16];

export const squize2 = (userInput: Array<number>): any => {
  let entry = userInput;
  let currentNode: number | null = null;
  // shows what is the last occupied number in the filled num
  let currentNodeIndex: number = 0;
  // shows index of the available stot in the array to put the number
  //inside (always shows an empty spot)
  let animationData: Array<object> = [];

  const swap = (num1: number, num2: number) => {
    const arr = entry;
    const tempState = arr[num1];
    arr[num1] = arr[num2];
    arr[num2] = tempState;
    return arr;
  };
  for (let i = 0; i < entry.length; i++) {
    if (entry[i] === -1) continue;
    else if (entry[i] === currentNode) {
      entry[i] = -1;
      entry[currentNodeIndex - 1] = entry[currentNodeIndex - 1] * 2;
      currentNode = currentNode * 2;
      animationData.push({
        from: i,
        to: currentNodeIndex - 1,
      });
    } else if (entry[i] !== currentNode) {
      currentNode = entry[i];
      swap(i, currentNodeIndex);
      currentNodeIndex += 1;
      animationData.push({
        from: i,
        to: currentNodeIndex - 1,
      });
    }
  }
  //return { entry, animationData };
  return entry;
};

export const slide = (
  board: Array<Array<number>>,
  direction: directions
): Array<Array<number>> => {
  if (direction === directions.up) {
    const newBoard: Array<Array<number>> = [];
    for (let i = 0; i < board.length; i++) {
      const col = [];
      for (let j = 0; j < board.length; j++) {
        col.push(board[j][i]);
      }
      newBoard.push(squize2(col));
    }
    const rotated = newBoard[0].map((val, index) =>
      newBoard.map((row) => row[index])
    );

    return rotated;
  } else if (direction === directions.left) {
    const newBoardcopy = [];
    for (let i = 0; i < board.length; i++) {
      const col = [];
      for (let j = 0; j < board.length; j++) {
        col.push(board[i][j]);
      }
      newBoardcopy.push(squize2(col));
    }

    board = newBoardcopy;

    return newBoardcopy;
  } else if (direction === directions.down) {
    const newBoard: Array<Array<number>> = [];
    for (let i = 0; i < board.length; i++) {
      const col = [];
      for (let j = 0; j < board.length; j++) {
        col.push(board[board.length - 1 - j][i]);
      }
      newBoard.push(squize2(col));
    }
    const Rerotated = [];
    for (let i = 0; i < board.length; i++) {
      const col = [];
      for (let j = 0; j < board.length; j++) {
        col.push(newBoard[j][i]);
      }
      Rerotated.unshift(col);
    }
    return Rerotated;
  } else if (direction === directions.right) {
    const newBoardcopy = [];
    for (let i = 0; i < board.length; i++) {
      const col = [];
      for (let j = 0; j < board.length; j++) {
        col.push(board[i][board.length - 1 - j]);
      }
      newBoardcopy.push(squize2(col));
    }

    const reRotated = [];
    for (let i = 0; i < board.length; i++) {
      const col = [];
      for (let j = 0; j < board.length; j++) {
        col.push(newBoardcopy[i][board.length - 1 - j]);
      }
      reRotated.push(col);
    }

    return reRotated;
  }
  return [[16, 16, 16, 16]];
};

const findEmptyCells = (board: Array<Array<number>>): Array<Array<number>> => {
  const emptyCells = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === -1) {
        emptyCells.push([i, j]);
      }
    }
  }

  return emptyCells;
};

export const addRandomItemtoBoard = (
  board: Array<Array<number>>
): Array<Array<number>> => {
  if (!board.flat().includes(-1)) {
    alert("you loose");
    window.location.reload();
  }

  const emptySpots = findEmptyCells(board);
  const selectedSpot: Array<number> =
    emptySpots[getRandomArbitrary(0, emptySpots.length)];

  const newBoard = [];
  for (let i = 0; i < board.length; i++) {
    const row = [];
    for (let j = 0; j < board.length; j++) {
      if (i === selectedSpot[0] && j === selectedSpot[1]) {
        row.push(
          radmonPossibleSpanningNumbers[
            getRandomArbitrary(0, radmonPossibleSpanningNumbers.length)
          ]
        );
      } else {
        row.push(board[i][j]);
      }
    }
    newBoard.push(row);
  }
  return newBoard;
};

// export const animationHandler = (userInput: Array<Array<number>>) => {
//   return new Promise((resolve, reject) => {
//     console.log(userInput);
//     setTimeout(() => {
//       resolve(null);
//     }, animationDuration);
//   });
// };

// export const animationHandler = (userInput: Array<Array<number>>) => {
//   return new Promise((resolve, reject) => {
//     console.log(userInput);
//     setTimeout(() => {
//       resolve(null);
//     }, animationDuration);
//   });
// };

export const squizeAnimations = (userInput: Array<number>): Array<object> => {
  let entry = userInput;
  let currentNode: number | null = null;
  let currentNodeIndex: number = 0;
  let animationData: Array<object> = [];

  const swap = (num1: number, num2: number) => {
    const arr = entry;
    const tempState = arr[num1];
    arr[num1] = arr[num2];
    arr[num2] = tempState;
    return arr;
  };

  for (let i = 0; i < entry.length; i++) {
    if (entry[i] === -1) continue;
    else if (entry[i] === currentNode) {
      entry[i] = -1;
      entry[currentNodeIndex - 1] = entry[currentNodeIndex - 1] * 2;
      currentNode = currentNode * 2;
      if (i !== currentNodeIndex - 1) {
        animationData.push({
          from: i,
          to: currentNodeIndex - 1,
        });
      }
    } else if (entry[i] !== currentNode) {
      currentNode = entry[i];
      swap(i, currentNodeIndex);
      currentNodeIndex += 1;
      if (i !== currentNodeIndex - 1) {
        animationData.push({
          from: i,
          to: currentNodeIndex - 1,
        });
      }
    }
  }
  //return { entry, animationData };
  //console.log(animationData);
  return animationData;
  //return entry;
};

export const getAnimationData = (
  board: Array<Array<number>>,
  direction: directions
): Array<Array<object>> | void => {
  if (direction === directions.up) {
    const newBoard: Array<Array<object>> = [];
    for (let i = 0; i < board.length; i++) {
      const col = [];
      for (let j = 0; j < board.length; j++) {
        col.push(board[j][i]);
      }
      newBoard.push(squizeAnimations(col));
    }
    const upAnimationData = newBoard[0].map((val, index) =>
      newBoard.map((row) => row[index])
    );
    console.log(upAnimationData);
    return upAnimationData;
  } else if (direction === directions.left) {
    const newBoardcopy = [];
    for (let i = 0; i < board.length; i++) {
      const col = [];
      for (let j = 0; j < board.length; j++) {
        col.push(board[i][j]);
      }
      newBoardcopy.push(squizeAnimations(col));
    }

    return newBoardcopy;
  } else if (direction === directions.down) {
    const newBoard: Array<Array<number>> = [];
    for (let i = 0; i < board.length; i++) {
      const col = [];
      for (let j = 0; j < board.length; j++) {
        col.push(board[board.length - 1 - j][i]);
      }
      newBoard.push(squize2(col));
    }
    const Rerotated = [];
    for (let i = 0; i < board.length; i++) {
      const col = [];
      for (let j = 0; j < board.length; j++) {
        col.push(newBoard[j][i]);
      }
      Rerotated.unshift(col);
    }
    //return Rerotated;
  } else if (direction === directions.right) {
    const newBoardcopy = [];
    for (let i = 0; i < board.length; i++) {
      const col = [];
      for (let j = 0; j < board.length; j++) {
        col.push(board[i][board.length - 1 - j]);
      }
      newBoardcopy.push(squize2(col));
    }

    const reRotated = [];
    for (let i = 0; i < board.length; i++) {
      const col = [];
      for (let j = 0; j < board.length; j++) {
        col.push(newBoardcopy[i][board.length - 1 - j]);
      }
      reRotated.push(col);
    }

    //return reRotated;
  }
  //return [[16, 16, 16, 16]];
};
