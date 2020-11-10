#!/bin/bash

docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
docker-compose -f ./docker-compose.yml -v down
docker volume prune -f
