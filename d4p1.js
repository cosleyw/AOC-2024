let str = prompt().split("\n").map(v => v.trim().split(""));

let diagonalize = (a) => {
  let w = a[0].length, h = a.length;

  let arr = [];
  for(let i = w; i-- > 0;){
    let cur = [];
    let x = i, y = 0;
    while(a[y]?.[x]){
      cur.push(a[y][x]);
      x += 1;
      y += 1;
    }

    arr.push(cur);
  }

  for(let i = 1; i < h; i++){
    let cur = [];
    let x = 0, y = i;
    while(a[y]?.[x]){
      cur.push(a[y][x]);
      x += 1;
      y += 1;
    }

    arr.push(cur);
  }

  return arr;
}

let flipx = (a) => a.map(v => v.toReversed());
let T = (a) => 
  Array(a[0].length).fill()
    .map((v, y) => Array(a.length).fill()
      .map((v, x) => a[x][y]));

let arr = [
  str, 
  flipx(str),
  diagonalize(str), 
  flipx(diagonalize(str)), 
  diagonalize(flipx(str)), 
  flipx(diagonalize(flipx(str))), 
  T(str), 
  flipx(T(str))].flat();

arr.map(v => v.join("").match(/XMAS/g)?.length ?? 0).reduce((a,b) => a + b);
