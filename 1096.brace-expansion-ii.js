/**
 * https://leetcode-cn.com/problems/brace-expansion-ii/
 * 1096. 花括号展开 II
 */
/**
 * @param {string} expr
 * @return {string[]}
 */
var braceExpansionII = function(expr) {
  var len = expr.length, c, str = '', sets, item;
  var res = [];
  for (var i = 0; i <= len; i++) {
    c = expr[i];
    if (c && /\w/.test(c)) {
      str += c;
      continue;
    }
    if (str) {
      item = new Set([str]);
      if (res[res.length - 1] instanceof Set) {
        res.push(join(res.pop(), item));
      } else {
        res.push(item);
      }
      str = '';
    }
    if (c === '}' || i === len) {
      sets = [];
      while (true) {
        sets.push(res.pop());
        if (res.pop() === '{' || res.length === 0) {
          break;
        }
      }
      item = concat(sets);
      if (res[res.length - 1] instanceof Set) {
        res.push(join(res.pop(), item));
      } else {
        res.push(item);
      }
    } else {
      res.push(c);
    }
  }
  return [...res[0]].sort();
};

function join(set1, set2) {
  var set = new Set();
  set1.forEach(str1 => {
    set2.forEach(str2 => {
      set.add(str1 + str2);
    });
  });
  return set;
}
function concat(sets) {
  var set = new Set();
  sets.forEach(_set => {
    _set.forEach(str => {
      set.add(str);
    });
  });
  return set;
}
