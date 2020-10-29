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

import { TransactionProcessor } from 'sawtooth-sdk/processor'
import { HemocomponentsKeyHandler } from './handler'
import { initKafkaConnect } from './util/kafka'

const VALIDATOR_URL = 'tcp://' + "localhost" + ':4004'
console.log(VALIDATOR_URL)

const transactionProcessor = new TransactionProcessor(VALIDATOR_URL)

transactionProcessor.addHandler(new HemocomponentsKeyHandler())

initKafkaConnect().then(transactionProcessor.start())
