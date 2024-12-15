let get_cell = (map, [x, y]) => map[y]?.[x];
let set_cell = (map, [x, y], v) => map[y][x] = v;
let dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

let add = (a, b) => a.map((v, i) => v + b[i]); 

let can_push = (map, pos, dir) => {
  let cell = get_cell(map, pos);
  if(cell == "O" || cell == "@" || dir[0] && (cell == "[" || cell == "]"))
    return can_push(map, add(pos, dir), dir);

  if(dir[1] && (cell == "[" || cell == "]"))
    return can_push(map, add(pos, dir), dir) && can_push(map, add(add(pos, [cell == "[" ? 1 : -1, 0]), dir), dir);

  return cell == ".";
}

let push = (map, pos, dir) => {
  let cell = get_cell(map, pos);
  if(cell == "O" || cell == "@" || dir[0] && (cell == "[" || cell == "]")){
    push(map, add(pos, dir), dir);
    set_cell(map, pos, ".");
    set_cell(map, add(pos, dir), cell);
  }

  if(dir[1] && (cell == "[" || cell == "]")){
    let p = add(pos, [cell == "[" ? 1 : -1, 0]);
    push(map, add(pos, dir), dir)
    push(map, add(p, dir), dir);

    set_cell(map, pos, ".");
    set_cell(map, p, ".");
    set_cell(map, add(pos, dir), cell);
    set_cell(map, add(p, dir), cell == "]" ? "[" : "]");
  }
}

let sim_robot = (map, pos, moves) => {
  moves.forEach(move => {
    if(can_push(map, pos, move)){
      push(map, pos, move);
      pos = add(pos, move);
    }
  })

  return pos;
}

let [map, moves] = prompt().split("\n\n");

map = map.split("").map(v => ({"@": "@.", "#": "##", ".": "..", "O": "[]"}[v] ?? v)).join("");
map = map.trim().split("\n").map(v => v.trim().split(""));
moves = moves.trim().split("").filter(v => /[<^>v]/.test(v)).map(v => ({"<":dirs[3],"^":dirs[1],">":dirs[2],"v":dirs[0]}[v]));

let rpos = map.flat().indexOf("@");
rpos = [rpos % map[0].length, rpos / map[0].length | 0];

sim_robot(map, rpos, moves);

map.map((v, y) => v.map((v, x) => [[x, y], v])).flat().filter(v => v[1] == "[").map(v => v[0]).map(v => v[0] + 100*v[1])
.reduce((a, b) => a + b);
