'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _createNotification = require('./createNotification');

var _createNotification2 = _interopRequireDefault(_createNotification);

var _emails = require('./emails');

var _emails2 = _interopRequireDefault(_emails);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _spotifyWebApiNode = require('spotify-web-api-node');

var _spotifyWebApiNode2 = _interopRequireDefault(_spotifyWebApiNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = process.env.PORT || 5000;

app.set('port', port);

app.use((0, _cors2.default)());

app.use(_bodyParser2.default.json());

var spotify = new _spotifyWebApiNode2.default({
  clientId: '6b96fc2eae0c494fb5b02514b70c436f',
  clientSecret: process.env.spotifySecret
});

var expiration = Date.now();

function refreshCredentials() {
  return new Promise(function (resolve, reject) {
    spotify.clientCredentialsGrant().then(function (resp) {
      spotify.setAccessToken(resp.body['access_token']);
      expiration = Date.now() + 3000000;
      resolve();
    }, function (error) {
      console.log("error", error);
    });
  });
}

function searchArtists(query) {
  return new Promise(function (resolve, reject) {
    spotify.searchArtists(query).then(function (resp) {
      var options = resp.body.artists.items.map(function (artist) {
        return {
          value: {
            spotifyId: artist.id,
            imageUrl: artist.images.length > 0 ? artist.images[0].url : '',
            influenceId: false,
            id: false
          },
          label: artist.name
        };
      });
      resolve({ options: options });
    }, function (error) {
      console.log("error", error);
    });
  });
}

app.use('/artists', function (req, res, next) {
  var query = req.body.query;

  if (expiration <= Date.now()) {
    refreshCredentials().then(function () {
      searchArtists(query).then(function (options) {
        res.send(options);
      });
    });
  } else {
    searchArtists(query).then(function (options) {
      res.send(options);
    });
  }
});

app.use('/email', function (req, res, next) {
  var _req$body$query = req.body.query,
      toEmail = _req$body$query.toEmail,
      byHandle = _req$body$query.byHandle;

  var type = 'INVITATION_RECEIVED';
  var urlCode = '';
  console.log('email Invitiation to:', toEmail);
  (0, _emails2.default)({ toEmail: toEmail, byHandle: byHandle, type: type, urlCode: urlCode });
  res.send();
});

app.use('/notifications/:type', function (req, res, next) {
  var data = req.body.data;
  var type = req.params.type;

  var byId = void 0,
      forId = void 0,
      toEmail = void 0,
      byHandle = void 0,
      sessionId = void 0,
      projectTitle = void 0,
      forHandle = void 0;
  var emailNotification = false;
  var sendNotification = true;
  var extra = '';
  var urlCode = '';

  switch (type) {
    case 'FRIENDS':
      {
        var node = data.FriendRequest.node;

        if (node.accepted) {
          type = "FRIEND_REQUEST_ACCEPTED";
          byId = node.recipient.id;
          forId = node.actor.id;
          if (!node.actor.doNotEmail) {
            emailNotification = true;
          }
        } else {
          type = "FRIEND_REQUEST";
          byId = node.actor.id;
          forId = node.recipient.id;
          byHandle = node.recipient.handle;
          toEmail = node.recipient.email;
          if (!node.recipient.doNotEmail) {
            emailNotification = true;
          }
        }
        break;
      }
    case 'COMMENT':
      {
        var _node = data.Comment.node;

        byId = _node.author.id;
        forId = _node.project.creator.id;
        toEmail = _node.project.creator.email;
        forHandle = _node.project.creator.handle;
        byHandle = _node.author.handle;
        if (_node.session) {
          extra = 'sessionId: "' + _node.session.id + '"';
          type = 'SESSION_FEEDBACK_RECEIVED';
          sessionId = _node.session.id;
        } else if (_node.project) {
          extra = 'projectId: "' + _node.project.id + '"';
          type = 'PROJECT_FEEDBACK_RECEIVED';
          projectTitle = _node.project.title;
        }
        var existingComment = _node.project.comments.filter(function (comment) {
          return comment.author.id === byId;
        });

        if (!_node.project.creator.doNotEmail) {
          emailNotification = true;
        }

        if (existingComment.length > 1) {
          sendNotification = false;
        }
        break;
      }
    case 'FB_FRIEND_JOINED':
      {
        break;
      }
    case 'MESSAGE':
      {
        break;
      }
    case 'BOUNCED':
      {
        var _node2 = data.Bounce.node;

        console.log('BOUNCED!', _node2);
        byId = _node2.bouncer.id;
        forId = _node2.project.creator.id;
        toEmail = _node2.project.creator.email;
        forHandle = _node2.project.creator.handle;
        byHandle = _node2.bouncer.handle;
        extra = 'projectId: "' + _node2.project.id + '"';
        type = 'BOUNCED';
        urlCode = '';
        if (!_node2.project.creator.doNotEmail) {
          emailNotification = true;
        }
        // if bounce deleted?
        // if (existingComment.length > 1) {
        //   emailNotification = false
        //   sendNotification = false
        // }
        break;
      }
    default:
      {}
  }

  if (sendNotification) {
    (0, _createNotification2.default)({
      byId: byId,
      forId: forId,
      type: type,
      extra: extra
    });
  }

  if (emailNotification) {
    (0, _emails2.default)({
      toEmail: toEmail,
      byHandle: byHandle,
      type: type,
      projectTitle: projectTitle,
      sessionId: sessionId,
      forHandle: forHandle,
      urlCode: urlCode
    });
  }

  next();
});

var server = app.listen(app.get('port'), function () {
  console.log('Server is running at port ' + app.get('port'));
});