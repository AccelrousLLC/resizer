var fs = require('fs');
var gm = require('gm');
var Crop = require('../../lib/resizers/crop');

describe("Crop", function() {

  beforeEach(function() {
    input = fs.createReadStream(__dirname + '/test.jpg');
  });

  it("with both height and width should generate the correct image", function(end) {
    var resizer = new Crop({ height: 100, width: 200 });
    var stream = input.pipe(resizer);

    gm(stream).identify('%w %h %[EXIF:*]', function(err, data) {
      expect(data.trim()).to.be.equal('200 100');
      end();
    });
  });

});