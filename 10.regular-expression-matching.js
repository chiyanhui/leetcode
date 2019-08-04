/**
 * https://leetcode-cn.com/problems/regular-expression-matching/
 * 10. 正则表达式匹配
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
 *  '.' 匹配任意单个字符
 *  '*' 匹配零个或多个前面的那一个元素
 * 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
 * 说明:
 *  s 可能为空，且只包含从 a-z 的小写字母。
 *  p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
 * 示例 1:
 *  输入:
 *  s = "aa"
 *  p = "a"
 *  输出: false
 *  解释: "a" 无法匹配 "aa" 整个字符串。
 * 示例 2:
 *  输入:
 *  s = "aa"
 *  p = "a*"
 *  输出: true
 *  解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
 * 示例 3:
 *  输入:
 *  s = "ab"
 *  p = ".*"
 *  输出: true
 *  解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
 * 示例 4:
 *  输入:
 *  s = "aab"
 *  p = "c*a*b"
 *  输出: true
 *  解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
 * 示例 5:
 *  输入:
 *  s = "mississippi"
 *  p = "mis*is*p*."
 *  输出: false
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  var sx = 0, sy = s.length, px = 0, py = p.length;
  while (sx < sy && px < py && p[px + 1] !== '*') { // 从前向后匹配固定长度的字符
    if (p[px] !== s[sx] && p[px] !== '.') {
      return false;
    }
    sx++;
    px++;
  }
  while (sx < sy && px < py && p[py - 1] !== '*') {
    if (p[py - 1] !== s[sy - 1] && p[py - 1] !== '.') { // 从后向前匹配固定长度的字符
      return false;
    }
    sy--;
    py--;
  }
  if (sx === sy && matchEmpty(p, px, py)) { // s 处理完毕, p 匹配空字符串
    return true;
  } else if (sx === sy || px === py) { // s 和 p 一个是空, 一个不是空
    return false;
  }
  return starMatch(s.substring(sx, sy), shorter(p.substring(px, py)));
};

/**
 * 简化不定长的 p 的开头和结尾
 *  'a*.*b*cd*.*e*' --> '.*c.*'
 * @param {*} p 
 */
function shorter(p) {
  var flag = false;
  for (var i = 0; i < p.length; i += 2) {
    if (p[i] === '.' && p[i + 1] === '*') { // 从前向后发现 '.*'
      flag = true;
    } else if (p[i + 1] !== '*') { // 发现定长字符
      break;
    }
  }
  if (flag) { // 简化开头
    p = '.*' + p.substring(i);
    flag = false;
  }
  for (var i = p.length - 1; i >= 0; i -= 2) {
    if (p[i] == '*' && p[i - 1] == '.') { // 从后向前发现 '.*'
      flag = true;
    } else if (p[i] != '*') { // 发现定长字符
      break;
    }
  }
  if (flag) { // 简化结尾
    p = p.substring(0, i + 1) + '.*';
  }
  return p;
}

/**
 * 匹配开头两位不定长 ( 第二位为 * ) 的 p
 * @param {*} s 
 * @param {*} p 
 */
function starMatch(s, p) {
  var x = 0;
  while (!isMatch(s.substring(x), p.substring(2))) { // s 去掉开头 x 个字符, 尝试和 p 去掉开头两位进行匹配
    if (p[0] !== s[x] && p[0] !== '.' || x >= s.length) { // 不能再多去掉一个字符
      return false;
    }
    x++; // 尝试再去一位
  }
  return true;
}

/**
 * 判断 p 从 px 到 py 部分是否匹配空字符串
 * @param {*} p 
 * @param {*} px 
 * @param {*} py 
 */
function matchEmpty(p, px, py) {
  if ((py - px) % 2 == 1) { // 长度应为偶数
    return false;
  }
  for (let i = px; i < py; i += 2) { // 且 * 间隔出现
    if (p[i + 1] != '*') {
      return false;
    }
  }
  return true;
}
