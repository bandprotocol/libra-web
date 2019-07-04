#!/bin/sh
docker build -t envoy:libra-testnet-proxy . && docker run --rm --name envoy -p 8080:8080 envoy:libra-testnet-proxy