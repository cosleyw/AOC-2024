let str = prompt().split("\n").map(v => v.trim().split(/\s+/g).map(v => +v));

let check_dec = (a, b) => a > b && Math.abs(a - b) <= 3;
let check_inc = (a, b) => a < b && Math.abs(a - b) <= 3;

let adj_cons = (check, arr) => {
  let adj_cons_ = (check, arr, wrong = 0) => {
    let prev = arr[0], i = 1;
    while(i < arr.length){
      if(!check(prev, arr[i])){
        if(wrong < 1){
          wrong++;
          i++;
          continue;
        }
        return false;
      }
      prev = arr[i++];
    }
  
    return true;
  }

  if(!check(arr[0], arr[1]))
    return adj_cons_(check, arr) || adj_cons_(check, arr.slice(1), 1);
  return adj_cons_(check, arr);
}


let is_safe = (arr) => adj_cons(check_dec, arr) || adj_cons(check_inc, arr);


str.map(is_safe).reduce((a, b) => a + b);
