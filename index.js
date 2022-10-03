const fs = require('fs');
const download = require('image-downloader');
const path = require('path');

const sequential = require('promise-sequential');
const currentDir = path.resolve(__dirname);

const inputFile =
    process.env.NODE_ENV === 'production'
        ? './irasutoya.json'
        : './sample.json';

const file = fs.readFileSync(inputFile, 'utf8');
const parsed = JSON.parse(file);
const kawaiimages = parsed.map((item) => item.image_url);

console.log('Start downloading images... completed:');

async function main(image_url) {
    const filename = image_url.split('/').pop();
    const filepath = path.resolve(currentDir, 'images', filename);
    const options = {
        url: image_url,
        dest: filepath,
    };
    await download
        .image(options)
        .then(({ filename }) => {
            console.log(filename);
        })
        .catch((err) => {
            console.log(err);
        });
}
const promises = kawaiimages.map((item) => () => main(item));

sequential(promises).then(() => {
    console.log('Done!');
});
