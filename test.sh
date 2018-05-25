#!/bin/bash

run () {
  name="$1" ; shift
  $@ &> ".${name}.log"
  if [ $? -ne 0 ] ; then
    cat ".${name}.log"
    echo "============================================"
    echo "Tests for $name failed!"
    exit 1
  else
    rm ".${name}.log"
  fi
}

echo "Starting Taskcluster-Lib-Url tests"

echo "Starting JS tests: node $(node --version) yarn $(yarn --version)"
cd javascript
run js yarn
run js yarn test
cd ..
echo "Completed JS tests"

echo "Starting Python tests: $(cd python && tox -l | xargs)"
cd python
run python tox
cd ..
echo "Completed Python tests"

echo "Starting Go tests: $(go version)"
cd go
run go go test
cd ..
echo "Completed Go tests"

echo "Completed Taskcluster-Lib-Url tests, all passed"
