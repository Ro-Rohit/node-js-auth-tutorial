const fs = require('fs');

const fileData = "Hello world!...I Am Rohit"

const filePath = './example';


fs.mkdirSync(filePath, { recursive: true });
fs.watch(filePath, (eventType, filename) => {
    console.log(`File ${filename} has been ${eventType}`);
});


fs.appendFileSync(`${filePath}/example1.txt`, fileData, 'binary', (err) => {
    console.log(err);
})

fs.readFile(`${filePath}/example1.txt`, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File contents:', data);
});