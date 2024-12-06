/*takes a long time to run, would probably be better to turn the map into a graph and modify it...*/

let get_cell = (map, [x, y]) => map[y]?.[x];
let set_cell = (map, [x, y], v) => map[y][x] = v;

let rot90 = ([x, y]) => [-y, x];
let add = (a, b) => a.map((v, i) => v + b[i]); 

let guard_sim = (pos, map) => {
  let path = Array(map.length).fill()
    .map((v, i) => Array(map[i].length).fill()
        .map(v => ({})));

  let hash = (dir) => "d:" + dir;

  let dir = [0, -1];
  let loop = true;
  while(get_cell(path, pos)[hash(dir)] != 1){
    get_cell(path, pos)[hash(dir)] = 1;
    
    let n_pos = add(pos, dir);
    let cell = get_cell(map, n_pos);
    if(cell == null){
      loop = false;
      break;
    }
    
    if(cell == "#")
      dir = rot90(dir);
    else
      pos = n_pos;
  }

  return loop;
}

let str = prompt().split("\n").map(v => v.trim().split(""));

let pos = [str.findIndex(v => v.indexOf("^") != -1)];
pos.unshift(str[pos[0]].indexOf("^"));

str.map((v, y) => v.map((_, x) => {
  let cell = get_cell(str, [x, y]);
  console.log([x, y]);
  set_cell(str, [x, y], "#");
  let res = guard_sim(pos, str);
  set_cell(str, [x, y], cell);
  return +res;
})).flat().reduce((a, b) => a+b);
