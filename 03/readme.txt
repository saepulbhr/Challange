============================== TASK KONVERSI ROMAWI ==============================
function roman(n){
    let decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X','IX', 'V', 'IV', 'I'];
    let result = ''

    for(let i =0; i < decimal.length; i++){
        while(decimal[i] <= n){
            result += roman[i]
            n -= decimal[i]
        }
    }
    return result
}

console.log("Script Testing untuk Konsversi Romawi");
console.log("input | expected | result");
console.log("4     |IV        |",roman(4))
console.log("9     |IX        |",roman(9))
console.log("13    |XIII      |",roman(13))
console.log("1453  |MCDLIII   |",roman(1453))
console.log("1646  |MCDXLVI   |",roman(1646))

1. membuat kamus / mencari pola yang sama.
2. membuat variable penampung sementara.
3. melakukan perulangan untuk mendapatkan nilai dari panjang variable decimal.
4. dalam perulangan for melakukan pengecekan dengan while.
5. di cek selama variable decimal panjang ke i kurang dari sama dengan parameter
   maka variable penampung ditambahkan pola roman ke i.
6. parameter di kurang decimal panjang perulangan.
7. mengembalikan hasil dari variable penampung.
8. run dengan node nama file.
