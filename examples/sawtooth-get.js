const { createContext, CryptoFactory } = require('sawtooth-sdk/signing');

const axios = require('axios');
const context = createContext('secp256k1');
const privateKey = context.newRandomPrivateKey();
const signer = new CryptoFactory(context).newSigner(privateKey);
const crypto = require('crypto');

const cbor = require('cbor');

console.log(process.env.DOCKER_HOST_IP);
const HOST = 'http://' + process.env.DOCKER_HOST_IP + ':8008';

// const HOST = 'http://192.168.99.100:30008';

// const hash = (x) =>
//   crypto.createHash('sha512').update(x).digest('hex').toLowerCase()

// const INT_KEY_FAMILY = 'bloodbank'
// const INT_KEY_NAMESPACE = hash(INT_KEY_FAMILY).substring(0, 6)
// const address = INT_KEY_NAMESPACE + hash('foo').slice(-64)

//const hash = (x) =>
//crypto.createHash('sha512').update(x).digest('hex').toLowerCase();

//const INT_KEY_FAMILY = 'bloodbank';
//const INT_KEY_NAMESPACE = hash(INT_KEY_FAMILY).substring(0, 6);
//const address = INT_KEY_NAMESPACE + hash('foo').slice(-64);

const address =
  '95861c001488ad41d3b56da95021deea44ddbc51ffd369afc03e7f38b54c31b8fdf2bd';
axios({
  method: 'get',
  url: `${HOST}/state/${address}`,
  headers: { 'Content-Type': 'application/json' },
})
  .then(function (response) {
    let base = Buffer.from(response.data.data, 'base64');
    let stateValue = cbor.decodeFirstSync(base);
    console.log(stateValue);
  })
  .catch((err) => {
    console.log(err);
  });
