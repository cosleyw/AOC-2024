let str = prompt().split("\n").map(v => v.trim().split(""));

let targets = [
  [["S", "", "S"],
  ["", "A", ""],
  ["M", "", "M"]],
  [["M", "", "S"],
  ["", "A", ""],
  ["M", "", "S"]],
  [["S", "", "M"],
  ["", "A", ""],
  ["S", "", "M"]],
  [["M", "", "M"],
  ["", "A", ""],
  ["S", "", "S"]]
]

let test = (x, y, a, p) => p.map((_,j)=>_.map((v,i)=>v ? a[y + j]?.[x + i] == v : null)).flat().every(v => v == null || v);

str.map((_,y)=>_.map((_,x)=>targets.map(v => test(x, y, str, v)))).flat(2).map(v => +v).reduce((a, b) => a + b);
