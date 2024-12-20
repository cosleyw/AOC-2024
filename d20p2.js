let map = prompt().split("\n").map(v => v.trim().split(""));

let start = map.flat().indexOf("S");
start = [start % map[0].length, start / map[0].length | 0];

let dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
let add = (a, b) => a.map((v, i) => v + b[i]);
let smul = (s, v) => v.map(v => s*v);
let set_cell = (map, [x, y], v) => map[y][x] = v;
let get_cell = (map, [x, y]) => map[y]?.[x];

let fill_dist = (map, pos) => {
  let queue = [[pos, 0]];
  while(queue.length != 0){
    let [pos, dist] = queue.pop();
    let cell = get_cell(map, pos);
    if(cell == null || cell == "#" || cell != "." && cell <= dist)
      continue;
  
    set_cell(map, pos, dist);
    dirs.forEach(v => queue.push([add(v, pos), dist+1]));
  }
}

let find_cheats = (map, len) => {
  let cheats = [];
  map.forEach((v, y) => v.forEach((v, x) => {
    if(v != "#"){
      let pos = [x, y];
      for(let i = x - len; i <= x + len; i++){
        for(let j = y - len; j <= y + len; j++){
          let p2 = [i, j];

          if(get_cell(map, p2) != null && get_cell(map, p2) != "#"){
            let cheat_len = Math.abs(i-x)+Math.abs(j-y);
            if(cheat_len <= len){
              let dist = get_cell(map,p2)-get_cell(map,pos)-cheat_len;
              cheats.push([pos, p2, dist]);
            }
          }
        }
      }
    }
  }));

  return cheats;
}

fill_dist(map, start);
find_cheats(map, 20).sort((a, b) => b[2] - a[2]).filter(v => v[2] >= 100).length;
