let [towels, patterns] = prompt().split("\n\n");

towels = towels.trim().split(",").map(v => v.trim());
patterns = patterns.trim().split("\n").map(v => v.trim());

let to_set = (a) => [...new Set(a)];

let check = (towels, pattern) => {
  let memo = {};
  let t_table = {};
  towels.forEach(v => (t_table[v] = true));

  let t_len = to_set(towels.map(v => v.length)).sort((a, b) => b - a);
  let check_ = (cl, pattern) => {
    if(pattern.length == 0)
      return 1;
    
    if(memo[pattern] != null)
      return memo[pattern];

    while(t_len[cl] > pattern.length){
      cl++;
      if(t_len[cl] == null)
        return memo[pattern] = 0;
    }
    
    if(pattern.length == 1)
      return t_table[pattern] ? 1 : 0;
    
    let mp = (pattern.length / 2) | 0;
    let c1 = check_(cl, pattern.slice(0, mp));
    let c2 = check_(cl, pattern.slice(mp));
    let count = c1 * c2;

    for(let i = cl; i < t_len.length; i++){
      let c_len = t_len[i];
      let pos = Math.max(mp - c_len + 1, 0);
      for(let j = 0; j < c_len - 1 && (pos+j+c_len-1 < pattern.length); j++){
        let sel = pattern.slice(j+pos, j+pos+c_len);
        if(t_table[sel]){
          let c1 = check_(cl, pattern.slice(0, j + pos));
          let c2 = check_(cl, pattern.slice(j+pos+c_len));   
          count += c1 * c2;
        }
      }
    }

    return memo[pattern] = count;
  }

  let k = check_(0, pattern);
  return k;
}

patterns.map(v => check(towels, v)).map(v => +v).reduce((a, b) => a + b);
