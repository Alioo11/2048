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
export const baseBum = 2;

export const animationDuration: number = 500;

enum animationTypes {
  linear = "linear",
  ease = "ease",
  ease_in = "ease-in",
  ease_out = "ease-out",
  ease_in_out = "ease-in-out",
}

const animationType = animationTypes.ease_in_out;

export const setBoardSize = (newBoardSize: number) => {
  BoardSize = newBoardSize;
};

function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

const radmonPossibleSpanningNumbers = [baseBum * 1, baseBum ** 2, baseBum ** 3, baseBum ** 4];

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

export const slide = (board: Array<Array<number>>, direction: directions): Array<Array<number>> => {
  console.log("slide is running");
  console.log(board);
  if (direction === directions.up) {
    const newBoard: Array<Array<number>> = [];
    for (let i = 0; i < board.length; i++) {
      const col = [];
      for (let j = 0; j < board.length; j++) {
        col.push(board[j][i]);
      }
      newBoard.push(squize2(col));
    }
    const rotated = newBoard[0].map((val, index) => newBoard.map((row) => row[index]));

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

export const addRandomItemtoBoard = (board: Array<Array<number>>): Array<Array<number>> => {
  if (!board.flat().includes(-1)) {
    alert("you loose");
    window.location.reload();
  }

  const emptySpots = findEmptyCells(board);
  const selectedSpot: Array<number> = emptySpots[getRandomArbitrary(0, emptySpots.length)];

  const newBoard = [];
  for (let i = 0; i < board.length; i++) {
    const row = [];
    for (let j = 0; j < board.length; j++) {
      if (i === selectedSpot[0] && j === selectedSpot[1]) {
        row.push(radmonPossibleSpanningNumbers[getRandomArbitrary(0, radmonPossibleSpanningNumbers.length)]);
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

export const squizeAnimations = (userInput: Array<number>): Array<Number> => {
  let entry = userInput;
  let currentNode: number | null = null;
  let currentNodeIndex: number = 0;
  let animationData: Array<Number> = [];

  const swap = (num1: number, num2: number) => {
    const arr = entry;
    const tempState = arr[num1];
    arr[num1] = arr[num2];
    arr[num2] = tempState;
    return arr;
  };

  for (let i = 0; i < entry.length; i++) {
    if (entry[i] === -1) {
      animationData.push(0);
    } else if (entry[i] === currentNode) {
      entry[i] = -1;
      entry[currentNodeIndex - 1] = entry[currentNodeIndex - 1] * 2;
      //currentNode = currentNode * 2;
      animationData.push(currentNodeIndex - i - 1);
    } else if (entry[i] !== currentNode) {
      currentNode = entry[i];
      swap(i, currentNodeIndex);
      currentNodeIndex += 1;
      animationData.push(currentNodeIndex - i - 1);
    }
  }
  return animationData;
};

const onWaiting = (delayTime?: number): Promise<null> => {
  return new Promise((res, rej) => {
    setTimeout(
      () => {
        res(null);
      },
      delayTime ? delayTime : 300
    );
  });
};

const getAnimationData = (board: Array<Array<number>>, direction: directions): Array<Array<Number>> => {
  let moveDirections: Array<Array<Number>> = [];
  switch (direction) {
    case directions.up: {
      const newBoard: Array<Array<Number>> = [];
      for (let i = 0; i < board.length; i++) {
        const col = [];
        for (let j = 0; j < board.length; j++) {
          col.push(board[j][i]);
        }
        newBoard.push(squizeAnimations(col));
      }
      moveDirections = newBoard[0].map((val, index) => newBoard.map((row) => row[index]));

      return moveDirections;
      break;
    }
    case directions.right: {
      for (let i = 0; i < board.length; i++) {
        const col = [];
        for (let j = 0; j < board.length; j++) {
          col.push(board[i][board.length - 1 - j]);
        }
        moveDirections.push(squizeAnimations(col).reverse());
      }
      break;
    }
    case directions.down: {
      const newBoard: Array<Array<Number>> = [];
      for (let i = 0; i < board.length; i++) {
        const col = [];
        for (let j = 0; j < board.length; j++) {
          col.push(board[board.length - 1 - j][i]);
        }
        newBoard.push(squizeAnimations(col));
      }
      for (let i = 0; i < board.length; i++) {
        const col = [];
        for (let j = 0; j < board.length; j++) {
          col.push(newBoard[j][i]);
        }
        moveDirections.unshift(col);
      }
      break;
    }
    case directions.left: {
      for (let i = 0; i < board.length; i++) {
        moveDirections.push(squizeAnimations(board[i]));
      }
      break;
    }
  }
  return moveDirections;
};

export const handleAnimations = async (HTMLInputs: any, board: Array<Array<number>>, direction: directions, boardSize: number) => {
  // handle animations
  // reset animations
  const filteredNodes = HTMLInputs.filter((item: HTMLDivElement) => item.firstChild);

  const moveData = getAnimationData(board, direction);
  const temp: any = moveData.flat();

  switch (direction) {
    case directions.up: {
      for (let i = 0; i < HTMLInputs.length; i++) {
        //console.log(HTMLInputs[i].firstChild);
        if (HTMLInputs[i].firstChild) {
          HTMLInputs[i].firstChild.style.transform = `translate(0px, ${temp[i] * (500 / boardSize + 2)}px)`;
          HTMLInputs[i].firstChild.style.transition = `all ${animationDuration - 100}ms ${animationType}`;
        }
      }
      break;
    }
    case directions.right: {
      const newArray = temp.map((item: number) => (item !== 0 ? -1 * item : 0));
      for (let i = 0; i < HTMLInputs.length; i++) {
        //console.log(HTMLInputs[i].firstChild);
        if (HTMLInputs[i].firstChild) {
          HTMLInputs[i].firstChild.style.transform = `translate(${newArray[i] * (500 / boardSize + 2)}px, 0px)`;
          HTMLInputs[i].firstChild.style.transition = `all ${animationDuration - 100}ms ${animationType}`;
        }
      }
      break;
    }
    case directions.down: {
      for (let i = 0; i < HTMLInputs.length; i++) {
        //console.log(HTMLInputs[i].firstChild);
        if (HTMLInputs[i].firstChild) {
          HTMLInputs[i].firstChild.style.transform = `translate(0px, ${-1 * temp[i] * (500 / boardSize + 2)}px)`;
          HTMLInputs[i].firstChild.style.transition = `all ${animationDuration - 100}ms ${animationType}`;
        }
      }
      break;
    }
    case directions.left: {
      for (let i = 0; i < HTMLInputs.length; i++) {
        //console.log(HTMLInputs[i].firstChild);
        if (HTMLInputs[i].firstChild) {
          HTMLInputs[i].firstChild.style.transform = `translate(${temp[i] * (500 / boardSize + 2)}px, 0px)`;
          HTMLInputs[i].firstChild.style.transition = `all ${animationDuration - 100}ms ${animationType}`;
        }
      }
      break;
    }
  }

  await onWaiting(animationDuration);
  for (let i = 0; i < HTMLInputs.length; i++) {
    //console.log(HTMLInputs[i].firstChild);
    HTMLInputs[i].firstChild && (HTMLInputs[i].firstChild.style.transform = "");

    HTMLInputs[i].firstChild && (HTMLInputs[i].firstChild.style.transition = "");
  }
};

const calculateRowScore = (row: Array<number>): number => {
  let entry = row;
  let currentNode: number | null = null;
  let currentNodeIndex: number = 0;
  let rowScore: number = 0;

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
    } else if (entry[i] !== currentNode) {
      currentNode = entry[i];
      rowScore += 1 * entry[i];
      swap(i, currentNodeIndex);
      currentNodeIndex += 1;
    }
  }
  return rowScore;
};

export const calculateScore = (board: Array<Array<number>>, direction: directions): any => {
  let totalScore: number = 0;
  for (let i = 0; i < board.length; i++) {
    totalScore += calculateRowScore(board[i]);
  }
  return totalScore;
};
