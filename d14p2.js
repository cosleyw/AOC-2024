let smul = (s, v) => v.map(v => s*v);
let add = (a, b) => a.map((v, i) => v + b[i]); 
let dot = (a, b) => a.map((v, i) => v * b[i]).reduce((a, b) => a + b); 
let mod = (a, b) => (a % b) < 0 ? (a % b) + b : a % b;

let get_pos = (time, robot, [w, h]) => {
  let p = add(smul(time, robot[1]), robot[0]);
  p[0] = mod(p[0], w);
  p[1] = mod(p[1], h);
  return p;
}

let calc_centroid = (arr) => smul(1/arr.length, arr.reduce(add));
let calc_variance = (arr) => {
  let c = smul(-1, calc_centroid(arr));
  return arr.map(v => add(c, v)).map(v => dot(v, v)).reduce((a, b) => a + b);
};

let [w, h] = [101, 103];
let str = prompt().split("\n").map(v => v.trim().split(" ").map(v => v.match(/-{0,1}[0-9]+/g).map(v => +v)));

let min_v = Infinity;
for(let i = 0; i < 10000; i++){
  let map = Array(h).fill().map(v => Array(w).fill(0));
  let p = str.map(v => get_pos(i, v, [w, h]), [w, h]);
  let v = calc_variance(p);
  
  if(min_v >= v){
    min_v = v
    p.forEach(([x, y]) => map[y][x]++);
    console.log(i);
    console.log(map.map(v => v.join("")).join("\n"));
  }
}
