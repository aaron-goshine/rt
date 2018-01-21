#! /bin/bash

project=$(basename `pwd`)
function glt  {
  git log --tags  --simplify-by-decoration --pretty="format:{\"date\":\"%ai\",\
  \"udate\":\"%ad\",\"rdate\":\"%ar\",\"tags\":\"%d\", \"author\":\"%an\",\
  \"project\":\"$project$1\"},"
}

echo "["
glt "-top" | head -n 1
glt "-scpr" | egrep "scraper" | head -n1
glt "-green-build" | egrep "lastGreenBuild" | head -n 1
echo "null]"


