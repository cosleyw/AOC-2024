let str = prompt().split("\n").map(v => v.trim().split(":")).map(([v, l]) => [+v, l.trim().split(" ").map(v => +v)]);

let calc = (nums, opers) => nums.reduce((a, b, i) => opers[i-1](a, b));
let mul = (a, b) => a * b;
let add = (a, b) => a + b;
let cat = (a, b) => +("" + a + b);

let can_output = (val, nums) => {
  let i = 0;
  let opers = [add, mul, cat];
  while(i < (opers.length)**(nums.length-1)){
    let st = i.toString(opers.length).padStart(nums.length-1, "0").split("");
    let op = st.map(v => opers[+v]);

    let res = calc(nums, op);
    if(res == val)
      return true;
    i++;
  }

  return false;
}

str.map(v => can_output(...v) * v[0]).reduce(add);
