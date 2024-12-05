let [edges, paths] = prompt().split("\n\n");

edges = edges.split("\n").map(v => v.trim().split("|").map(v => +v));
paths = paths.split("\n").map(v => v.trim().split(",").map(v => +v));

let graph = {};

edges.forEach(([f, t]) => {
  graph[f] ??= {};
  graph[t] ??= {};
  graph[f][t] = graph[t];
});

let check_path = (node, path) => {
  if(path.length == 0)
    return true;

  if(node[path[0]])
    return check_path(node[path[0]], path.slice(1));

  return false;
}

let to_set = (a) => [...new Set(a)];
let sub = (a, b) => ((s) => a.filter(v => !s.has(v)))(new Set(b));

//could be a topological sort
let fix_path = (graph, path) => {
  if(path.length == 0)
    return [];
  
  let children = to_set(path.map(v => Object.keys(graph[v])).flat().map(v => +v));
  let root = sub(path, children)[0];
  return [root, ...fix_path(graph, sub(path, [root]))];
}

let bad_paths = paths.filter(path => !check_path(graph, path));

bad_paths.map(v => fix_path(graph, v)).map(v => v[v.length / 2 | 0]).reduce((a, b) => a + b);
