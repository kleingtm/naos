const shell = require('shelljs');
const winston = require(`winston-color`);

const PLATFORM = process.env.PLATFORM;
const TNS_CMD = process.env.TNS_CMD;

winston.info(`\nPreparing NativeScript build in /dist...\n`);
shell.exec(`tns --path dist ${TNS_CMD} ${PLATFORM}`); // run tns command
