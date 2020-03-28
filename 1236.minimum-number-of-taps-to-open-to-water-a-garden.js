function minTaps(n, ranges) {
  if (n === 0) return 0;
  var res = [], x, y, count = 0;
  for (var i = 0; i <= n; i++) {
    res.push(0);
    x = Math.max(0, i - ranges[i]);
    y = Math.min(n, i + ranges[i]);
    if (res[x] < y) res[x] = y;
  }
  x = y = 0;
  for (var i = 0; i <= n; i++) {
    if (res[i] > y) y = res[i];
    if (y === n) return count + 1;
    if (i === x) {
      if (i === y) return -1;
      x = y;
      count++;
    }
  }
  return count;
}


function setRelation(setA, setB) {
  var tmp;
  if (setA.size > setB.size) {
    tmp = setA;
    setA = setB;
    setB = tmp;
  }
  var BHasA = true;
  setA.forEach(item => {
    if (!setB.has(item)) BHasA = false;
  });
  if (!BHasA) return 0;
  if (tmp) return -1;
  return 1;
}

function fn(n, ranges) {
  ranges = ranges.slice();
  var lines = [];
  var uncovered = new Set();
  var points = [];
  var opened = new Set();
  var res = new Set();
  for (var i = 0; i < n; i++) {
    lines.push({
      point: new Set(),
      id: i,
    });
  }
  for (var i = 0; i <= n; i++) {
    points.push({
      line: new Set(),
      id: i,
      opened: false,
    });
    if (!ranges[i]) continue;
    var xi = Math.max(0, i - ranges[i]);
    var yi = Math.min(n, i + ranges[i]);
    ranges[i] = [xi, yi];
    for (var j = i - 1; j > -1; j--) {
      if (!ranges[j]) continue;
      var xj = ranges[j][0];
      var yj = ranges[j][1];
      if (xi >= xj && yi <= yj) {
        ranges[i] = 0;
        break;
      } else if (xi <= xj && yi >= yj) {
        ranges[j] = 0;
      } else {
        break;
      }
    }
  }
  for (var i = 0; i <= n; i++) {
    var range = ranges[i];
    if (!range) continue;
    for (var j = range[0]; j < range[1]; j++) {
      if (lines[j]) {
        lines[j].point.add(i);
        points[i].line.add(j);
      } else {
        break;
      }
    }
  }

  for (var i = 0; i < n; i++) {
    if (lines[i].point.size === 0) {
      return -1;
    } else {
      uncovered.add(lines[i]);
    }
  }

  while (uncovered.size) {
    uncovered.forEach(line => {
      if (line.point.size === 1) {
        line.point.forEach(pointId => {
          var point = points[pointId];
          opened.add(point);
          point.opened = true;
        });
      }
    });

    opened.forEach(point => {
      res.add(point);
      point.line.forEach(lineId => {
        var line = lines[lineId];
        if (uncovered.has(line)) {
          uncovered.delete(line);
          line.point.forEach(pointId => {
            var point = points[pointId];
            point.line.delete(line.id);
          });
        }
      });
    });
    opened.clear();

    for (var i = 1; i <= n; i++) {
      if (points[i].line.size === 0 || points[i].opened) continue;
      for (var j = i - 1; j > -1; j--) {
        if (points[j].line.size === 0 || points[j].opened) continue;
        var relation = setRelation(points[i].line, points[j].line);
        var point = null;
        if (relation > 0) {
          point = points[i];
        } else if (relation < 0) {
          point = points[j];
        }
        if (point) {
          point.line.forEach(lineId => {
            lines[lineId].point.delete(point.id);
          });
          point.line.clear();
        }
        if (relation >= 0) break;
      }
    }
  }

  return res.size;
}


function test() {
  for (var j = 0; j < 10000; j++) {
    var n = Math.floor(Math.random() * 20 + 4);
    var ranges = [];
    for (var i = 0; i <= n; i++) {
      ranges[i] = Math.floor(Math.random() * n);
    }
    if (minTaps(n, ranges) !== fn(n, ranges)) {
      console.log(n, ranges);
      break;
    } else {
      console.log('ok');
    }
  }
}
