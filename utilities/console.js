require('dotenv').config()

const logs = (message) => process.env.LOGS === 'ON' ? console.log(message): console.log('');

module.exports = logs;