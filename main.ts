import { mkdir, readFileSync } from 'fs';
import { parse } from 'url';
import { exec } from 'child_process'

import {blue, green} from 'chalk'

const DOWNLOAD_DIR = './downloads'

function downloadFile(file_url:string) {
  const wget = 'wget -P ' + DOWNLOAD_DIR + ' ' + file_url
  exec(wget, function(err, stdout, stderr) {
    if (err) throw err;
  })
};

// Main

mkdir(DOWNLOAD_DIR, () => {
  console.log("Created ./downloads");
})

const urls_json = process.argv[2]
const urls = JSON.parse(readFileSync(urls_json, 'utf8'));

urls.forEach((url:string, index:number) => {
  try {
    const progress = Math.floor((index+1) / urls.length * 100)
    const file_name = parse(url)?.pathname?.split('/').pop();
    downloadFile(url)
    console.log(`${blue(file_name)} | ${green(progress) + '%'}`);
  } catch (error) {
    console.log(error);
  }
});