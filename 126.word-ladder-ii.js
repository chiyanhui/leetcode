/**
 * https://leetcode-cn.com/problems/word-ladder-ii/
 * 126. 单词接龙 II
 * 给定两个单词（beginWord 和 endWord）和一个字典 wordList，找出所有从 beginWord 到 endWord 的最短转换序列。转换需遵循如下规则：
 * 1. 每次转换只能改变一个字母。
 * 2. 转换过程中的中间单词必须是字典中的单词。
 * 
 * 说明:
 *  如果不存在这样的转换序列，返回一个空列表。
 *  所有单词具有相同的长度。
 *  所有单词只由小写字母组成。
 *  字典中不存在重复的单词。
 *  你可以假设 beginWord 和 endWord 是非空的，且二者不相同。
 *
 * 示例 1:
 *  输入:
 *  beginWord = "hit",
 *  endWord = "cog",
 *  wordList = ["hot","dot","dog","lot","log","cog"]
 *
 *  输出:
 *  [
 *    ["hit","hot","dot","dog","cog"],
 *    ["hit","hot","lot","log","cog"]
 *  ]
 *
 * 示例 2:
 *  输入:
 *  beginWord = "hit",
 *  endWord = "cog",
 *  wordList = ["hot","dot","dog","lot","log"]
 *
 *  输出: []
 */

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function (beginWord, endWord, wordList) {
  if (wordList.indexOf(endWord) === -1) { // 字典里没有endWord
    return [];
  }
  let map = createMap(beginWord, endWord, wordList); // 获取节点连接图
  let queue = [map.end]; // 待处理的节点列表, 从结束节点开始进行广度优先遍历
  map.end.visited = true; // 被处理过的标记
  let startNode = map.start;
  while (queue.length) {
    let node = queue.shift(), // 从queue中取出一个节点, 准备处理所有关联节点
      level = node.level + 1; // 关联节点应赋值的level
    if (level > startNode.level) { // level值已超过最短路径, 不必继续
      break;
    }
    for (let i = 0; i < node.links.length; i++) { // 处理关联节点
      if (node.links[i].level >= level) { // 应赋level不大于节点level值, 说明此level代表该节点距结束节点的最近距离
        node.links[i].level = level;
        node.links[i].next.push(node); // 将此关联节点添加到可选节点中
        if (!node.links[i].visited) {
          node.links[i].visited = true; // 防止重复添加
          queue.push(node.links[i]); // 添加到待处理队列中, 准备进行下一级遍历
        }
      }
    }
  }

  return traverse(startNode);
};

/**
 * 比较两个单词能否转换(仅一个字母不同)
 * @param {string} word1 
 * @param {string} word2 
 */
function couldConvert(word1, word2) {
  let n = 0;
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] !== word2[i]) {
      n++;
      if (n === 2) {
        return false;
      }
    }
  }
  return true;
}

/**
 * 创建节点连接图
 * @param {*} beginWord 
 * @param {*} endWord 
 * @param {*} wordList 
 */
function createMap(beginWord, endWord, wordList) {
  let nodes = [], endNode;
  nodes.push({ // 开始节点
    id: beginWord,
    links: [], // 存放所有可转换的节点
    level: Infinity, // 离结束节点的最近距离
    next: [], // 最短转换路径的下一步可选节点
  });
  for (let i = 0; i < wordList.length; i++) { // 对wordList所有元素生成节点
    nodes.push({
      id: wordList[i],
      links: [],
      level: Infinity,
      next: [],
    });
    if (wordList[i] === endWord) { // 结束节点
      endNode = nodes[i + 1];
      endNode.level = 0; // 结束节点level为0
    }
  }
  for (let i = 1; i < nodes.length; i++) { // 所有可转换的两个节点相互连接
    for (let j = 0; j < i; j++) {
      if (couldConvert(nodes[i].id, nodes[j].id)) {
        nodes[i].links.push(nodes[j]);
        nodes[j].links.push(nodes[i]);
      }
    }
  }
  return {
    start: nodes[0],
    end: endNode,
  };
}

/**
 * 将节点数组转化成结果
 * @param {object[]} nodes 节点数组
 * @return {string[]} 转换序列
 */
function createOneAnswer(nodes) {
  let res = [];
  for (let i = 0; i < nodes.length; i++) {
    res.push(nodes[i].id);
  }
  return res;
}

/**
 * 从开始节点开始, 找出所有结果
 * @param {*} start 
 */
function traverse(start) {
  let res = [],
    nodes = [start], // 深度优先遍历的栈
    n = start.level + 1, // 每种结果的长度
    node;
  start.index = 0; // 正在处理的子节点索引
  while (nodes.length) {
    node = nodes[nodes.length - 1]; // 处理栈顶的节点
    while (nodes.length < n) {
      if (node.index < node.next.length) { // 子节点未处理完
        node = node.next[node.index++]; // 下一个节点
        node.index = 0; // 正在处理的子节点索引
        nodes.push(node); // 压入栈
      } else { // 子节点处理完, 此时栈深度不为n, 所以下面需要判断nodes.length
        break;
      }
    }
    if (nodes.length === n) { // 到达终点, 找到一种结果
      res.push(createOneAnswer(nodes));
    }
    nodes.pop(); // 弹出处理完的节点
  }
  return res;
}
