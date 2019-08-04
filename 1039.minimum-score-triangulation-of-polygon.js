/**
 * https://leetcode-cn.com/problems/minimum-score-triangulation-of-polygon/
 * 1039. 多边形三角剖分的最低得分
 * 给定 N，想象一个凸 N 边多边形，其顶点按顺时针顺序依次标记为 A[0], A[i], ..., A[N-1]。
 * 假设您将多边形剖分为 N-2 个三角形。对于每个三角形，该三角形的值是顶点标记的乘积，三角剖分的分数是进行三角剖分后所有 N-2 个三角形的值之和。
 * 返回多边形进行三角剖分后可以得到的最低分。
 * 示例 1：
 *  输入：[1,2,3]
 *  输出：6
 *  解释：多边形已经三角化，唯一三角形的分数为 6。
 * 示例 2：
 *  输入：[3,7,4,5]
 *  输出：144
 *  解释：有两种三角剖分，可能得分分别为：3*7*5 + 4*5*7 = 245，或 3*4*5 + 3*4*7 = 144。最低分数为 144。
 * 示例 3：
 *  输入：[1,3,1,4,1,5]
 *  输出：13
 *  解释：最低分数三角剖分的得分情况为 1*1*3 + 1*1*4 + 1*1*5 + 1*1*1 = 13。
 */

/**
 * @param {number[]} arr
 * @return {number}
 *     p7       p0
 *       -------
 *      /       \
 *  p6 /         \ p1
 *    |           |
 *    |           |
 *  p5 \         / p2
 *      \       /
 *    p4 ------- p3
 * 
 * cache[p1][p6] === miniScoreTriangulation([p1, p2, p3, p4, p5, p6]);
 * cache[p1][p6] = Math.min(
 *  p1*p6*p2 + cache[p1][p2] + cache[p2][p6],
 *  p1*p6*p3 + cache[p1][p3] + cache[p3][p6],
 *  p1*p6*p4 + cache[p1][p4] + cache[p4][p6],
 *  p1*p6*p5 + cache[p1][p5] + cache[p5][p6],
 * );
 */
var minScoreTriangulation = function(arr) {
  let cache = [];
  for (let i = 0; i < arr.length; i++) {
      cache[i] = [];
  }
  for (let diff = 1; diff < arr.length; diff++) { // (diff + 1)边形
      for (let start = 0; start < arr.length - diff; start++) { // 没有必要计算 start > end 的多边形 (如[p5, p6, p7, p0, p1])
          let end = start + diff;
          if (diff === 1) {
              cache[start][end] = 0;
              continue;
          }
          let value = Infinity;
          let base = arr[start] * arr[end];
          for (let posi = 1; posi < diff; posi++) {
              let middle = start + posi;
              let val = base * arr[middle] + cache[start][middle] + cache[middle][end];
              if (val < value) {
                  value = val;
              }
          }
          cache[start][end] = value;
      }
  }
  return cache[0][arr.length-1];
};
