let get_cell = (map, [x, y]) => map[y]?.[x];
let set_cell = (map, [x, y], v) => map[y][x] = v;
let dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

let add = (a, b) => a.map((v, i) => v + b[i]); 

let push = (map, pos, dir) => {
  let cell = get_cell(map, pos);
  if(cell == "O" || cell == "@"){
    if(push(map, add(pos, dir), dir)){
      set_cell(map, pos, ".");
      set_cell(map, add(pos, dir), cell);
      return true;
    }
    return false;
  }

  return cell == ".";
}

let sim_robot = (map, pos, moves) => {
  moves.forEach(move => {
    if(push(map, pos, move))
      pos = add(pos, move);
  })

  return pos;
}

let [map, moves] = prompt().split("\n\n");

map = map.trim().split("\n").map(v => v.trim().split(""));
moves = moves.trim().split("").filter(v => /[<^>v]/.test(v)).map(v => ({"<":dirs[3],"^":dirs[1],">":dirs[2],"v":dirs[0]}[v]));

let rpos = map.flat().indexOf("@");
rpos = [rpos % map[0].length, rpos / map[0].length | 0];

sim_robot(map, rpos, moves);

map.map((v, y) => v.map((v, x) => [[x, y], v])).flat().filter(v => v[1] == "O").map(v => v[0]).map(v => v[0] + 100*v[1])
.reduce((a, b) => a + b);

