#!/bin/bash

CUP_HOST="$1"

curl $(echo "$CUP_HOST" | tr -d '"')/json > /app/build/cup.json
