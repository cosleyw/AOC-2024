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

paths.filter(path => check_path(graph, path)).map(v => v[v.length / 2 | 0]).reduce((a, b) => a + b);
