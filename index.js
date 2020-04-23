const app = require('./server.js')
require('dotenv').config()

// Hook up mongoose
var mongoose = require('mongoose');
var db_uri = ((process.env.NODE_ENV !== 'production') ? process.env.DB_DEVELOPMENT : process.env.DB_PRODUCTION);
mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err, db) => {
  if (err) {
    console.log('MongoDB connection error: ' + err.message);
    process.exit(1);
  };
});

// Start server
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log(`App now running on port`, port);
});
