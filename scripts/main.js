// Description:
//   A Dictionary bot.
//
// Dependencies:
//   "swagger-client": "^2.1.3"
//
// Configuration:
//   WORDNIK_API_KEY
//
// Commands:
//   hubot define <word> - look up a definition for <word> (Powered by the Wordnik API)
//
// Author:
//   jmccance

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _swaggerClient = require('swagger-client');

var _swaggerClient2 = _interopRequireDefault(_swaggerClient);

exports['default'] = function (robot) {
  var API_KEY = process.env.HUBOT_DEFINE_API_KEY;

  var client = (function () {
    var c = new _swaggerClient2['default']({ url: 'http://developer.wordnik.com/v4/word.json' });

    c.clientAuthorizations.add('apiKey', new _swaggerClient2['default'].ApiKeyAuthorization('api_key', API_KEY, 'query'));

    c.build();

    return c;
  })();

  function define(word, cb) {
    if (!client.isBuilt) {
      cb('Wordnik client not yet initialized.', null);
    } else {
      client.word.getDefinitions({ word: word, limit: 1 }, function (res) {
        if (res.obj[0]) {
          var definition = res.obj[0];
          cb(null, res.obj[0]);
        } else {
          cb('No definitions found for "' + word + '"');
        }
      });
    }
  }

  robot.respond(/define (\w+)/i, function (res) {
    var word = res.match[1];
    define(res.match[1], function (err, wordObject) {
      if (err != null) {
        res.reply(err);
      } else {
        res.reply(word + ' (' + wordObject.partOfSpeech + ') ' + wordObject.text + '\n\n' + ('[' + wordObject.attributionText + '; www.wordnik.com/words/' + word + ']'));
      }
    });
  });
};

;
module.exports = exports['default'];