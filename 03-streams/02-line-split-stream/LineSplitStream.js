const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.encoding = options.encoding;
    this.separator = os.EOL;
    this.lastString = ''; // помещаем сюда сроку если она не закончилась переносом
  }

  // npm run test:local 03-streams 02-line-split-stream
  _transform(chunk, encoding, callback) {

    let arrayChank = chunk.toString(this.encoding).split(this.separator);
    if(arrayChank.length > 0) {
      for (let i = 0; i < arrayChank.length - 1; i++) {
        this.push(this.lastString + arrayChank[i]);
        this.lastString = '';
      }
      this.lastString += arrayChank[arrayChank.length - 1];
    }

    callback();
  }

  _flush(callback) {
    callback(null, this.lastString);
  }
}

module.exports = LineSplitStream;
