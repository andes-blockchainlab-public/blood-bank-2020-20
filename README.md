##

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"email":"axficionado@hotmail.com","name":"Carlos Mario Sarmiento","role":"coordinador","password":"sasuke22"}' \
  localhost:4000/api/auth/create


curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"email":"axficionado@hotmail.com","password":"sasuke22"}' \
  localhost:4000/api/auth

curl --header "Content-Type: application/json" \
  --header "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF4ZmljaW9uYWRvQGhvdG1haWwuY29tIiwiaWQiOiI1ZmFhYThiMDgzM2Q2ODE4NWI1NGMzMzkiLCJyb2xlIjoiY29vcmRpbmFkb3IiLCJpYXQiOjE2MDUwMTk4NjAsImV4cCI6MTYwNTA2MzA2MH0.xt2bc-UaF8bpiuq7Bgg9Svc32qq-NNVnYM9wfkvMrGQ" \
  --request POST \
  --data '{"id":"2","bloodType":"O+"}' \
  localhost:4000/api/hemocomponents



curl --header "Content-Type: application/json" \
  --header "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF4ZmljaW9uYWRvQGhvdG1haWwuY29tIiwiaWQiOiI1ZmFhYThiMDgzM2Q2ODE4NWI1NGMzMzkiLCJyb2xlIjoiY29vcmRpbmFkb3IiLCJpYXQiOjE2MDUwMTk4NjAsImV4cCI6MTYwNTA2MzA2MH0.xt2bc-UaF8bpiuq7Bgg9Svc32qq-NNVnYM9wfkvMrGQ" \
  --request GET \
  localhost:4000/api/hemocomponents/2



Compile server
```
npm run build
node ./dist/server.js
```

## Use

Must install docker-compose
```bash
./up.sh


#Run Sawtooth transaction processor
cd ./tp
  npm install
  ./run.sh
cd -


```
Mongo Express to see mongodb:
http://localhost:8081/

```bash

cd ./app
  npm install
  node ./sawtooth-post.js
  node ./sawtooth-post.js
  node ./mongo-sample.js


  #kafka
  node ./send.js
  node ./receive.js
  node ./send.js  #Repeat
cd -


./down.sh

```


## Details

Only tested with node v10, Im not sure sawtooth SDK works for other versions


## Docs Kafka
https://hub.docker.com/r/bitnami/kafka/
'Accessing Kafka with internal and external clients'

https://github.com/Blizzard/node-rdkafka
https://kafka.apache.org/quickstart


```bash

docker exec -it kafka_kafka_1 bash
/opt/bitnami/kafka/bin/kafka-topics.sh --create --zookeeper zookeeper:2181 --topic mytopic --partitions 1 --replication-factor 1
/opt/bitnami/kafka/bin/kafka-topics.sh --describe --zookeeper zookeeper:2181 --topic mytopic
/opt/bitnami/kafka/bin/kafka-console-producer.sh --topic mytopic --bootstrap-server localhost:9092
/opt/bitnami/kafka/bin/kafka-console-consumer.sh --topic mytopic --from-beginning --bootstrap-server localhost:9092

```

