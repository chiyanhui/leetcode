/**
 * https://leetcode-cn.com/problems/median-of-two-sorted-arrays/
 * 4. 寻找两个有序数组的中位数
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  const len1 = nums1.length, len2 = nums2.length, len = len1 + len2;
  let p1 = 0, p2 = 0;
  function moveTo(posi) {
    if (len1 === 0) {
      p2 = posi;
      return;
    } else if (len2 === 0) {
      p1 = posi;
      return;
    }
    let p = posi;
    while (p > 0) {
      const r = p - 1 >> 1;
      if (nums1[Math.min(p1 + r, len1 - 1)] < nums2[Math.min(p2 + r, len2 - 1)]) {
        p -= r + 1;
        p1 += r + 1;
        if (p1 >= len1) {
          p1 = len1;
          p2 = posi - len1;
          break;
        }
      } else {
        p -= r + 1;
        p2 += r + 1;
        if (p2 >= len2) {
          p2 = len2;
          p1 = posi - len2;
          break;
        }
      }
    }
  }
  function next() {
    if (p1 === len1) {
      return nums2[p2++];
    } else if (p2 === len2) {
      return nums1[p1++];
    }
    return nums1[p1] < nums2[p2] ? nums1[p1++] : nums2[p2++];
  }
  moveTo(len - 1 >> 1);
  if (len % 2) {
    return next();
  } else {
    return (next() + next()) / 2;
  }
};
