/**
 * https://leetcode-cn.com/problems/basic-calculator-iv/comments/
 * 770. 基本计算器 IV
 */
/**
 * @param {string} expression
 * @param {string[]} evalvars
 * @param {number[]} evalints
 * @return {string[]}
 */
var basicCalculatorIV = function (expression, evalvars, evalints) {
  var tokens = split(expression);
  for (var j = 0; j < tokens.length; j++) {
    if (Number.isInteger(parseInt(tokens[j]))) {
      tokens[j] = parseInt(tokens[j]);
    }
    for (var i = 0; i < evalvars.length; i++) {
      if (tokens[j] === evalvars[i]) {
        tokens[j] = evalints[i];
        break;
      }
    }
  }
  var tree = parse(tokens);
  LRD(tree, calcutate);

  var vals = tree.val;
  if (!Array.isArray(vals)) {
    vals = [vals];
  }
  if (vals.length === 1 && vals[0].num === 0) {
    return [];
  }
  vals.sort((a, b) => {
    if (a.vars.length === b.vars.length) {
      return strCompare(a.vars.join('*'), b.vars.join('*'));
    }
    return b.vars.length - a.vars.length;
  });
  for (var i = 0; i < vals.length; i++) {
    var val = vals[i];
    val.vars.unshift(val.num);
    vals[i] = val.vars.join('*');
  }
  return vals;
};

function LRD(node, fn) {
  if (node.itemL)
    LRD(node.itemL, fn);
  if (node.itemR)
    LRD(node.itemR, fn);
  fn(node);
}

function strCompare(a, b) {
  var len = Math.max(a.length, b.length);
  for (var i = 0; i < len; i++) {
    if (a[i] !== b[i]) {
      return (a.charCodeAt(i) || 0) - (b.charCodeAt(i) || 0);
    }
  }
  return 0;
}

function calcutate(node) {
  if (node.op) {
    node.val = nodeCalculate(node.itemL.val, node.itemR.val, node.op);
    delete node.op;
    delete node.itemL;
    delete node.itemR;
  } else if (typeof node.val === 'number') {
    node.val = {
      vars: [],
      num: node.val,
    };
  } else if (typeof node.val === 'string') {
    node.val = {
      vars: [node.val],
      num: 1,
    };
  }
}

function nodeCalculate(val1, val2, op) {
  if (op === '+') {
    return nodeAdd(val1, val2);
  } else if (op === '-') {
    negate(val2);
    return nodeAdd(val1, val2);
  } else if (op === '*') {
    return nodeMultiply(val1, val2);
  }
}
function nodeMultiply(val1, val2) {
  if (!Array.isArray(val1) && !Array.isArray(val2)) {
    if (val1.num === 0 || val2.num === 0) {
      return { num: 0, vars: [] };
    }
    return {
      num: val1.num * val2.num,
      vars: val1.vars.concat(val2.vars).sort(),
    }
  } else if (Array.isArray(val1) && Array.isArray(val2)) {
    var val = { num: 0, vars: [] };
    for (var i = 0; i < val2.length; i++) {
      val = nodeAdd(val, nodeMultiply(val1, val2[i]));
    }
    return val;
  } else if (Array.isArray(val1)) {
    var val = { num: 0, vars: [] };
    if (val2.num === 0) {
      return val;
    }
    for (var i = 0; i < val1.length; i++) {
      val = nodeAdd(val, nodeMultiply(val1[i], val2));
    }
    return val;
  } else {
    return nodeMultiply(val2, val1);
  }
}
function nodeAdd(val1, val2) {
  if (!Array.isArray(val1) && !Array.isArray(val2)) {
    if (sameArray(val1.vars, val2.vars)) {
      val1.num += val2.num;
      if (val1.num === 0) {
        val1.vars = [];
      }
      return val1;
    } else {
      if (val1.num === 0) {
        return val2;
      } else if (val2.num === 0) {
        return val1;
      }
      return [val1, val2];
    }
  } else if (Array.isArray(val1) && Array.isArray(val2)) {
    for (var i = 0; i < val2.length; i++) {
      val1 = nodeAdd(val1, val2[i]);
    }
    return val1;
  } else if (Array.isArray(val1)) {
    if (val2.num === 0) {
      return val1;
    }
    for (var i = 0; i < val1.length; i++) {
      if (sameArray(val1[i].vars, val2.vars)) {
        val1[i] = nodeAdd(val1[i], val2);
        if (val1[i].num === 0) {
          val1.splice(i, 1);
          if (val1.length === 1) {
            return val1[0];
          }
        }
        return val1;
      }
    }
    val1.push(val2);
    return val1;
  } else {
    return nodeAdd(val2, val1);
  }
}
function negate(val) {
  if (Array.isArray(val)) {
    for (var i = 0; i < val.length; i++) {
      val[i].num *= -1;
    }
  } else {
    val.num *= -1;
  }
}
function sameArray(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

// var expr = 'a*b+c+d+e*f*g*h+i';
// var expr1 = 'a*(b+c*d)+e+f*g*h+(i+j)';
// var expr2 = 'a+(b+c)*d+e/(f+g)-h+i';
function parse(expr) {
  var ops = [], items = [], char, itemR, itemL;
  for (var i = 0; i < expr.length; i++) {
    char = expr[i];
    if (/\w/.test(char)) {
      items.push({ val: char });
    } else {
      concat(char);
      if (char !== ')') {
        ops.push(char);
      }
    }
  }
  concat();

  function concat(char) {
    char = char || '+';
    while (ops.length) {
      var op = arrEnd(ops);
      if (op) {
        if (op === '(') {
          if (char === ')') {
            ops.pop();
          }
          break;
        } else if (oprationCompare(op, char) >= 0 || char === ')') {
          itemR = items.pop();
          itemL = items.pop();
          op = ops.pop();
          items.push({ op, itemL, itemR });
        } else {
          break;
        }
      } else {
        break;
      }
    }
  }

  return items[0];
}

function arrEnd(arr) {
  return arr[arr.length - 1];
}

function oprationCompare(op1, op2) {
  var priority = { '*': 2, '/': 2, '+': 1, '-': 1, '(': 3, ')': 3 };
  return priority[op1] - priority[op2];
}

function split(exp) {
  var s = '', res = [], char;
  for (var i = 0; i < exp.length; i++) {
    char = exp[i];
    if (char === '(') {
      res.push(char);
    } else if (char === ')') {
      if (s) {
        res.push(s);
        s = '';
      }
      res.push(char);
    } else if (char === ' ') {
      if (s) {
        res.push(s);
        s = '';
      }
    } else {
      s += char;
    }
  }
  if (s) {
    res.push(s);
  }
  return res;
}

