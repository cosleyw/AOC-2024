let add = (a, b) => a.map((v, i) => v + b[i]); 
let get_cell = (map, [x, y]) => map[y]?.[x];
let set_cell = (map, [x, y], v) => map[y][x] = v;

let dfs = (map, pos) => {
  let dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  let seen = Array(map.length).fill()
    .map((v,i) => Array(map[i].length).fill(0));
  let dfs_ = (pos, depth) => {
    if(get_cell(map, pos) != depth || get_cell(seen, pos))
      return;

    
    set_cell(seen, pos, -1)
    if(depth == 9)
      return set_cell(seen, pos, 1);
    
    dirs.map(v => dfs_(add(pos, v), depth+1));
  }

  dfs_(pos, 0);
  return seen.flat().filter(v => v == 1).length;
}

let str = prompt().split("\n").map(v => v.trim().split("").map(v => +v));

let heads = str.flat().map((v,i)=>[v,i % str[0].length, i / str[0].length | 0]).filter(([v,i]) => v == 0).map(v => v.slice(1));


heads.map(v => dfs(str, v)).reduce((a, b) => a + b);
