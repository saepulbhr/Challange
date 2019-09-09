console.log('Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!');
const fs = require('fs');
const readline = require('readline');
const fileStream = fs.readFileSync('data.json');

const obj = JSON.parse(fileStream);
var num = 0;
console.log(`Pertanyaan : ${obj[num].definition}`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Tebakan  : '
});
rl.prompt()
rl.on('line', world => {
    if (world.toLowerCase() == obj[num].term.toLowerCase()) {
        console.log('Selamat Anda Benar!');
        num++;
        if (num == obj.length) {
            console.log('Hore Anda Menang!');
            rl.close();
        }
        console.log(`Pertanyaan : ${obj[num].definition}`);
    } else {
        console.log('Wkwkwk, Anda Kurang Beruntung');
    }

    rl.prompt();

}).on('close', () => {
    console.log('');
    process.exit(0);
});