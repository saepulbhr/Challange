function deretKaskus(n){
  var hasil = []
   for(var no =3; no <= n*3; no+=3){
    if(no % 5==0 && no % 6==0){
      hasil.push("Kaskus")
    }
    else if(no % 5==0){
      hasil.push("Kas")
    }
    else if(no % 6==0){
      hasil.push("Kus")
    }
    else{
      hasil.push(no)
    }
  }
  console.log(hasil)
}

console.log(deretKaskus(10));
