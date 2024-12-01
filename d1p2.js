let arr = prompt().split("\n").map(v => v.trim().split(/\s+/).map(v=>+v));
let s = (a, i) => a.map(v => v[i]).sort((a, b) => b-a);
let zip = (a, b) => a.map((v, i) => [v, b[i]]);

let a1 = s(arr, 0);
let a2 = s(arr, 1);

let count = {};
a2.forEach(v => (count[v] ??= 0, count[v]++));

a1.map(v => v * count[v]).filter(v => v).reduce((a, b) => a+b);
