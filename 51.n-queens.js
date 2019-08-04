/**
 * https://leetcode-cn.com/problems/n-queens/
 * n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
 * 给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。
 * 每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
 * 示例:
 *  输入: 4
 *  输出: [
 *  [".Q..",  // 解法 1
 *   "...Q",
 *   "Q...",
 *   "..Q."],
 *
 *  ["..Q.",  // 解法 2
 *   "Q...",
 *   "...Q",
 *   ".Q.."]
 *  ]
 *  解释: 4 皇后问题存在两个不同的解法。
 */

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const res = [], prev = [ -1 ];
  let x; // 某一行的 x 位置
  while (prev.length) {
    x = prev.pop() + 1; // 重新尝试之前一行
    for (; x < n; x++) { // 尝试下一行第 x 位
      if (checkStep(prev, x)) { // 下一行第 x 位不冲突
        prev.push(x); // 添加一行
        if (prev.length < n) { // 未填满, 继续尝试下一行
          x = -1; // 经过 x++, 下一次为 0
        } else { // 已填满
          res.push(createOneAnswer(prev)); // 添加一个解
          prev.pop(); // 最后一行不需要重新尝试
          break;
        }
      }
    }
    // for循环结束, 说明下一行没有合适的位置
  }
  return res;
};

/**
 * 检查某一行第X个位置和前面是否冲突
 * @param {int[]} prev 
 * @param {int} x 
 */
function checkStep(prev, x) {
  let i = prev.length;
  for (let j = 0; j < prev.length; j++) {
    if (prev[j] === x || (j - prev[j] === i - x) || (j + prev[j] === i + x)) {
      return false;
    }
  }
  return true;
}

/**
 * 转化某个解
 * [1, 3, 0, 2] --> [".Q..", "...Q", "Q...", "..Q."]
 * @param {int[]} arr 
 */
function createOneAnswer(arr) {
  let n = arr.length, res = [];
  for (let i = 0; i < n; i++) {
    let line = new Array(n).fill('.');
    line[arr[i]] = 'Q';
    res.push(line.join(''));
  }
  return res;
}
