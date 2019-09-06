function spiral(param1) {
    var arr = [];
    var num = 0;

    for (var i = 0; i < param1; i++) {
        arr[i] = []
        for (var j = 0; j < param1; j++) {
            arr[i][j] = num //num
            num++
        }
    }


    var result = []
    var array = arr.length;
    var barisAwal = 0;
    var barisAkhir = param1 - 1;
    var number = 1;

    while (result.length < param1 * param1) {
        //atas
        for (let i = barisAwal; i < array; i++) {
            result.push(arr[barisAwal][i])
        }
        // kanan
        for (let j = number; j < array -1; j++) {
            result.push(arr[j][barisAkhir])
        }
        // kiri
        for (let m = array - 1; m > barisAwal; m--) {
            result.push(arr[barisAkhir][m])
        }
        // bawah
        for (let n = array - 1; n >= number; n--) {
            result.push(arr[n][barisAwal])
        }
        barisAwal++;
        number++;
        barisAkhir--; 
        array--;
    }
    console.log(result)
}

spiral(5);
spiral(6);
spiral(7);