var mergeKLists = function (lists) {
  var nodes = [];
  var start = null, node = null;

  lists.forEach(node => {
    if (node) {
      nodes.push(node);
    }
  });
  var len = nodes.length, i = Math.floor((len - 1) / 2);
  function heapAdjust(pos) {
    var child = pos * 2 + 1,
      temp = nodes[pos];
    while (child < len) {
      if (child + 1 < len && nodes[child + 1].val < nodes[child].val) {
        child++;
      }
      if (nodes[child].val < temp.val) {
        nodes[pos] = nodes[child];
        pos = child;
        child = pos * 2 + 1;
      } else {
        break;
      }
    }
    nodes[pos] = temp;
  }
  for (; i >= 0; i--) {
    heapAdjust(i);
  }
  function getOne() {
    var node = nodes[0];
    nodes[0] = node.next;
    if (nodes[0] === null) {
      nodes[0] = nodes[--len];
      nodes[len] = null;
    }
    heapAdjust(0);
    return node;
  }

  if (nodes.length === 0) {
    return null;
  }
  start = node = getOne();
  while (len) {
    node.next = getOne();
    node = node.next;
  }
  node.next = null;

  return start;
};
