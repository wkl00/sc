var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var rewriteImagePath = require('../');

describe('gulp-rewrite-image-path', function() {
  describe('in buffer mode', function() {

    it('prepends the correct path when the image is in the root directory', function(done) {
      var fakeFile = new File({
        contents: new Buffer('<img src="test.png">')
      });
      var rewriter = rewriteImagePath({path: 'images/build'});
      rewriter.write(fakeFile);
      rewriter.once('data', function(file) {
        assert(file.isBuffer());
        assert.equal(file.contents.toString('utf8'), '<img src="images/build/test.png">');
        done();
      });
    });

    it('prepends the correct path when the image is not in the root directory', function(done) {
      var fakeFile = new File({
        contents: new Buffer('<img src="somewhere/test.png">')
      });
      var rewriter = rewriteImagePath({path: 'images/build'});
      rewriter.write(fakeFile);
      rewriter.once('data', function(file) {
        assert(file.isBuffer());
        assert.equal(file.contents.toString('utf8'), '<img src="images/build/somewhere/test.png">');
        done();
      });
    });

    it('prepends the correct path when the path includes a protocol (eg. http://)', function(done) {
      var fakeFile = new File({
        contents: new Buffer('<img src="test.png">')
      });
      var rewriter = rewriteImagePath({path: 'http://wikipedia.org'});
      rewriter.write(fakeFile);
      rewriter.once('data', function(file) {
        assert(file.isBuffer());
        assert.equal(file.contents.toString('utf8'), '<img src="http://wikipedia.org/test.png">');
        done();
      });
    });


    it('does not modify the src if it includes a protocol (eg. http://)', function(done) {
      var fakeFile = new File({
        contents: new Buffer('<img src="https://www.wikipedia.org/favicon.ico">')
      });
      var rewriter = rewriteImagePath({path: 'images/build'});
      rewriter.write(fakeFile);
      rewriter.once('data', function(file) {
        assert(file.isBuffer());
        assert.equal(file.contents.toString('utf8'), '<img src="https://www.wikipedia.org/favicon.ico">');
        done();
      });
    });

    it('does not modify the src if it is a protocol-relative URL', function(done) {
      var fakeFile = new File({
        contents: new Buffer('<img src="//www.wikipedia.org/favicon.ico">')
      });
      var rewriter = rewriteImagePath({path: 'images/build'});
      rewriter.write(fakeFile);
      rewriter.once('data', function(file) {
        assert(file.isBuffer());
        assert.equal(file.contents.toString('utf8'), '<img src="//www.wikipedia.org/favicon.ico">');
        done();
      });
    });

  });
});
