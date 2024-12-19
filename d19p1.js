let [towels, patterns] = prompt().split("\n\n");

towels = towels.trim().split(",").map(v => v.trim());
patterns = patterns.trim().split("\n").map(v => v.trim());

let split = (pattern, ind) => [pattern.slice(0, ind), pattern.slice(ind)];
let to_set = (a) => [...new Set(a)];

let check = (towels, pattern) => {
  let memo = {};
  let t_table = {};
  towels.forEach(v => (t_table[v] = true));

  let t_len = to_set(towels.map(v => v.length)).sort((a, b) => b - a);
  let check_ = (cl, pattern) => {
    if(memo[pattern])
      return true;
    
    if(t_table[pattern])
      return memo[pattern] = true;

    while(t_len[cl] > pattern.length){
      cl++;
      if(t_len[cl] == null){
        return memo[pattern] = false;
      }
    }

    let mp = (pattern.length / 2) - (t_len[cl] / 2) | 0;
    
    for(let i = 0; i < t_len[cl]; i++){
      let spl = split(pattern, mp + i);
      if(check_(cl, spl[0]) && check_(cl, spl[1])){
        return memo[pattern] = true;
      }
    }

    return false;
    
  }

  return check_(0, pattern);
}

patterns.map(v => check(towels, v)).map(v => +v).reduce((a, b) => a + b);
