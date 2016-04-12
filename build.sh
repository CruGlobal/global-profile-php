#!/bin/bash

docker build -t docker-registry.cru.org/$PROJECT_NAME:$GIT_COMMIT-$BUILD_NUMBER .
