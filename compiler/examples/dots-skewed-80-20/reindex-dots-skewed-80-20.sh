#!/bin/sh
# wrapped as a script for start-kyrix.sh

cd ~/Kyrix/compiler/examples/dots-skewed-80-20
node dots.js | egrep -i "error|connected" || true
