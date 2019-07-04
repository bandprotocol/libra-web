#!/usr/bin/env bash
PROTO_IMPORT_DIR="./proto/"
GEN_OUT_DIR="./packages/libra-web-net/__grpc_web_generated__"

# Create the generated output dir if it doesn't exist
if [ ! -d "$GEN_OUT_DIR" ]; then
  mkdir -p ${GEN_OUT_DIR}
fi

FILE_PATHS='./proto/*.proto'

# Generate JavaScript for gRPC-web
protoc \
  -I=${PROTO_IMPORT_DIR} \
  ${FILE_PATHS} \
  --js_out=import_style=commonjs:${GEN_OUT_DIR} \
  --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:$GEN_OUT_DIR 
