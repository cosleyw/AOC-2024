let get_cell = (map, [x, y]) => map[y]?.[x];

let rot90 = ([x, y]) => [-y, x];
let add = (a, b) => a.map((v, i) => v + b[i]); 

let guard_sim = (pos, map) => {
  let path = Array(map.length).fill()
    .map((v, i) => Array(map[i].length).fill()
        .map(v => ({})));

  let hash = (dir) => "d:" + dir;

  let dir = [0, -1];
  while(get_cell(path, pos)[hash(dir)] != 1){
    get_cell(path, pos)[hash(dir)] = 1;
    
    let n_pos = add(pos, dir);
    let cell = get_cell(map, n_pos);
    if(cell == null)
      break;
    
    if(cell == "#")
      dir = rot90(dir);
    else
      pos = n_pos;
  }

  return path;
}

let str = prompt().split("\n").map(v => v.trim().split(""));

let pos = [str.findIndex(v => v.indexOf("^") != -1)];
pos.unshift(str[pos[0]].indexOf("^"));

guard_sim(pos, str).flat().map(v => +!!Object.keys(v).length).reduce((a, b) => a + b);
