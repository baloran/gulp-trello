'use_strict'

var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var gulp = require('gulp');
var trello = require('../');
var config = require('../config/config');

describe('gulp-trello', function() {
  describe('in buffer mode', function() {

    it('should add task', function(done) {

      var stream = gulp.src('app.js')
        .pipe(trello({
          board: config.board,
          listName: config.listName,
          key: config.key,
          token: config.token
        }));

      stream.on('finish', function () {
        done();
      });

      stream.on('error', function(err) {
        done(err);
      });
    });
  });
});