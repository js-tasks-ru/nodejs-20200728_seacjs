const stream = require('stream');
const Buffer = require('buffer');

// const isSet = require('isSet');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
    constructor(
        options
    ) {
        super(options);
        this.fullSize = 0;
        this.limit = options.limit;
    }

    _transform(chunk, encoding, callback) {
        this.fullSize += chunk.length;
        callback(this.fullSize >= this.limit  ? new LimitExceededError() : null, chunk);
    }

}

module.exports = LimitSizeStream;
