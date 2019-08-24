/**
 * https://leetcode-cn.com/problems/longest-chunked-palindrome-decomposition/
 * 1147. 段式回文
 */
/**
 * @param {string} text
 * @return {number}
 */
var longestDecomposition = function(text) {
  var len = text.length, x, y, s1 = [], s2 = [], res = 0;
  for (x = 0, y = len - 1; x < y; x++, y--) {
    s1.push(text[x]);
    s2.push(text[y]);
    if (same(s1, s2)) {
      s1.length = s2.length = 0;
      res += 2;
    }
  }
  if (s1.length || x === y) res++;
  return res;
};

function same(s1, s2) {
  var len = s1.length, i = 0, j = len - 1;
  for (; i < len; i++, j--) {
    if (s1[i] !== s2[j]) {
      return false;
    }
  }
  return true;
}

