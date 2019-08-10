/**
 * https://leetcode-cn.com/problems/sudoku-solver/submissions/
 * 37. 解数独
 * 编写一个程序，通过已填充的空格来解决数独问题。
 * 一个数独的解法需遵循如下规则：
 *  数字 1-9 在每一行只能出现一次。
 *  数字 1-9 在每一列只能出现一次。
 *  数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
 * 空白格用 '.' 表示。
 * Note:
 *  给定的数独序列只包含数字 1-9 和字符 '.' 。
 *  你可以假设给定的数独只有唯一解。
 *  给定数独永远是 9x9 形式的。
 */
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  solve(board);
};

function solve(board) {
  var res = simplify(board);
  if (res.left === 0) {
    return true;
  } else {
    for (var i = 0; i < res.minMaybe; i++) {
      var testBoard = copy(board);
      var res2 = simplify(testBoard, true, res.minMaybe, i);
      if (res2.minMaybe < 1) {
        continue;
      } else if (res2.left === 0 || solve(testBoard)) {
        simplify(board, true, res.minMaybe, i);
        return solve(board);
      }
    }
    return false;
  }
}

function setEmpty(item) {
  for (var i = 1; i < 10; i++) {
    if (!item.filled.has(i + '')) {
      item.empty.add(i + '');
    }
  }
}

function copy(board) {
  var res = [];
  board.forEach(row => {
    res.push(row.slice());
  });
  return res;
}

function simplify(board, test, range, testIndex) {
  var emptys = new Map(), x, y, b;
  var rows = [], cols = [], blocks = [];
  for (y = 0; y < 9; y++) {
    const row = {
      filled: new Set(),
      empty: new Set(),
    };
    rows.push(row);
    for (x = 0; x < 9; x++) {
      if (board[y][x] !== '.') {
        row.filled.add(board[y][x]);
      }
    }
    setEmpty(row);
  }
  for (x = 0; x < 9; x++) {
    const col = {
      filled: new Set(),
      empty: new Set(),
    };
    cols.push(col);
    for (y = 0; y < 9; y++) {
      if (board[y][x] !== '.') {
        col.filled.add(board[y][x]);
      }
    }
    setEmpty(col);
  }
  for (b = 0; b < 9; b++) {
    const block = {
      filled: new Set(),
      empty: new Set(),
    }
    blocks.push(block);
    var startX = b % 3 * 3, startY = Math.floor(b / 3) * 3;
    for (var y = 0; y < 3; y++) {
      for (var x = 0; x < 3; x++) {
        const char = board[startY + y][startX + x];
        if (char !== '.') {
          block.filled.add(char);
        }
      }
    }
    setEmpty(block);
  }
  for (y = 0; y < 9; y++) {
    for (x = 0; x < 9; x++) {
      if (board[y][x] === '.') {
        emptys.set(`${x},${y}`, {x, y, b: Math.floor(y / 3) * 3 + Math.floor(x / 3)});
      }
    }
  }

  function tryInRow(y, num) {
    var maybe = [], x;
    for (x = 0; x < 9; x++) {
      if (board[y][x] === '.') {
        if (cols[x].empty.has(num) && blocks[Math.floor(y / 3) * 3 + Math.floor(x / 3)].empty.has(num)) {
          maybe.push(x);
        }
      }
    }
    if (maybe.length === 1) {
      x = maybe[0];
    } else if (test && maybe.length === range) {
      test = false;
      x = maybe[testIndex];
    } else {
      return maybe.length;
    }
    block = blocks[Math.floor(y / 3) * 3 + Math.floor(x / 3)];
    rows[y].filled.add(num);
    rows[y].empty.delete(num);
    cols[x].filled.add(num);
    cols[x].empty.delete(num);
    block.filled.add(num);
    block.empty.delete(num);
    board[y][x] = num;
    emptys.delete(`${x},${y}`);
    return 1;
  }

  function tryInCol(x, num) {
    var maybe = [], y;
    for (y = 0; y < 9; y++) {
      if (board[y][x] === '.') {
        if (rows[y].empty.has(num) && blocks[Math.floor(y / 3) * 3 + Math.floor(x / 3)].empty.has(num)) {
          maybe.push(y);
        }
      }
    }
    if (maybe.length === 1) {
      y = maybe[0];
    } else if (test && maybe.length === range) {
      test = false;
      y = maybe[testIndex];
    } else {
      return maybe.length;
    }
    block = blocks[Math.floor(y / 3) * 3 + Math.floor(x / 3)];
    rows[y].filled.add(num);
    rows[y].empty.delete(num);
    cols[x].filled.add(num);
    cols[x].empty.delete(num);
    block.filled.add(num);
    block.empty.delete(num);
    board[y][x] = num;
    emptys.delete(`${x},${y}`);
    return 1;
  }

  function tryInBlock(b, num) {
    var maybe = [], x, y;
    var startX = b % 3 * 3, startY = Math.floor(b / 3) * 3;
    for (var y = 0; y < 3; y++) {
      for (var x = 0; x < 3; x++) {
        if (board[startY + y][startX + x] === '.') {
          if (rows[startY + y].empty.has(num) && cols[startX + x].empty.has(num)) {
            maybe.push({x, y});
          }
        }
      }
    }
    if (maybe.length === 1) {
      x = maybe[0].x + startX;
      y = maybe[0].y + startY;
    } else if (test && maybe.length === range) {
      test = false;
      x = maybe[testIndex].x + startX;
      y = maybe[testIndex].y + startY;
    } else {
      return maybe.length;
    }
    rows[y].filled.add(num);
    rows[y].empty.delete(num);
    cols[x].filled.add(num);
    cols[x].empty.delete(num);
    blocks[b].filled.add(num);
    blocks[b].empty.delete(num);
    board[y][x] = num;
    emptys.delete(`${x},${y}`);
    return 1;
  }

  function tryAt(empty) {
    var maybe = [], block = blocks[empty.b], row = rows[empty.y], col = cols[empty.x], num;
    block.empty.forEach(num => {
      if (row.empty.has(num) && col.empty.has(num)) {
        maybe.push(num);
      }
    });
    if (maybe.length === 1) {
      num = maybe[0];
    } else if (test && maybe.length === range) {
      test = false;
      num = maybe[testIndex];
    } else {
      return maybe.length;
    }
    block.empty.delete(num);
    block.filled.add(num);
    row.empty.delete(num);
    row.filled.add(num);
    col.empty.delete(num);
    col.filled.add(num);
    board[empty.y][empty.x] = num;
    emptys.delete(`${empty.x},${empty.y}`);
    return 1;
  }

  var minMaybe = 9;
  function cycle() {
    minMaybe = 9;
    emptys.forEach((empty) => {
      const maybe = tryAt(empty);
      if (maybe < minMaybe) {
        minMaybe = maybe;
      }
    });
    rows.forEach((row, y) => {
      row.empty.forEach(num => {
        const maybe = tryInRow(y, num);
        if (maybe < minMaybe) {
          minMaybe = maybe;
        }
      });
    });
    cols.forEach((col, x) => {
      col.empty.forEach(num => {
        const maybe = tryInCol(x, num);
        if (maybe < minMaybe) {
          minMaybe = maybe;
        }
      });
    })
    blocks.forEach((block, b) => {
      block.empty.forEach(num => {
        const maybe = tryInBlock(b, num);
        if (maybe < minMaybe) {
          minMaybe = maybe;
        }
      });
    });
  }

  while(emptys.size > 0) {
    cycle();
    if (minMaybe !== 1) {
      break;
    }
  }
  return {
    minMaybe,
    left: emptys.size,
  };
}

