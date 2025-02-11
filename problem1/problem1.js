var sum_to_n_a = function (n) {
  // your code here
  // Time Complexity: 𝑂(𝑛)
  // Space Complexity: O(1)
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

var sum_to_n_b = function (n) {
    // your code here
    // Time Complexity: 𝑂(1)
    // Space Complexity: O(1)
    return (n * (n + 1)) / 2;
};

var sum_to_n_c = function (n) {
  // your code here
  // Time Complexity: 𝑂(𝑛)
  // Space Complexity: O(n)
  if (n === 1) return 1;
  return n + sum_to_n(n - 1);
};