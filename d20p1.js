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
    console.log(queue);
    let [pos, dist] = queue.pop();
    let cell = get_cell(map, pos);
    if(cell == null || cell == "#" || cell != "." && cell <= dist)
      return;
  
    set_cell(map, pos, dist);
    dirs.forEach(v => queue.push([add(v, pos), dist+1]));
  }
}

let find_cheats = (map) => {
  let cheats = [];
  map.forEach((v, y) => v.forEach((v, x) => {
    if(v != "#"){
      let pos = [x, y];
      dirs.map(v => add(pos, smul(2, v)))
        .filter(v => get_cell(map, v) != null && get_cell(map, v) != "#")
        .map(v => {
          cheats.push(get_cell(map, v)-get_cell(map, pos)-2)
        });
    }
  }));

  return cheats;
}

fill_dist(map, start);
find_cheats(map).filter(v => v >= 100).length
