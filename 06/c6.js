function stringManipulation(word) {
  if (word[0] == "a" || word[0] == "i" || word[0] == "u" || word[0] == "e" || word[0] == "o") {
    return word
  }
  else {
    return word.substr(1) + word.substr(0, 1) + 'nyo';
  }
}

function sentencesManipulation(sentence) {
  var input = sentence.split(' ');
  var arr = []
  for (var i = 0; i < input.length; i++) {
    if (sentence[0] == "a" || sentence[0] == "i" || sentence[0] == "u" || sentence[0] == "e" || sentence[0] == "o") {
      arr.push(stringManipulation(input[i]))
    }
  }
  console.log(arr.join(' '))

}

sentencesManipulation('ibu pergi ke pasar bersama aku');

// ibu ergipnyo eknyo asarpnyo ersamabnyo aku