'use_strict'

var Transform = require('readable-stream/transform');
var fs        = require("fs");
var File      = require('vinyl');
var _         = require('underscore');
var async     = require('async');

/**
 * node-trello
 * https://github.com/adunkman/node-trello
 */
var Trello = require("node-trello");

// Regex
var taskRegexPatt = / \*\s{1,4}- [a-zA-Z0-9 ]+/;
var tasRegex      = new RegExp(taskRegexPatt);

module.exports = function gulpTrello (options) {
  return new Transform({
    objectMode: true,
    transform: function trelloTransform (file, encoding, cb) {
      if (file.isNull()) {
        cb(null, true);
        return;
      }

      var self = this;

      // connect to trello. See the documentation in https://github.com/adunkman/node-trello
      var t = new Trello(options.key, options.token);

      t.get('/1/boards/' + options.board + '/lists', function (err, lists) {
      
        // Search ths list by the name, the id is boring to have
        var curr = _.where(lists, {name: options.listName});

        if (curr.length > 0) {

          // Grab the id for use later
          options.listId = curr[0].id;

          // Send to the todo
          cb(null, todo(file, encoding));
        } else {
          throw new Error('No list found.');
        }
      });

      function todo (file, encoding) {
        fs.readFile(file.path, encoding, function (err, data) {
          var lines = data.split('\n');
          if (lines.indexOf(' * Todo:') == -1) {
            throw new Error('No todo here!');
          };

          async.each(lines, function (item, cb) {
            var task = tasRegex.exec(item);
            if (task != null) {
              var input = task['input'];
              var t = input.substring(input.indexOf('- ') + 2, input.length);
              addCard(t, function (err, data) {
                if (err) {
                  return cb(err);
                }
                cb(null);
              });
            };
          }, function (err) {
            if (err) {
              return err;
            };
            return true;
          });
        });
      }

      function addCard (task, done) {

        var newCard = {
          name: task,
          pos: "top",
          due:null,
          idList: options.listId
        };
        t.post('/1/cards/', newCard, function (err, data) {
          if (err) {
            return done(err, null);
          };
          return done(null, true);
        });
      }
    }
  });
};