let smul = (s, v) => v.map(v => s*v);
let add = (a, b) => a.map((v, i) => v + b[i]); 
let mod = (a, b) => (a % b) < 0 ? (a % b) + b : a % b;

let get_pos = (time, robot, [w, h]) => {
  let p = add(smul(time, robot[1]), robot[0]);
  p[0] = mod(p[0], w);
  p[1] = mod(p[1], h);
  return p;
}

let get_quad = ([x, y], [w, h]) => {
  if(w % 2 == 1 && x == (w-1)/2)
    return null;
  if(h % 2 == 1 && y == (h-1)/2)
    return null;
  
  let mx = x < (w-1)/2;
  let my = y < (h-1)/2;
  return mx + 2*my;
}

let [w, h] = [101, 103];
let str = prompt().split("\n").map(v => v.trim().split(" ").map(v => v.match(/-{0,1}[0-9]+/g).map(v => +v)));

let map = Array(h).fill().map(v => Array(w).fill(0));

str.map(v => get_pos(100, v, [w, h]), [w, h])
.map(v => get_quad(v, [w, h]))
.reduce((a, b) => (b != null && a[b]++, a), [0,0,0,0])
.reduce((a, b) => a * b);
