let get_cell = (map, [x, y]) => map[y]?.[x];
let set_cell = (map, [x, y], v) => map[y][x] = v;
let add = (a, b) => a.map((v, i) => v + b[i]); 
let r90 = ([x, y]) => [-y, x];
let r270 = (pos) => r90(r90(r90(pos)));

let get_cost = ([pos, facing, cost, map, prev, memo]) => cost;
let get_hash = (state) => state[0] + " " + state[1];
let get_next = ([pos, facing, cost, map, prev, memo]) => {
  let state = [pos, facing, cost, map, prev, memo];
  let n = [];
  if(get_cell(map, add(pos, facing)) != "#")
    n.push([add(pos, facing), facing, cost + 1, map, get_hash(state), memo]);

  n.push([pos, r90(facing), cost + 1000, map, get_hash(state), memo]);
  n.push([pos, r270(facing), cost + 1000, map, get_hash(state), memo]);

  return n;
}

let is_goal = ([pos, facing, cost, map, prev, memo]) => get_cell(map, pos) == "E";

let get_memo = (arr) => arr.at(-1);
let memoize = (state) => {
  let memo = get_memo(state);
  let hash = get_hash(state);

  if(memo[hash] == null || get_cost(state) < get_cost(memo[hash][0])){
    memo[hash] = [state];
    return true;
  }else if(memo[hash] != null && get_cost(state) == get_cost(memo[hash][0])){
    memo[hash].push(state);
  }

  return false;
}

let search = (state, next, goal, memo, get_memo) => {
  let queue = [state];

  while(queue.length != 0){
    let st = queue.shift();

    if(memo(st))
      queue.push(...next(st));
  }

  console.log(state);
  return get_memo(state);
}

let mark_paths = (state, map) => {
  set_cell(map, state[0], 1);
  
  let memo = get_memo(state);
  let prev = memo[state.at(-2)];
  prev?.map(v => mark_paths(v, map));
}

let str = prompt().split("\n").map(v => v.trim().split(""));

let start = [1, str.length - 2];
let dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
let end = [str[1].length - 2, 1];

let memo = search([[1, str.length - 2], [1, 0], 0, str, "0,0 1,0", {}], get_next, is_goal, memoize, get_memo);

let best = dirs.map(v => memo[end + " " + v]).map(v => [v, get_cost(v[0])])
.reduce((a, b) => a[1] < b[1] ? a : a[1] == b[1] ? [[a[0], b[0]], a[1]] : b)[0];

let map = Array(str.length).fill().map(v => Array(str[0].length).fill(0));

best.map(v => mark_paths(v, map));

map.flat().reduce((a,b) => a + b);
