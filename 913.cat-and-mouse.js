/**
 * https://leetcode-cn.com/problems/cat-and-mouse/
 * 913. 猫和老鼠
 */
/**
 * @param {number[][]} graph
 * @return {number}
 */
var catMouseGame = function (graph) {
  var nodeCount = graph.length, m, c, i, j, M, C;
  var mGrid = new Array(nodeCount).fill(null);
  mGrid.forEach((item, index) => {
    mGrid[index] = new Array(nodeCount).fill(0);
    if (index === 0) {
      mGrid[index].fill(1);
    } else {
      for (var i = 0; i < graph[index].length; i++) {
        mGrid[index][graph[index][i]] = -1;
      }
    }
    mGrid[index][index] = -1;
  });
  var cGrid = new Array(nodeCount).fill(null);
  cGrid.forEach((item, index) => {
    cGrid[index] = new Array(nodeCount).fill(0);
    if (index === 0) {
      cGrid[index].fill(1);
    }
    cGrid[index][index] = -1;
    cGrid[index][0] = 1;
  });
  for (i = 0; i < graph[0].length; i++) {
    for (j = 1; j < nodeCount; j++) {
      if (mGrid[graph[0][i]][j] !== -1) {
        mGrid[graph[0][i]][j] = 1;
      }
    }
  }

  function step() {
    var num = 0;
    for (m = 0; m < nodeCount; m++) {
      for (c = 0; c < nodeCount; c++) {
        if (mGrid[m][c] === 1) {
          for (i = 0; i < graph[m].length; i++) {
            M = graph[m][i];
            if (cGrid[M][c] === 0) {
              cGrid[M][c] = 1;
              num++;
            }
            if (mGrid[M][c] === 0) {
              mGrid[M][c] = 1;
              num++;
              for (j = 0; j < graph[c].length; j++) {
                C = graph[c][j];
                if (mGrid[m][C] === -1) {
                  mGrid[M][c] = 0;
                  num--;
                  break;
                }
              }
            }
          }
        }
        if (cGrid[m][c] === -1) {
          for (i = 0; i < graph[c].length; i++) {
            C = graph[c][i];
            if (mGrid[m][C] === 0) {
              mGrid[m][C] = -1;
              num++;
            }
            if (cGrid[m][C] === 0) {
              cGrid[m][C] = -1;
              num++;
              for (j = 0; j < graph[m].length; j++) {
                M = graph[m][j];
                if (cGrid[M][c] !== -1) {
                  cGrid[m][C] = 0;
                  num--;
                  break;
                }
              }
            }
          }
        }
        if (mGrid[m][c] === 0) {
          mGrid[m][c] = 1;
          num++;
          for (i = 0; i < graph[c].length; i++) {
            C = graph[c][i];
            if (cGrid[m][C] !== 1) {
              mGrid[m][c] = 0;
              num--;
              break;
            }
          }
        }
        if (cGrid[m][c] === 0) {
          cGrid[m][c] = -1;
          num++;
          for (i = 0; i < graph[m].length; i++) {
            M = graph[m][i];
            if (mGrid[M][c] !== -1) {
              cGrid[m][c] = 0;
              num--;
              break;
            }
          }
        }
      }
    }
    return num;
  }

  var n = 0;
  while (step()) {
    n++;
  };
  console.log(n, mGrid, cGrid);

  var res = cGrid[1][2];
  if (res === -1) {
    res = 2;
  }
  return res;
};
