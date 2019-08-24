/**
 * https://leetcode-cn.com/problems/smallest-sufficient-team/
 * 1125. 最小的必要团队
 */
/**
 * @param {string[]} req_skills
 * @param {string[][]} people
 * @return {number[]}
 */
var smallestSufficientTeam = function(req_skills, people) {
  var map = new Map(), res = [], set = new Set(), res2;
  for (var i = 0; i < people.length; i++) {
    people[i].forEach(skill => {
      if (map.has(skill)) {
        map.get(skill).push(i);
      } else {
        map.set(skill, [i]);
      }
    });
  }
  req_skills.forEach(skill => {
    var p = map.get(skill);
    if (p.length === 1 && !set.has(skill)) {
      res.push(p[0]);
      people[p[0]].forEach(skill => {
        set.add(skill);
      });
    }
  });
  function step(skillId) {
    if (res2 && res.length === res2.length) {
      return;
    }
    for (; skillId < req_skills.length; skillId++) {
      if (!set.has(req_skills[skillId])) {
        break;
      }
    }
    if (skillId === req_skills.length) {
      if (!res2 || res2.length > res.length) {
        res2 = res.slice();
      }
      return;
    }
    var p = map.get(req_skills[skillId]), pid, added;
    for (var i = 0; i < p.length; i++) {
      added = [];
      pid = p[i];
      res.push(pid);
      people[pid].forEach(skill => {
        if (!set.has(skill)) {
          added.push(skill);
          set.add(skill);
        }
      });
      step(skillId + 1);
      added.forEach(skill => set.delete(skill));
      res.pop();
      if (res.length + 1 === res2.length) {
        return;
      }
    }
  }
  step(0);
  return res2;
};
