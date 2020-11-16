/**
 * Copyright 2016 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ------------------------------------------------------------------------------
 */

'use strict'

import { TransactionHandler } from 'sawtooth-sdk/processor/handler'

import {
  InvalidTransaction,
  InternalError,
} from 'sawtooth-sdk/processor/exceptions'

import crypto from 'crypto'
import cbor from 'cbor'

const _hash = (x, length = 64) =>
  crypto.createHash('sha512').update(x).digest('hex').slice(0, length)

const INT_KEY_FAMILY = 'bloodbank'
const INT_KEY_NAMESPACE = _hash(INT_KEY_FAMILY, 6)

enum Service {
  Hemocomponents,
  Patients,
  Transfusions,
}

const getService = (namespace: string): Service => {
  switch (namespace) {
    case 'Hemocomponents':
      return Service.Hemocomponents
    case 'Patients':
      return Service.Patients
  }
  throw new InvalidTransaction(
    `Namespace not in service, current namespace value is: ${namespace}`
  )
}

const getServiceAddress = (service: Service, ipsId: string, asset): string => {
  let prefix = ''
  switch (service) {
    case Service.Hemocomponents:
      prefix = '0001'
      break
    case Service.Patients:
      prefix = '0002'
      break
  }
  if (!prefix) {
    throw new InvalidTransaction(
      `Service not in list, current value is: ${service}`
    )
  }
  console.log('ips id', ipsId)
  return INT_KEY_NAMESPACE + prefix + _hash(ipsId, 4) + _hash(asset, 56)
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
const _decodeCbor = (buffer): any =>
  new Promise((resolve, reject) =>
    cbor.decodeFirst(buffer, (err, obj) => (err ? reject(err) : resolve(obj)))
  )

const _toInternalError = (err) => {
  let message = err.message ? err.message : err
  throw new InternalError(message)
}

const _setEntry = (context, address, stateValue) => {
  let entries = {
    [address]: cbor.encode(stateValue),
  }
  // let entries = {
  //   [address]: Buffer.from("hello")
  // }
  // console.log(`address ${address}`)
  return context.setState(entries)
}

const _applySet = (context, address, id, value) => (possibleAddressValues) => {
  let stateValueRep = possibleAddressValues[address]

  let stateValue
  console.log('statevalue', stateValueRep)
  if (stateValueRep && stateValueRep.length > 0) {
    stateValue = cbor.decodeFirstSync(stateValueRep)
    let stateName = stateValue[id]
    console.log('stateName', stateName)
    if (stateName) {
      throw new InvalidTransaction(
        `Method is "set" but Name already in state, Name: ${id} Value: ${stateName}`
      )
    }
  }

  // 'set' passes checks so store it in the state
  if (!stateValue) {
    stateValue = {}
  }

  stateValue[id] = value

  return _setEntry(context, address, stateValue)
}

const _applyUpdate = (context, address, id, value) => (
  possibleAddressValues
) => {
  let stateValueRep = possibleAddressValues[address]

  let stateValue
  if (stateValueRep && stateValueRep.length > 0) {
    stateValue = cbor.decodeFirstSync(stateValueRep)
    let stateName = stateValue[id]
    if (!stateName) {
      throw new InvalidTransaction(
        `Method is "update" but Name already in state, Name: ${id} Value: ${stateName}`
      )
    }
  } else {
    throw new InvalidTransaction(
      `Method is "update" but Name not in state, Name: ${id}`
    )
  }

  stateValue[id] = value

  return _setEntry(context, address, stateValue)
}

export class HemocomponentsKeyHandler extends TransactionHandler {
  constructor() {
    super(INT_KEY_FAMILY, ['1.0'], [INT_KEY_NAMESPACE])
  }

  apply(transactionProcessRequest, context) {
    console.log('Something happened')
    // return Promise.reject(
    //   new InvalidTransaction("??")
    // );
    // a = a + 1;
    // console.log(a);
    // throw new InvalidTransaction("wait");

    try {
      return _decodeCbor(transactionProcessRequest.payload)
        .catch(_toInternalError)
        .then((update) => {
          console.log(update)
          //
          // Validate the update
          let id = update.payload?.id
          console.log('objectiD', id)
          if (!id) {
            throw new InvalidTransaction('Name is required')
          }

          let verb = update.Method
          if (!verb) {
            throw new InvalidTransaction('Method is required')
          }

          let value = update.payload
          if (value === null || value === undefined) {
            throw new InvalidTransaction('Value is required')
          }
          // value = { ...value, lastUpdated: new Date().toISOString() }

          // Determine the action to apply based on the verb
          let actionFn
          if (verb === 'set') {
            actionFn = _applySet
          } else if (verb === 'update') {
            actionFn = _applyUpdate
          } else {
            throw new InvalidTransaction(`Method must be set, not ${verb}`)
          }

          console.log('namespace', update.namespace)
          const service = getService(update.namespace)
          const ipsId = update.payload?.ips
          let address = getServiceAddress(service, ipsId, id)
          console.log(address)

          // Get the current state, for the key's address:
          let getPromise = context.getState([address])

          // Apply the action to the promise's result:
          let actionPromise = getPromise.then(
            actionFn(context, address, id, value)
          )

          // Validate that the action promise results in the correctly set address:

          return actionPromise.then((addresses) => {
            if (addresses.length === 0) {
              throw new InternalError('State Error!')
            }
            console.log(`Method: ${verb} Name: ${id} Value: ${value}`)
            console.log(
              context.addEvent(
                'myevent',
                [['name', 'myname']],
                Buffer.from('hello', 'utf8')
              )
            )
          })
        })
        .catch((e) => {
          console.log('fallé1', e)
          return
        })
    } catch (e) {
      console.log('fallé2', e)
      return
    }
  }
}
