const { copyFileSync } = require('fs');
const { join } = require('path');

copyFileSync(join(__dirname, '..', '.htaccess'), join(__dirname, '..', 'out', '.htaccess'));
