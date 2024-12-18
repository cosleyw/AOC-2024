let str = prompt().split("\n").map(v => v.trim().split(",").map(v => +v));

let get_cell = (map, [x, y]) => map[y]?.[x];
let set_cell = (map, [x, y], v) => map[y][x] = v;

let add = (a, b) => a.map((v, i) => v + b[i]); 

let bfs = (map, pos) => {
  let queue = [[pos, 0]];
  let dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  let seen = {};

  while(queue.length){
    let [pos, count] = queue.shift();

    if(seen[pos]){
      if(seen[pos][1] <= count)
        continue;
    }

    if(get_cell(map, pos) == "#" || get_cell(map, pos) == null)
      continue;
    
    seen[pos] = [pos, count];
    let arr = dirs.map(dir => [add(pos, dir), count + 1]);
    queue.push(...arr);
  }

  return seen;
}

let map = Array(71).fill().map(v => Array(71).fill("."));
str.slice(0,1024).map(v => set_cell(map, v, "#"));

bfs(map, [0, 0])[[70, 70]];
