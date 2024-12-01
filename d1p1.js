let arr = prompt().split("\n").map(v => v.trim().split(/\s+/).map(v=>+v));
let s = (a, i) => a.map(v => v[i]).sort((a, b) => b-a);
let zip = (a, b) => a.map((v, i) => [v, b[i]]);

zip(s(arr, 0), s(arr, 1)).map(([a, b]) => Math.abs(a - b)).reduce((a, b) => a+b);
