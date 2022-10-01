const fs = require('fs');
const download = require('image-downloader');
const path = require('path');

const sequential = require('promise-sequential');
const currentDir = path.resolve(__dirname);

const file = fs.readFileSync('./irasutoya.json', 'utf8');
const kawaiImages = JSON.parse(file);

const justImages = kawaiImages.map((item) => item.image_url);

console.log('Start downloading images...');

async function main(image_url) {
    const filename = image_url.split('/').pop();
    const filepath = path.resolve(currentDir, 'images', filename);
    const options = {
        url: image_url,
        dest: filepath,
    };
    await download.image(options);
}
const promises = justImages.map((item) => () => main(item));

sequential(promises).then(() => {
    console.log('Done!');
});
