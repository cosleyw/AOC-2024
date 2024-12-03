let str = prompt().match(/(mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don't\(\))/g)

let mul = 1;
let instr = {
  "do": () => ((mul = 1), 0),
  "don't": () => ((mul = 0), 0),
  "mul": (a) => a.match(/[0-9]+/g).map(v => +v).reduce((a, b) => a*b*mul)
}

str.map(v => instr[v.match(/(mul|do(?!n)|don't)/g)[0]](v)).reduce((a,b)=>a+b)
