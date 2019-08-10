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
  var stack = [], result = [], x, len = s.length, max = 0;
  for (var i = 0; i < len; i++) {
    if (s[i] === ')') {
      if (stack.length) {
        x = stack.pop();
        result[x] = i - x + 1;
      }
    } else {
      stack.push(i);
    }
    result.push(0);
  }
  result.push(0);

  for (var i = len - 1; i >= 0; i--) {
    x = result[i];
    if (x > 0) {
      result[i] += result[i + x];
      x = result[i];
      if (x > max) {
        max = x;
      }
    }
  }

  return max;
};

