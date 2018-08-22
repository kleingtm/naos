const shell = require('shelljs');
const winston = require(`winston-color`);

shell.exec(`cd dist && npm install && cd ..`); // install nativescript deps in dist

console.log(`launch hit!`);

