FROM python:3

RUN apt update && apt install -y libsecp256k1-dev libsecp256k1-0

RUN apt-get install python3 -y && pip3 install sawtooth-sdk && pip3 install pyzmq

ADD . .

CMD ["python3", "events_client.py"]