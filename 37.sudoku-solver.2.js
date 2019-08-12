var solveSudoku = function (board) {
  var rows = [], cols = [], blocks = [], emptys = [];
  var x, y, num, i, j;
  for (i = 0; i < 9; i++) {
    rows.push([]);
    cols.push([]);
    blocks.push([]);
    for (j = 0; j < 9; j++) {
      rows[i].push(false);
      cols[i].push(false);
      blocks[i].push(false);
    }
  }
  for (y = 0; y < 9; y++) {
    for (x = 0; x < 9; x++) {
      if (board[y][x] === '.') {
        emptys.push({ x, y });
      } else {
        num = parseInt(board[y][x]) - 1;
        rows[y][num] = true;
        cols[x][num] = true;
        blocks[Math.floor(y / 3) * 3 + Math.floor(x / 3)][num] = true;
      }
    }
  }

  function solve(emptyIndex) {
    if (emptyIndex === emptys.length) {
      return true;
    }
    var { x, y } = emptys[emptyIndex];
    var b = Math.floor(y / 3) * 3 + Math.floor(x / 3);
    for (var i = 0; i < 9; i++) {
      if (rows[y][i] || cols[x][i] || blocks[b][i]) {
        continue;
      }
      board[y][x] = i + 1 + '';
      rows[y][i] = cols[x][i] = blocks[b][i] = true;
      if (solve(emptyIndex + 1)) {
        return true;
      } else {
        board[y][x] = '.';
        rows[y][i] = cols[x][i] = blocks[b][i] = false;
      }
    }
  }

  solve(0);
};
