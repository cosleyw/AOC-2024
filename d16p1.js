let get_cell = (map, [x, y]) => map[y]?.[x];
let set_cell = (map, [x, y], v) => map[y][x] = v;
let add = (a, b) => a.map((v, i) => v + b[i]); 
let r90 = ([x, y]) => [-y, x];
let r270 = (pos) => r90(r90(r90(pos)));

let get_cost = ([pos, facing, cost, map, memo]) => cost;

let get_next = ([pos, facing, cost, map, memo]) => {
  let n = [];
  if(get_cell(map, add(pos, facing)) != "#")
    n.push([add(pos, facing), facing, cost + 1, map, memo]);

  n.push([pos, r90(facing), cost + 1000, map, memo]);
  n.push([pos, r270(facing), cost + 1000, map, memo]);

  return n;
}

let is_goal = ([pos, facing, cost, map, memo]) => get_cell(map, pos) == "E";

let get_memo = (arr) => arr.at(-1);
let memoize = ([pos, facing, cost, map, memo]) => {
  let hash = pos + " " + facing;
  if(memo[hash] == null || cost < get_cost(memo[hash])){
    memo[hash] = [pos, facing, cost, map, memo];
    return true;
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

let str = prompt().split("\n").map(v => v.trim().split(""));

let start = [1, str.length - 2];
let dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
let end = [str[1].length - 2, 1];

let memo = search([[1, str.length - 2], [1, 0], 0, str, {}], get_next, is_goal, memoize, get_memo);


Math.min(...dirs.map(v => memo[end + " " + v]).map(get_cost));
