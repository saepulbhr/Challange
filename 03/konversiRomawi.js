function romawi(n){
    //nilai dasar untuk perbandingan
    var desimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    var roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X','IX', 'V', 'IV', '1'];
    var hasil = ''

    for(var i = 0; i < desimal.length; i++){
        while(desimal[i] <= n) {
          hasil += roman[i];
          n -= desimal[i];
        }
      }
      return hasil;
}

console.log("Script Testing Untuk Konversi Romawi");
console.log("input | Expected | result");
console.log("------|----------|-------");
console.log("4     |IV        |", romawi(4));
console.log("9     |IX        |", romawi(9));
console.log("13    |III       |", romawi(13));
console.log("1453  |MCDLIII   |", romawi(1453));
console.log("1646  |MDCXLVI   |", romawi(1646));

