// Masih pake FOR
// //mengecek apakah bilangan prima atau bukan
// function cekPrime(param1){
//     for(var i=2; i < param1; i++){
//         if(param1 % i==0){
//             return false
//         }
//     }
//     return true  
// }

// function indexPrime(param1){
//     var count = []
//     for(var x=1; x < 600000; x++){ //perulangan untuk menentukan jumlah hasil dari parameter
//         if(cekPrime(x)){
//             count.push(x)
//         }
//     }
//     // console.log(count)
//     var hasilAkhir= []
//     var result = count
//     for(var z=2; z < count.length; z++){
//         if(param1 === z){
//             var hasil = result[z]
//               hasilAkhir.push(hasil)
//         }
//     }
//     return hasilAkhir
// }
// // console.log(cekPrime(4));
// console.log(indexPrime(4))
// console.log(indexPrime(500));
// console.log(indexPrime(37786));

// // Dengan While

//mengecek apakah bilangan prima atau bukan

// function cekPrime(param1){

//     for(var i=2; i < param1; i++){

//         if(param1 % i==0){

//             return false

//         }

//     }

//     return true  

// }



// function indexPrime(param1){

//     var count = []

//     var x = 1;

//     while(x < 500000){

//       if(cekPrime(x)){

//         count.push(x)

//       }

//       x++

//     }

//     // console.log(count)

//     var hasilAkhir= []

//     var result = count

//     var z = 2;

//     var y = count.length;

//     while(z < y){

//       if(param1 == z){

//         var hasil = result[z]

//         hasilAkhir.push(hasil)

//       }

//       z++

//     }

//     return hasilAkhir

    

// }

// // console.log(cekPrime(4));

// console.log(indexPrime(4))

// console.log(indexPrime(500));

// console.log(indexPrime(37786));

function cekPrime(param1){
    for(var i=2; i < param1; i++){
        if(param1 % i==0){
            return false
        }
    }
    return true  
}

function indexPrime(param1){
    var count = []
    var x = 2;
    while(count.length < param1){
      if(cekPrime(x)){
        count.push(x)
      }
      x++
    }
    return count[param1 -1]
}
// console.log(cekPrime(4));
console.log(indexPrime(4))
console.log(indexPrime(500));
console.log(indexPrime(37786));