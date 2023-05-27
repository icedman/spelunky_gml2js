#!/bin/sh

./generate.py ./SpelunkyCommunityUpdateProject/spelunky both
./generateRooms.py ./SpelunkyCommunityUpdateProject/spelunky
./rip.py ./SpelunkyCommunityUpdateProject/spelunky/Sprites ./src/Sprites
prettier --single-quote --write "src/**/*.js"
./rollup.py
# cat src/Scripts/**/*.js >> dist/index.js