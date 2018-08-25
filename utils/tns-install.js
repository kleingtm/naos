const shell = require('shelljs');
const winston = require(`winston-color`);

winston.info(`\nInstalling NativeScript dependencies in /dist...\n`);
shell.exec(`cd dist && yarn && cd ..`); // install nativescript deps in dist
