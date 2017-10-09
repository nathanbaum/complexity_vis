/**
* @param {function} func - the function that will be run with increasing values of n
* @param {number} [n=0] - the number that n should start at
* @param {function} [validate=(x=>x<100)] - a function that takes one number as x, and returns a boolean (determines for how long n is iterated)
* @param {function} [iter=(x=>x+1)] - a function that takes one number as x, and returns x mutated in some way
* @param {number} varArgNum - the index of the argument at which n should be passed to func (Ex: if varArgNum == 2 then func(args[0], args[1], n, args[2], etc)
* @param {...*} args - any number of arguments of any type, will be passed into func along with n for every iteration
*/
function time(func, n=0, validate= x => x<1000, iter= x => x+1, varArgNum=0, ...args) {
  const times = [];
  while(validate(n)){
    const pass = [...args];
    pass.splice(varArgNum, 0, n);
    const start = performance.now();
    func(...pass);
    const end = performance.now();
    times.push(end-start);
    n = iter(n);
  }
  return times;
}

onmessage = function(args){ //args should be an array of args to be passed right into time
  /*for(const a in args) {
    console.log(a, ': ', args[a]);
  }*/
  const parsedArgs = args.data.map(e => eval(e));
  postMessage({
    result: time(...parsedArgs.slice(0, parsedArgs.length-1), ...parsedArgs[parsedArgs.length-1])
  });
}

/**
* just a test of the function : any values that you want to skip should be set to undefined
console.log(time(n => {
  let e = 1;
  for(let i=0; i<n; i++){
    for(let j=0; j<n; j++){
      e = e*i*j;
    }
  }
  return e;
},
200,
n => n<2000));
*/

/*module.exports = {
  time: time
};*/
