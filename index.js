const app = require('./server.js')

// Hook up mongoose
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/stempel", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err, db) => {
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
