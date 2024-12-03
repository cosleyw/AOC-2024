let str = prompt().match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g).map(v => v.match(/[0-9]+/g).map(v => +v));

str.map(([a, b]) => a * b).reduce((a, b) => a + b);
