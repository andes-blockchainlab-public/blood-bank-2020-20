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
  '95861c00160afa953f3108dabf2737259d8ad4e11189ef66b436c9ba04115058e04ea4';
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
