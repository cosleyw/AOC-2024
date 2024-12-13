let gcd = (a, b) => a && b ? gcd(b, a % b) : a + b;
let add = (a, b) => a.map((v, i) => v + b[i]);
let smul = (s, v) => v.map(v => s*v);

let str = prompt().split("\n\n").map(v => v.split("\n").map(v => v.match(/[0-9]+/g).map(v => BigInt(v))));

let is_lin_indep = (a, b) => add(a, [-a[0], (a[0]*b[1])/b[0]]).some(v => v);

let euc_div = (a, b) => [a/b, a % b];

let solve = ([a1, a2], [b1, b2], [c1, c2]) => {
  c1 += 10000000000000n;
  c2 += 10000000000000n;
  if(is_lin_indep([a1, a2], [b1, b2]))
    return [euc_div(c2*b1-b2*c1, b1*a2-a1*b2), euc_div(c1*a2-c2*a1,b1*a2-a1*b2)];

  //never happened for my input :D
  
};
str.map(v => solve(...v)).filter(v => v.every(v => v[1] == 0)).map(v => v[0][0] * 3n + v[1][0]).reduce((a, b) => a + b);
