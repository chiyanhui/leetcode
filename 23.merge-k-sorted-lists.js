/**
 * https://leetcode-cn.com/problems/merge-k-sorted-lists/
 * 23. 合并K个排序链表
 * 合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。
 * 示例:
 *  输入:
 *  [
 *    1->4->5,
 *    1->3->4,
 *    2->6
 *  ]
 *  输出: 1->1->2->3->4->4->5->6
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  var nodes = [];
  var start = null, node = null;

  lists.forEach(node => {
    if (node) {
      nodes.push(node);
    }
  });
  function getOne() {
    var val = Infinity, index = 0, node;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].val < val) {
        val = nodes[i].val;
        index = i;
      }
    }
    node = nodes[index];
    if (node.next === null) {
      nodes.splice(index, 1);
    } else {
      nodes[index] = node.next;
    }
    return node;
  }

  if (nodes.length === 0) {
    return null;
  }
  start = node = getOne();
  while (nodes.length) {
    node.next = getOne();
    node = node.next;
  }
  node.next = null;

  return start;
};