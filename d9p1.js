let defrag = (arr) => {
  let ind = 0;
  while((ind = arr.indexOf(null, ind)) != -1 && ind < (arr.length - 1)){
    arr[ind] = arr.pop();
  }
}

let str = prompt().trim().split("").map(v => + v);
let blocks = str.map((v, i) => Array(v).fill(i % 2 ? null : i / 2)).flat();

defrag(blocks);
blocks.map((v, i) => v * i).reduce((a, b) => a + b);
