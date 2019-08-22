/**
 * (1 + sqrt(2)) ^ 1000000 的整数部分的后三位(百位十位个位)是多少?
 * 
 * (a + b * sqrt(2)) * (1 + sqrt(2)) = (a + b * 2) + (a + b) * sqrt(2)
 * x = 1 + sqrt(2) = 2.414..., floor(x) = 1 * 2
 * x = (1 + sqrt(2)) ^ 2 = 3 + 2 * sqrt(2) = 5.828..., floor(x) = 3 * 2 - 1
 * x = (1 + sqrt(2)) ^ 3 = 7 + 5 * sqrt(2) = 14.071..., floor(x) = 7 * 2
 * x = (1 + sqrt(2)) ^ 4 = 17 + 12 * sqrt(2) = 33.970..., floor(x) = 17 * 2 - 1
 * 
 * 令 a(k) + (b(k) * sqrt(2))
 *  = (b(k) * sqrt(2) + Δ(k)) + (b(k) * sqrt(2))
 *  = a(k) * 2 - Δ(k)
 * 
 * a(k + 1) + (b(k + 1) * sqrt(2))
 *  = (a(k) + (b(k) * sqrt(2))) * (1 + sqrt(2))
 *  = ((b(k) * sqrt(2) + Δ(k)) + (b(k) * sqrt(2))) * (1 + sqrt(2))
 *  = (b(k) * 2 + b(k) * sqrt(2) + Δ(k)) + (b(k) * sqrt(2) + b(k) + Δ(k)) * sqrt(2)
 *  = (b(k) * 4 + b(k) * 2 * sqrt(2) + (1 + sqrt(2)) * Δ(k))
 *  = (b(k) * 2 + b(k) * sqrt(2) + Δ(k)) * 2 + (sqrt(2) - 1) * Δ(k)
 * 
 * a(k + 1) = b(k) * 2 + b(k) * sqrt(2) + Δ(k)
 * b(k + 1) = b(k) * sqrt(2) + b(k) + Δ(k)
 * 有 a(k + 1) + (b(k + 1) * sqrt(2)) = a(k + 1) * 2 - Δ(k - 1)
 *  Δ(k - 1) = (1 - sqrt(2)) * Δ(k)
 */

/**
 * (1 + sqrt(2)) ^ exp 的整数部分的后三位
 * @param {number} exp 
 */
function solve(exp) {
  var a = 1, b = 1, n = 1;
  function step() {
    n++;
    var bb = a + b;
    a = a + b * 2;
    a %= 1000;
    b = bb % 1000;
  }
  while (n < exp) {
    step();
  }
  return (a * 2 + (exp % 2 ? 0 : -1)) % 1000;
}

// 873
solve(1000000);
