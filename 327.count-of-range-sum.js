/**
 * https://leetcode-cn.com/problems/count-of-range-sum/
 * 327. 区间和的个数
 */
/* function countRangeSum(nums, lower, upper) {
  var count = 0;
  for (var i = 0; i < nums.length; i++) {
    var sum = 0;
    for (var j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum >= lower && sum <= upper) {
        count++;
      }
    }
  }
  return count;
} */
/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countRangeSum = function(nums, lower, upper) {
  var sum = 0, less, more, count = 0;
  var tree = new AVLTree();
  for (var i = 0; i < nums.length; i++) {
    tree.insert(sum);
    sum += nums[i];
    less = tree.lessThan(sum - upper);
    more = tree.moreThan(sum - lower);
    count += i + 1 - less - more;
  }
  return count;
};

var AVLTree = (function () {
  function Node(element) {
    this.element = element;
    this.height = 0;
    this.size = 1;
    this.left = null;
    this.right = null;
  }

  function height(node) {
    return node ? node.height : -1;
  }
  function size(node) {
    return node ? node.size : 0;
  }
  function rotateLeft(node) {
    var left = node.left;
    if (height(left.left) < height(left.right)) {
      left.height--;
      left.right.height++;
      left.size = size(left) - size(left.right) + size(left.right.left);
      left.right.size = size(left.right) - size(left.right.left) + size(left);
      node.left = left.right;
      left.right = node.left.left;
      node.left.left = left;
      left = node.left;
    }
    node.height--;
    node.size = size(node) - size(left) + size(left.right);
    node.left = left.right;
    left.size = size(left) - size(left.right) + size(node);
    left.right = node;
    return left;
  }
  function rotateRight(node) {
    var right = node.right;
    if (height(right.right) < height(right.left)) {
      right.height--;
      right.left.height++;
      right.size = size(right) - size(right.left) + size(right.left.right);
      right.left.size = size(right.left) - size(right.left.right) + size(right);
      node.right = right.left;
      right.left = node.right.right;
      node.right.right = right;
      right = node.right;
    }
    node.height--;
    node.size = size(node) - size(right) + size(right.left);
    node.right = right.left;
    right.size = size(right) - size(right.left) + size(node);
    right.left = node;
    return right;
  }

  function insert(node, element) {
    var elem = node.element;
    node.size++;
    if (element < elem) {
      if (node.left) {
        node.left = insert(node.left, element);
        if (height(node.left) - height(node.right) === 2) {
          node = rotateLeft(node);
        } else if (node.left.height === node.height) {
          node.height++;
        }
      } else {
        node.left = new Node(element);
        if (!node.right) {
          node.height++;
        }
      }
    } else if (element > elem) {
      if (node.right) {
        node.right = insert(node.right, element);
        if (height(node.right) - height(node.left) === 2) {
          node = rotateRight(node);
        } else if (node.right.height === node.height) {
          node.height++;
        }
      } else {
        node.right = new Node(element);
        if (!node.left) {
          node.height++;
        }
      }
    }
    return node;
  }

  function AVLTree() {
    this.top = null;
  }

  AVLTree.prototype = {
    insert: function (element) {
      if (this.top) {
        this.top = insert(this.top, element);
      } else {
        this.top = new Node(element);
      }
    },
    lessThan(value) {
      var node = this.top, count = 0;
      while (node) {
        if (value > node.element) {
          count += size(node) - size(node.right);
          node = node.right;
        } else if (value < node.element) {
          node = node.left;
        } else {
          count += size(node.left);
          break;
        }
      }
      return count;
    },
    moreThan(value) {
      var node = this.top, count = 0;
      while (node) {
        if (value < node.element) {
          count += size(node) - size(node.left);
          node = node.left;
        } else if (value > node.element) {
          node = node.right;
        } else {
          count += size(node.right);
          break;
        }
      }
      return count;
    },
  };

  return AVLTree;
})();
