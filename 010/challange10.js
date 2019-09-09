const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'tulis kalimatmu disini > '
});

rl.prompt();

rl.on('line', (world) => {

    function stringManipulation(word) {
        if (word[0] == "a" || word[0] == "i" || word[0] == "u" || word[0] == "e" || word[0] == "o") {
          return word
        } else {
          return word.substr(1) + word.substr(0, 1) + 'nyo';
        }
    }
    function sentencesManipulation(sentence) {
        var input = sentence.split(' ');
        var arr = []
        for (var i = 0; i < input.length; i++) {
            arr.push(stringManipulation(input[i]))
        }
        return arr.join(' ')      
    }

    console.log(`hasil konversi : ${sentencesManipulation(world)}`)
      
    rl.prompt();
}).on('close', () => {
    console.log('good bye');
    process.exit(0);
});
