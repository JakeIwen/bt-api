// import fetch from 'node-fetch'
//
// const clientId = '6b96fc2eae0c494fb5b02514b70c436f'
// const clientSecret = ""
//
// export default function requestToken() {
//   let url = 'https://accounts.spotify.com/api/token'
//   let authString = new Buffer(`${clientId}:${clientSecret}`).toString('base64')
//   let options = {
//     type: 'Post',
//     headers: {
//       Authorization: `Basic ${authString}`,
//       'Content-Type': "application/json"
//     },
//     body: JSON.stringify({
//       grant_type: "client_credentials"
//     })
//   }
//   return fetch(url, options)
//     .then(resp => resp.text())
//     .then(json => {
//       console.log(json)
//
//     })
// }
"use strict";