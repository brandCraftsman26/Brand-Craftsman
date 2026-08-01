const fs = require('fs');
process.on('uncaughtException', (err) => {
  fs.writeFileSync('hostinger-error.log', 'Uncaught Exception: ' + err.stack + '\n', { flag: 'a' });
});
process.on('unhandledRejection', (reason, p) => {
  fs.writeFileSync('hostinger-error.log', 'Unhandled Rejection: ' + String(reason) + '\n', { flag: 'a' });
});

try {
  require('./.next/standalone/server.js');
} catch (err) {
  fs.writeFileSync('hostinger-error.log', 'Startup error: ' + err.stack + '\n', { flag: 'a' });
}
