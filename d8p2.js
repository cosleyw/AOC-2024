let add = (a, b) => a.map((v, i) => v + b[i]); 
let sub = (a, b) => a.map((v, i) => v - b[i]); 

let get_cell = (map, [x, y]) => map[y]?.[x];
let set_cell = (map, [x, y], v) => map[y][x] = v;

let find_nodes = (a1, a2, map) => {
  let v = sub(a1, a2);
  let sv = sub(a2, a1);

  while(get_cell(map, a1) != null){
    set_cell(map, a1, 1);
    a1 = add(a1, v);
  }

  while(get_cell(map, a2) != null){
    set_cell(map, a2, 1);
    a2 = add(a2, sv);
  }
}
let find_nodes_pairwise = (atenne, map) => {
  atenne.map((a, i) => atenne.map((b, j) => i != j && find_nodes(a, b, c_map)));
}

let str = prompt().split("\n").map(v => v.trim().split(""));
let atenne = {};


str.forEach((_, y) => _.forEach((v, x) => {
  if(v != "."){
    atenne[v] ??= [];
    atenne[v].push([x, y]);
  }
}));


let c_map = Array(str.length).fill().map((v, i) => Array(str[i].length).fill(0));

Object.entries(atenne).map(v => find_nodes_pairwise(v[1], c_map));
c_map.flat().reduce((a, b) => a + b);
