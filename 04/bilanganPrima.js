function indexPrime(param1) {
  var count = 0;
  var prime = 2;
  while (count < param1) {
    let primes = true;
    for (let i = 2; i <= Math.sqrt(prime); i++) {
      if (prime % i == 0) {
        primes = false;
      }
    }
    if (primes) {
      count++
    }
    prime++
  }
  return prime -1

}
// console.log(cekPrime(4));
console.log(indexPrime(4))
console.log(indexPrime(500));
console.log(indexPrime(37786));