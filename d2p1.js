let str = prompt().split("\n").map(v => v.trim().split(/\s+/g).map(v => +v));

let check_dec = (a, b) => a > b && Math.abs(a - b) <= 3;
let check_inc = (a, b) => a < b && Math.abs(a - b) <= 3

let adj_cons = (check, [a, ...rest]) => rest.reduce((a, b) => [a[0] && check(a[1], b), b], [true, a])[0];

let is_safe = (arr) => adj_cons(check_dec, arr) || adj_cons(check_inc, arr);


str.map(is_safe).reduce((a, b) => a + b);
