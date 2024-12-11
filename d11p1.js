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

let str = prompt().split(" ").map(v => node(BigInt(v.trim())));

let itr = (arr) => arr.map(v => get_next(v)).flat();

for(let i = 0; i < 25; i++)
  str = itr(str);

str.length
