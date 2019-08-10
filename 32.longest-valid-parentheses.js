/**
 * https://leetcode-cn.com/problems/longest-valid-parentheses/
 * 32. 最长有效括号
 * 给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。
 * 示例 1:
 *  输入: "(()"
 *  输出: 2
 *  解释: 最长有效括号子串为 "()"
 * 示例 2:
 *  输入: ")()())"
 *  输出: 4
 *  解释: 最长有效括号子串为 "()()"
 */
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  if (s.length === 0) {
    return '';
  }
  var stack = [], result = [], head = [], x, y, z;
  for (var i = 0; i < s.length; i++) {
    if (s[i] === ')') {
      if (stack.length) {
        x = stack.pop(), y = head.pop();
        result[x] = i - x + 1;
        if (y < 0) {
          y = head.pop();
        }
        if (head.length && (z = head.pop()) < 0) {
          head.push(z);
          result[ -z - 1 ] = i + z + 2;
        } else {
          head.push(z);
          head.push(-y);
        }
      } else {
        head = [];
      }
    } else {
      head.push(i + 1);
      stack.push(i);
    }
    result.push(0);
  }

  var max = findMax(result);
  // return s.substring(max.index, max.index + max.val);
  return max.val;
};

function findMax(arr) {
  var val = arr[0], index = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > val) {
      val = arr[i];
      index = i;
    }
  }
  return { val, index };
}
