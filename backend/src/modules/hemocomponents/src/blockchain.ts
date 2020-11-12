import { protobuf } from 'sawtooth-sdk'
import { createContext, CryptoFactory } from 'sawtooth-sdk/signing'
import axios from 'axios'
import crypto, { createHash } from 'crypto'
import cbor from 'cbor'

const context = createContext('secp256k1')
const privateKey = context.newRandomPrivateKey()
const signer = new CryptoFactory(context).newSigner(privateKey)

const HOST = process.env.SAWTOOTH_REST_API_URL!
// const HOST = 'http://192.168.99.100:30008';

const hash = (x, length = 64): string =>
  crypto.createHash('sha512').update(x).digest('hex').slice(0, length)

const INT_KEY_FAMILY = 'bloodbank'
const INT_KEY_NAMESPACE = hash(INT_KEY_FAMILY, 6)
const ID_IPS = process.env.ID_IPS
const INT_KEY_IPS = hash(ID_IPS, 4)

export const getAddress = (id: string): string => {
  return INT_KEY_NAMESPACE + '0001' + INT_KEY_IPS + hash(id, 56)
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const sendBlockchain = (method: string, payload: any): void => {
  const address = getAddress(payload?.id)
  console.log('address send bc', address)
  console.log('object id', payload?.id)
  payload = { ...payload, lastUpdated: new Date() }
  payload = { namespace: 'Hemocomponents', Method: method, payload }

  const payloadBytes = cbor.encode(payload)

  console.log('Payload bytes', payloadBytes)
  console.log(payloadBytes.toString('ascii'))

  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: 'bloodbank',
    familyVersion: '1.0',
    inputs: [address], //Lectura
    outputs: [address], //Escritura
    signerPublicKey: signer.getPublicKey().asHex(),
    // In this example, we're signing the batch with the same private key,
    // but the batch can be signed by another party, in which case, the
    // public key will need to be associated with that key.
    batcherPublicKey: signer.getPublicKey().asHex(),
    // In this example, there are no dependencies.  This list should include
    // an previous transaction header signatures that must be applied for
    // this transaction to successfully commit.
    // For example,
    // dependencies: ['540a6803971d1880ec73a96cb97815a95d374cbad5d865925e5aa0432fcf1931539afe10310c122c5eaae15df61236079abbf4f258889359c4d175516934484a'],
    dependencies: [],
    payloadSha512: createHash('sha512').update(payloadBytes).digest('hex'),
    nonce: 'hey4',
  }).finish()

  let signature = signer.sign(transactionHeaderBytes)

  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes,
  })

  //--------------------------------------
  //Optional
  //If sending to sign outside

  const txnListBytes = protobuf.TransactionList.encode({
    transactions: [transaction],
  }).finish()

  //const txnBytes2 = transaction.finish()

  const transactions = protobuf.TransactionList.decode(txnListBytes)
    .transactions

  //----------------------------------------

  //transactions = [transaction]

  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish()

  signature = signer.sign(batchHeaderBytes)

  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: signature,
    transactions: transactions,
  })

  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch],
  }).finish()

  console.log('ips id', ID_IPS)

  axios
    .post(`${HOST}/batches`, batchListBytes, {
      headers: { 'Content-Type': 'application/octet-stream' },
    })
    .then((response) => {
      console.log('respuesta', response.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getBase = (): string => {
  return INT_KEY_NAMESPACE + '0001' + INT_KEY_IPS
}

export const getData = async (address: string): Promise<any[]> => {
  console.log('variable:', process.env.SAWTOOTH_REST_API_URL)
  const url = `${process.env.SAWTOOTH_REST_API_URL!}/state?address=${address}`
  console.log('Url:', url)
  const req = await axios.get(url)
  console.log(req.data)

  if (!req.data.data[0] || req.data.data[0].length === 0) {
    return []
  }
  const resp: any[] = []
  for (const element of req.data.data) {
    const buff = Buffer.from(element.data, 'base64')
    const data = cbor.decodeFirstSync(buff)
    resp.push(Object.values(data)[0])
  }
  console.log('Resp:', resp)
  return resp
}
