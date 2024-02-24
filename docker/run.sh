#!/bin/bash

docker run --rm --name "$(basename "$(pwd)")" -it -w /project -v "$(pwd):/project" \
    node:14.14.0-buster \
    /bin/bash -c 'npm install; npm run-script build; npm run-script build-zip; /bin/bash'
