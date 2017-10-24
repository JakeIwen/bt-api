'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchArtists = function searchArtists(query) {
  var url = 'https://api.spotify.com/v1/search?q=' + query + '&type=artist&market=us&limit=50';
  var options = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  };
  return new Promise(function (resolve, reject) {
    (0, _nodeFetch2.default)(url, options).then(function (result) {
      return result.json();
    }).then(function (response) {
      var options = response.artists.items.map(function (artist) {
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
    });
  });
};

exports.default = searchArtists;