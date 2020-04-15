// Import libraries
var bodyParser = require('body-parser');
var express = require('express');
var Jimp = require('jimp');
var mongoose = require('mongoose');

// Initialize app
var app = express();
app.use(bodyParser.json());

// Model: Logs seal together with request IP
var sealSchema = mongoose.Schema({
  company: String,
  address: String,
  phone: String,
  ip: String,
  imageUrl: String,
  timestamps: Date
});
var Seal = module.exports = mongoose.model('seal', sealSchema);

// Helper: Draw line
function iterator(x, y, offset) {
  this.bitmap.data.writeUInt32BE(0x00000088, offset, true);
}

// API route: Creates seal from posted address
app.post('/api/seal', async function(req, res) {
  if (req.body.company && req.body.address && req.body.phone) {
    var seal = new Seal();
    if (req.body._id) seal = await Seal.findById(req.body._id);
    seal.company = req.body.company;
    seal.address = req.body.address;
    seal.phone = req.body.phone;
    seal.imageUrl = `/images/seals/${seal._id}_${Date.now()}.png`;
    seal.ip = req.ip;
    const fontHeader = await Jimp.loadFont('./public/fonts/heading.fnt');
    const fontText = await Jimp.loadFont('./public/fonts/text.fnt');
    const image = new Jimp(250, 188, 0xFFFFFFFF);
    image.scan(0, 0, 250, 3, iterator);
    image.scan(0, 185, 250, 3, iterator);
    image.scan(247, 0, 3, 188, iterator);
    image.scan(0, 0, 3, 188, iterator);
    image.scan(8, 8, 234, 3, iterator);
    image.scan(8, 177, 231, 3, iterator);
    image.scan(239, 8, 3, 172, iterator);
    image.scan(8, 8, 3, 172, iterator);
    image.print(fontHeader, 20, 20, { text: seal.company, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER }, 210);
    let addressLines = seal.address.split('\n');
    for (i=0; i<addressLines.length; i++) {
      image.print(fontText, 20, 85+(i*20), { text: addressLines[i], alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER }, 210)
    }
    image.print(fontText, 20, 140, { text: `Tel. ${seal.phone}`, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER }, 210)
    image.write(`./public/${seal.imageUrl}`);
    seal.save(function (err) {
      if (err) return res.status(500).json({ error: "Something went wrong while saving the seal" });
      return res.status(200).json(seal);
    })
  } else {
    return res.status(400).json({ error: "Missing at least one parameter - company, address, and phone are all required" });
  }
});

// Redirect based on browser locale
app.get('/', function(req, res) {
  const posDE = req.headers["accept-language"].indexOf('de');
  const posEN = req.headers["accept-language"].indexOf('en');
  if (posDE < posEN && posDE != -1) {
    res.redirect('/de');
  } else {
    res.redirect('/en');
  }
});

// Serve up angular app and images as static folders
app.use(express.static('dist/stempel'));
app.use(express.static('public'));

module.exports = app
