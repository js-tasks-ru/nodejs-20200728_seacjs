const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.currentResult = '';
    this.nextResult = '';
    this.separator = 'о'; // os.EOL;
  }

    // npm run test:local 03-streams 02-line-split-stream
    _transform(chunk, encoding, callback) {
      console.log(chunk);

  }

  // _flush(callback) {
  //   callback(null, this.currentResult);
  // }
}

module.exports = LineSplitStream;
