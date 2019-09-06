function stringManipulation(word){

    if(word[0] == "a" || word[0] == "i" || word[0]=="u" || word[0]== "e" || word[0] == "o"){
      return word
    }
    else{
      return word.substr(1) + word.substr(0, 1) + 'nyo';
    }
    
}
    
    console.log(stringManipulation('ayam'))
    console.log(stringManipulation('bebek'))