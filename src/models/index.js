const mongoose = require('mongoose');
const { MONGO_URI } = require('../configs');

mongoose.connect(MONGO_URI, { autoIndex: false });

mongoose.connection.on('error', (err) => {
  console.error(`[MongoDB] Connect error to: ${MONGO_URI}`);
  console.error(err);
  process.exit();
});

mongoose.connection.once('open', () => {
  console.log(`[MongoDB] Connected to: ${MONGO_URI}`);
});
