function pola(str){ 
    var result = [];
    var arr = str.split(' ')

    var numSatu = arr[0], numDua = arr[2], numTiga = arr[4];

  for(var i=0; i < 10; i++){
    var repl = numSatu.replace(/#/, i)
    for(var j=0; j < 10; j++){
      var rep = numTiga.replace(/#/, j)
      if(Number(repl) * Number(numDua) === Number(rep)){
        result.push(i, j)
      }
    }
  }
   return result
}

  console.log(pola('42#3 * 188 = 80#204'));
  console.log(pola('8#61 * 895 = 78410#5'));