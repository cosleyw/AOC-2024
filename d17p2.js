/*A:
2,4, BST A  B = A & 7
1,2, BXL 2  B = B ^ 2
7,5, CDV B  C = A >> B
4,7, BXC    B = B ^ C
1,3, BXL 3  B = B ^ 3
5,5, OUT B  print B
0,3, ADV 3  A = A >> 3
3,0  JNZ 0  if(a) goto A


B = (A & 7) ^ 2
B = B ^ (A >> B) ^ 3
*/

let greedy = (A, prog) => {
  if(prog.length == 0)
    return A;
  
  prog = [...prog];
  let target = prog.pop();

  let pot = [];
  for(let i = 0n; i < 8n; i++){
    let a = (A << 3n) + i;
    
    let B = (a & 7n) ^ 2n;
    B = B ^ (a >> B) ^ 3n;
    if((B & 7n) == target)
      pot.push(a);
  }

  pot = pot.sort((a, b) => Number(a - b));
  for(let i = 0; i < pot.length; i++){
    let r = greedy(pot[i], prog);
    if(r)
      return r;
  }

  return null;
}

let prog = [2,4,1,2,7,5,4,7,1,3,5,5,0,3,3,0].map(BigInt);
let A = 0n;
greedy(0n, prog);
