let interp = (A, B, C, IP, arr) => {
  let combo = (op) => ({
    0: 0n,
    1: 1n,
    2: 2n,
    3: 3n,
    4: A,
    5: B,
    6: C,
    7: null
  })[op];

  let lit = (op) => BigInt(op);

  let out = [];

  let inst = {
    0: /*adv*/ (op) => (A = A >> combo(op), IP += 2),
    1: /*bxl*/ (op) => (B = B ^ lit(op), IP += 2),
    2: /*bst*/ (op) => (B = combo(op) & 7n, IP += 2),
    3: /*jnz*/ (op) => IP = (A ? op : IP + 2),
    4: /*bxc*/ (op) => (B = B ^ C, IP += 2),
    5: /*out*/ (op) => (out.push(combo(op) & 7n), IP += 2),
    6: /*bdv*/ (op) => (B = A >> combo(op), IP += 2),
    7: /*cdv*/ (op) => (C = A >> combo(op), IP += 2)
  };

  while(arr[IP] != null)
    inst[arr[IP]](arr[IP+1]);

  return out;
};

interp(35200350n, 0n, 0n, 0, [2,4,1,2,7,5,4,7,1,3,5,5,0,3,3,0])
