let nodes = new Map();

let node = (num) => {
  if(!nodes.get(num))
    nodes.set(num, {num: num, nodes: null});
  return nodes.get(num);
}

let get_next = (nd) => {
  if(nd.nodes == null){
    let num = nd.num;
    let str = num.toString();
    
    if(num == 0n){
      nd.nodes = [node(1n)];
    }else if(str.length % 2 == 0){
      nd.nodes = [
        node(BigInt(str.slice(0, str.length / 2))),
        node(BigInt(str.slice(str.length / 2))),
      ];
    }else{
      nd.nodes = [node(num * 2024n)];
    }
  }

  return nd.nodes;
    
}

let dep_map = new Map();
let calc_num = (nd, depth) => {
  if(!dep_map.get(nd))
    dep_map.set(nd, {});
  
  let k = dep_map.get(nd);
  if(k[depth])
    return k[depth];

  if(depth == 0){
    k[depth] = 1;
  }else{
    let next = get_next(nd);
    k[depth] = next.map(v => calc_num(v, depth-1)).reduce((a, b) => a + b);
  }

  return k[depth];
}

let str = prompt().split(" ").map(v => node(BigInt(v.trim())));

str.map(v => calc_num(v, 75)).reduce((a, b) => a + b);
