function weirdMultiply(sentence) {
    var num = sentence.toString();
    // console.log(num)
    var kali = 1
    if(num.length === 1){
        return num
    }
    else{
        for(var i=0; i < num.length; i++){
            kali = kali * weirdMultiply(num[i])
        }
    }
    return weirdMultiply(kali)

}

console.log(weirdMultiply(39)); // 3 * 9 = 27 => 2 * 7 = 14 => 1 * 4 = 4
console.log(weirdMultiply(999)); //2
console.log(weirdMultiply(3)); //3