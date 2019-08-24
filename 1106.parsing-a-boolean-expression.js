/**
 * https://leetcode-cn.com/problems/parsing-a-boolean-expression/
 * 1106. 解析布尔表达式
 */
/**
 * @param {string} expr
 * @return {boolean}
 */
var parseBoolExpr = function(expr) {
  var len = expr.length, i, s1 = [], s2 = [], c, v, p, o;
  for (i = 0; i < len; i++) {
    c = expr[i];
    switch (c) {
      case '!':
      case '&':
      case '|':
        s2.push(c);
        break;
      case ')':
        o = s2.pop();
        switch (o) {
          case '!':
            v = s1.pop() === 't' ? 'f' : 't';
            s1.pop();
            s1.push(v);
            break;
          case '&':
            v = 't';
            while ((p = s1.pop()) !== '(') {
              if (v === 't' && p === 'f') {
                v = 'f';
              }
            }
            s1.push(v);
            break;
          case '|':
            v = 'f';
            while ((p = s1.pop()) !== '(') {
              if (v === 'f' && p === 't') {
                v = 't';
              }
            }
            s1.push(v);
            break;
        }
        break;
      default:
        s1.push(c);
    }
  }
  return s1[0] === 't';
};
