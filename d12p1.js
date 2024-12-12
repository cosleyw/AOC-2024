let get_cell = (map, [x, y]) => map[y]?.[x];
let set_cell = (map, [x, y], v) => map[y][x] = v;

let find = (set, a) => {
  if(set[a[1]] == a)
    return a;
  
  let root = find(set, set[a[1]]);
  a[1] = root[1];
  return root;
}

let union = (set, a, b) => {
  let ar = find(set, a);
  let br = find(set, b);
  ar[1] = br[1];
  return ar;
}

let add = (a, b) => a.map((v, i) => v + b[i]);

let get_regions = (map) => {
  let width = map[0].length;
  let set = map.flat().map((v, i) => 
    [[
       i % width, 
      i / width | 0], i]);
  
  let dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  map.flat().map((v, i) => {
    let p = [i % width, i / width | 0];

    dirs.forEach(dir => {
      let p2 = add(p, dir);

      if(get_cell(map, p) == get_cell(map, p2))
        union(set, set[i], set[p2[0] + p2[1] * width]);
    });
  });

  return set;
}

let get_region_areas = (regions) => {
  let areas = {};
  regions.forEach(v => {
    let rid = find(regions, v)[1];
    areas[rid] ??= 0;
    areas[rid] += 1;
  });
  return areas;
}

let get_region_perimeters = (regions, map) => {
  let perimeters = {};
  
  let dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  regions.forEach(v => {
    let p = v[0];
    let rid = find(regions, v)[1];
    let edge_length = 4;

    dirs.forEach(dir => {
      let p2 = add(p, dir);
      if(get_cell(map, p2) == get_cell(map, p))
        edge_length--;
    });

    perimeters[rid] ??= 0;
    perimeters[rid] += edge_length;
  });
  return perimeters;
}

let str = prompt().split("\n").map(v => v.trim().split(""));

let regions = get_regions(str);

let area = get_region_areas(regions);
let perim = get_region_perimeters(regions, str);

Object.keys(area).map(v => area[v] * perim[v]).reduce((a, b) => a + b);
