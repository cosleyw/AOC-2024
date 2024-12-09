let zip = (a, b) => a.map((v, i) => [v, b[i]]);
let defrag = (files) => {
  files.map(v=>v[0]).toReversed().map(id => {
    let cur = files.findIndex(v => v[0] == id);
    let ind = files.findIndex(([id, blocks, space], j) => j < cur && files[cur][1] <= space);

    if(ind != -1){
      let [i1, b1, s1] = files[cur];
      let [i2, b2, s2] = files[ind];
      
      files = [...files.slice(0, ind), [i2, b2, 0], [i1, b1, s2 - b1], ...files.slice(ind + 1)];

      let [i0, b0, s0] = files[cur];
      files = [...files.slice(0, cur), [i0, b0, s0 + b1 + s1], ...files.slice(cur+2)];
    }
  });

  return files;
};

let to_blocks = (files) => files.map(([id, blocks, space]) => [Array(blocks).fill(id), Array(space).fill(null)]).flat(2);

let str = prompt().trim().split("").map(v => + v);
if(str.length % 2)
  str.push(0);
let files = zip(str.filter((v, i) => !(i % 2)), str.filter((v, i) => i % 2)).map((v, i) => [i, ...v]);
files = defrag(files);

to_blocks(files).map((v, i)=> v * i).reduce((a, b) => a + b);
